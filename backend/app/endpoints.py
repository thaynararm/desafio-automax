from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from app import schemas, models
from app.database import SessionLocal
from app.load_records import load_records

router = APIRouter()

# Dependência do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/load-carts", summary="Carrega os carrinhos da Fake Store API")
def load_carts(db: Session = Depends(get_db)):
    return load_records(db)

@router.get("/carts", response_model=list[schemas.Cart], summary="Lista todos os carrinhos")
def read_carts(db: Session = Depends(get_db)):
    carts = db.query(models.Cart).options(joinedload(models.Cart.products)).all()
    return carts

@router.get("/carts/{cart_id}", response_model=schemas.Cart, summary="Obtém um carrinho específico")
def read_cart(cart_id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.userId == cart_id).first()
    if not cart:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Carrinho não encontrado")
    return cart
