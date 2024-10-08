import React, { useEffect, useState, useMemo } from 'react';
import { Typography, Grid, Pagination } from '@mui/material';
import BookList from '../components/BookList';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchAndSort from '../components/SearchAndSort';
import CategoryFilter from '../components/CategoryFilter';
import { useBooks } from '../context/BookContext';
import { useNotification } from '../context/NotificationContext';

function Home() {
  const { books, loading, error, fetchBooks } = useBooks();
  const { showNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (error) {
      showNotification(error, 'error');
    }
  }, [error, showNotification]);

  const categories = useMemo(() => {
    return [...new Set(books.map(book => book.genre))];
  }, [books]);

  const filteredAndSortedBooks = useMemo(() => {
    return books
      .filter(book => 
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === null || book.genre === selectedCategory)
      )
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
  }, [books, searchTerm, sortBy, selectedCategory]);

  const pageCount = Math.ceil(filteredAndSortedBooks.length / booksPerPage);
  const displayedBooks = filteredAndSortedBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to AI Open Library
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchAndSort
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </Grid>
      <Grid item xs={12}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </Grid>
      <Grid item xs={12}>
        <BookList books={displayedBooks} />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Grid>
  );
}

export default Home;