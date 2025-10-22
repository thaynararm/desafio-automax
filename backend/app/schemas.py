from pydantic import BaseModel
from typing import List

class ProductBase(BaseModel):
    productId: int
    quantity: int

class ProductCreate(ProductBase):
    cartId: int

class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True

# ----------------------------

class CartBase(BaseModel):
    userId: int
    date: str

class CartCreate(CartBase):
    pass

class Cart(CartBase):
    id: int
    products: List[Product] = []

    class Config:
        orm_mode = True
