import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Grid, 
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useBooks } from '../context/BookContext';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, deleteBook, loading } = useBooks();
  const { showNotification } = useNotification();
  const [book, setBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const foundBook = books.find(b => b.id === parseInt(id));
    if (foundBook) {
      setBook(foundBook);
    } else {
      showNotification('Book not found', 'error');
      navigate('/');
    }
  }, [id, books, showNotification, navigate]);

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      showNotification('Book deleted successfully', 'success');
      navigate('/');
    } catch (err) {
      showNotification('Failed to delete book', 'error');
    }
  };

  if (loading || !book) return <LoadingSpinner />;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>
          <Box my={2}>
            <Chip label={book.genre} color="primary" />
            <Chip label={book.read ? 'Read' : 'Unread'} color={book.read ? 'success' : 'default'} sx={{ ml: 1 }} />
          </Box>
          <Typography variant="body1" paragraph>
            <strong>Published:</strong> {book.publication_year}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>ISBN:</strong> {book.isbn}
          </Typography>
          {book.description && (
            <Typography variant="body1" paragraph>
              <strong>Description:</strong> {book.description}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/edit-book/${id}`)}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setOpenDialog(true)}>
              Delete
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Back to List
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this book?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{book.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default BookDetails;