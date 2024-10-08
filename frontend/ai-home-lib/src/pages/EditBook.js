import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Checkbox, FormControlLabel } from '@mui/material';
import useForm from '../hooks/useForm';
import { validateBook } from '../utils/validate';
import { useBooks } from '../context/BookContext';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, updateBook, loading } = useBooks();
  const { showNotification } = useNotification();

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    {
      title: '',
      author: '',
      genre: '',
      publication_year: '',
      isbn: '',
      read: false
    },
    validateBook
  );

  useEffect(() => {
    const book = books.find(b => b.id === parseInt(id));
    if (book) {
      setValues(book);
    } else {
      showNotification('Book not found', 'error');
      navigate('/');
    }
  }, [id, books, setValues, showNotification, navigate]);

  const submitBook = useCallback(async (formValues) => {
    try {
      const bookData = {
        ...formValues,
        publication_year: parseInt(formValues.publication_year, 10)
      };
      console.log('Submitting updated book data:', bookData);
      const result = await updateBook(id, bookData);
      console.log('Book updated:', result);
      showNotification('Book updated successfully', 'success');
      navigate('/');
    } catch (err) {
      console.error('Error updating book:', err.response?.data || err);
      showNotification(err.response?.data?.detail || 'Failed to update book', 'error');
    }
  }, [id, updateBook, showNotification, navigate]);

  if (loading) return <LoadingSpinner />;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Book
      </Typography>
      <form onSubmit={handleSubmit(submitBook)}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          value={values.author}
          onChange={handleChange}
          margin="normal"
          error={!!errors.author}
          helperText={errors.author}
        />
        <TextField
          fullWidth
          label="Genre"
          name="genre"
          value={values.genre}
          onChange={handleChange}
          margin="normal"
          error={!!errors.genre}
          helperText={errors.genre}
        />
        <TextField
          fullWidth
          label="Publication Year"
          name="publication_year"
          value={values.publication_year}
          onChange={handleChange}
          margin="normal"
          type="number"
          error={!!errors.publication_year}
          helperText={errors.publication_year}
        />
        <TextField
          fullWidth
          label="ISBN"
          name="isbn"
          value={values.isbn}
          onChange={handleChange}
          margin="normal"
          error={!!errors.isbn}
          helperText={errors.isbn}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.read}
              onChange={handleChange}
              name="read"
              color="primary"
            />
          }
          label="Read"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Update Book
        </Button>
      </form>
    </Box>
  );
}

export default EditBook;