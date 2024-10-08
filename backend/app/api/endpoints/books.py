from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas
from app.api.deps import get_db
from app.crud import book as crud_book
from pydantic import ValidationError
router = APIRouter()

@router.post("/", response_model=schemas.Book)
async def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    try:
        print("Received book data:", book.dict())
        created_book = crud_book.create_book(db=db, book=book)
        print("Created book:", created_book.__dict__)
        return created_book
    except ValidationError as ve:
        print("Validation error:", str(ve))
        raise HTTPException(status_code=422, detail=str(ve))
    except Exception as e:
        print("Error creating book:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[schemas.Book])
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        books = crud_book.get_books(db, skip=skip, limit=limit)
        print("Retrieved books:", books)  # Hata ayıklama için
        return books
    except Exception as e:
        print("Error fetching books:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{book_id}", response_model=schemas.Book)
def read_book(book_id: int, db: Session = Depends(get_db)):
    db_book = crud_book.get_book(db, book_id=book_id)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book

@router.put("/{book_id}", response_model=schemas.Book)
def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    try:
        db_book = crud_book.update_book(db, book_id=book_id, book=book)
        if db_book is None:
            raise HTTPException(status_code=404, detail="Book not found")
        return db_book
    except Exception as e:
        print("Error updating book:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{book_id}", response_model=schemas.Book)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = crud_book.delete_book(db, book_id=book_id)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book