import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function BookItem({ book }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {book.author}
        </Typography>
        <Typography variant="body2">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2">
          Published: {book.publication_year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={RouterLink} to={`/books/${book.id}`}>
          View Details
        </Button>
        <Button size="small" component={RouterLink} to={`/edit-book/${book.id}`}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookItem;