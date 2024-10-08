import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Paper,
  Grid,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useForm from '../hooks/useForm';
import { validateBook } from '../utils/validate';
import { useBooks } from '../context/BookContext';
import { useNotification } from '../context/NotificationContext';


function AddBook() {
    const navigate = useNavigate();
    const { addBook } = useBooks();
    const { showNotification } = useNotification();

    // Ensure all hooks are called at the top level and in the same order
    const { values, errors, handleChange, handleSubmit, setFieldValue } = useForm(
      {
        title: '',
        author: '',
        genre: '',
        publication_year: '',
        isbn: '',
        read: false,
        publisher: '',
        description: ''
      },
      validateBook
    );
    const submitBook = useCallback(async (formValues) => {
        try {
          const bookData = {
            ...formValues,
            publication_year: parseInt(formValues.publication_year, 10)
          };
          console.log('Submitting book data:', bookData);
          const result = await addBook(bookData);
          console.log('Book added:', result);
          showNotification('Book added successfully', 'success');
          navigate('/');
        } catch (err) {
          console.error('Error adding book:', err.response?.data || err);
          showNotification(err.response?.data?.detail || 'Failed to add book', 'error');
        }
      }, [addBook, showNotification, navigate]);

  console.log('Form values:', values);
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Book
      </Typography>
      <form onSubmit={handleSubmit(submitBook)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={values.author}
              onChange={handleChange}
              error={!!errors.author}
              helperText={errors.author}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={values.genre}
              onChange={handleChange}
              error={!!errors.genre}
              helperText={errors.genre}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Publication Year"
              name="publication_year"
              type="number"
              value={values.publication_year}
              onChange={handleChange}
              error={!!errors.publication_year}
              helperText={errors.publication_year}
              inputProps={{ min: 1000, max: new Date().getFullYear() }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={values.isbn}
              onChange={handleChange}
              error={!!errors.isbn}
              helperText={errors.isbn}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Publisher"
              name="publisher"
              value={values.publisher}
              onChange={handleChange}
              error={!!errors.publisher}
              helperText={errors.publisher}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              theme="snow"
              value={values.description}
              onChange={(content) => setFieldValue('description', content)}
              placeholder="Enter book description..."
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.read}
                  onChange={handleChange}
                  name="read"
                  color="primary"
                />
              }
              label="I have read this book"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
            >
              Add Book
            </Button>
          </Grid>
        </Grid>
      </form>  
    </Paper>
  );
}

export default AddBook;