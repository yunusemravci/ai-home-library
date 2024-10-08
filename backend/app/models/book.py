from sqlalchemy import Column, Integer, String, Boolean, Date, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from datetime import date

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    genre = Column(String, index=True)
    publication_year = Column(Integer)
    isbn = Column(String, unique=True, index=True, max_length=17)
    read = Column(Boolean, default=False)
    date_added = Column(Date, default=date.today, nullable=False)
    publisher = Column(String, nullable=True)
    description = Column(String, nullable=True)
