import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import api from '../services/api';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/books');
      console.log('API response:', response.data);
      setBooks(response.data);
      setError(null);
    } catch (err) {
      console.error('API error:', err.response?.data || err.message);
      setError('Failed to fetch books: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      setBooks(prevBooks => [...prevBooks, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error in addBook:', error.response?.data || error);
      throw error;
    }
  };

  const updateBook = async (id, book) => {
    try {
      const response = await api.put(`/books/${id}`, book);
      setBooks(prevBooks => prevBooks.map(b => b.id === id ? response.data : b));
      return response.data;
    } catch (err) {
      console.error('Error updating book:', err);
      throw err;
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book');
      throw err;
    }
  };

  const value = {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook
  };
  console.log("BookContext values:", value);
  
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};