from fastapi import Depends, HTTPException
from app import schemas, models
from app.database import *
import requests
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import SQLAlchemyError

def load_records(db: Session):
    try:
        response = requests.get("https://fakestoreapi.com/carts")
        data = response.json()
        
        existing_carts = db.query(models.Cart).options(joinedload(models.Cart.products)).all()
        
        carts_by_user = {
            cart.userId: cart
            for cart in existing_carts
        }

        products_by_carts = {
            cart.userId: {p.productId: p for p in cart.products}
            for cart in existing_carts
        }

        created_carts = 0
        updated_carts = 0
        created_products = 0
        updated_products = 0

        for item in data:
            user_id_data = item.get("userId")
            
            # Cadastra/Atualiza novos usuários/carts
            if user_id_data not in carts_by_user:
                cart = schemas.CartCreate(**item)
                db_cart = models.Cart(**cart.dict())
                db.add(db_cart)
                db.flush()
                carts_by_user[user_id_data] = db_cart
                products_by_carts[user_id_data] = {}
                created_carts += 1
            else:
                db_cart = carts_by_user.get(user_id_data)
                db_cart.date = item.get("date")
                updated_carts += 1
            
            # Cadastra/Atualiza produtos de cada usuário/cart
            for object in item.get("products", []):
                object_id_data = object.get("productId")
                db_products = products_by_carts.get(user_id_data)
                
                if object_id_data not in db_products:
                    product = schemas.ProductCreate(**object, cartId=db_cart.id)
                    db_product = models.Product(**product.dict())
                    db.add(db_product)
                    db_products[object_id_data] = db_product
                    created_products += 1
                
                else:
                    product_instance = db_products.get(object_id_data)
                    product_instance.quantity = object.get("quantity")
                    updated_products += 1
                
        db.commit()        
        
        return {
            "status": "success",
            "message": "Carga concluída com sucesso.",
            "summary": {
                "carts_created": created_carts,
                "carts_updated": updated_carts,
                "products_created": created_products,
                "products_updated": updated_products,
            },
        }
        
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Erro ao acessar API externa: {str(e)}")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro no banco de dados: {str(e)}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro inesperado: {str(e)}")