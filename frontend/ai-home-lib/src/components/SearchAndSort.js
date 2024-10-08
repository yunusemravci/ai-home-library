import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

function SearchAndSort({ searchTerm, onSearchChange, sortBy, onSortChange }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Search books"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            label="Sort by"
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="publication_year">Publication Year</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default SearchAndSort;