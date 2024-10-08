import React from 'react';
import { Chip, Box } from '@mui/material';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
      <Chip
        label="All"
        onClick={() => onCategoryChange(null)}
        color={selectedCategory === null ? "primary" : "default"}
      />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          onClick={() => onCategoryChange(category)}
          color={selectedCategory === category ? "primary" : "default"}
        />
      ))}
    </Box>
  );
}

export default CategoryFilter;