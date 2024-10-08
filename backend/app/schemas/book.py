from pydantic import BaseModel, Field, validator
from datetime import date
from typing import Optional, List
import re

class BookBase(BaseModel):
    title: str = Field(..., max_length=255)
    author: str = Field(..., max_length=255)
    genre: str = Field(..., max_length=100)
    publication_year: int = Field(..., ge=1000, le=date.today().year)
    isbn: str = Field(..., max_length=17)
    read: bool = False
    publisher: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
class BookCreate(BookBase):
    @validator('isbn')
    def validate_isbn(cls, v):
        cleaned_isbn = re.sub(r'[-\s]', '', v)
        if len(cleaned_isbn) not in [10, 13]:
            raise ValueError('ISBN must be 10 or 13 digits long (excluding hyphens)')
        return v

class BookUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    author: Optional[str] = Field(None, max_length=255)
    genre: Optional[str] = Field(None, max_length=100)
    publication_year: Optional[int] = Field(None, ge=1000, le=date.today().year)
    isbn: Optional[str] = Field(None, max_length=17)
    read: Optional[bool] = None
    publisher: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)

class Book(BookBase):
    id: int
    date_added: date

    class Config:
        orm_mode = True
