import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BookProvider } from './context/BookContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

const theme = createTheme();

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <BookProvider>
            <ErrorBoundary>
              <CssBaseline />
              <Header />
              <Container maxWidth="lg" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books/:id" element={<BookDetails />} />
                  <Route path="/add-book" element={<AddBook />} />
                  <Route path="/edit-book/:id" element={<EditBook />} />
                </Routes>
              </Container>
              <Footer />
            </ErrorBoundary>
          </BookProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;