from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, nullable=False)
    date = Column(String, nullable=True)

    # Relacionamento com Products
    products = relationship("Product", back_populates="cart", cascade="all, delete-orphan")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    cartId = Column(Integer, ForeignKey("carts.id"))
    productId = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)

    # Relacionamento inverso
    cart = relationship("Cart", back_populates="products")
