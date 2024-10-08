import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          AI Home Library
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          HOME
        </Button>
        <Button color="inherit" component={RouterLink} to="/books">
          BOOKS
        </Button>
        <Button color="inherit" component={RouterLink} to="/add-book">
          ADD BOOK
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;