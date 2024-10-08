from sqlalchemy.orm import Session
from app import models, schemas
from datetime import date
from typing import List, Optional
from sqlalchemy.exc import IntegrityError

def get_book(db: Session, book_id: int) -> Optional[models.Book]:
    return db.query(models.Book).filter(models.Book.id == book_id).first()

def get_books(db: Session, skip: int = 0, limit: int = 100):
    books = db.query(models.Book).offset(skip).limit(limit).all()
    for book in books:
        print(f"Book: {book.title}, ISBN: {book.isbn}")
    return books

def create_book(db: Session, book: schemas.BookCreate):
    db_book = models.Book(**book.dict())
    try:
        db.add(db_book)
        db.commit()
        db.refresh(db_book)
        return db_book
    except IntegrityError as e:
        db.rollback()
        print("IntegrityError:", str(e))
        raise ValueError("A book with this ISBN already exists")
    except Exception as e:
        db.rollback()
        print("Error creating book:", str(e))
        raise e

def update_book(db: Session, book_id: int, book: schemas.BookUpdate):
    db_book = get_book(db, book_id)
    if db_book:
        update_data = book.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_book, key, value)
        db.commit()
        db.refresh(db_book)
    return db_book

def delete_book(db: Session, book_id: int):
    db_book = get_book(db, book_id)
    if db_book:
        db.delete(db_book)
        db.commit()
    return db_book
