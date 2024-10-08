import React from 'react';
import { Grid } from '@mui/material';
import BookItem from './BookItem';

function BookList({ books }) {
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <BookItem book={book} />
        </Grid>
      ))}
    </Grid>
  );
}

export default BookList;