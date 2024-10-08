export const validateBook = (values) => {
    let errors = {};
  
    // Title validation
    if (!values.title?.trim()) {
      errors.title = 'Title is required';
    } else if (values.title.length > 255) {
      errors.title = 'Title must be 255 characters or less';
    }
  
    // Author validation
    if (!values.author?.trim()) {
      errors.author = 'Author is required';
    } else if (values.author.length > 255) {
      errors.author = 'Author must be 255 characters or less';
    }
  
    // Genre validation
    if (values.genre && !values.genre.trim()) {
      errors.genre = 'Genre cannot be empty if provided';
    } else if (values.genre && values.genre.length > 100) {
      errors.genre = 'Genre must be 100 characters or less';
    }
  
    // Publication year validation
    if (values.publication_year) {
      const year = Number(values.publication_year);
      const currentYear = new Date().getFullYear();
      if (isNaN(year)) {
        errors.publication_year = 'Publication year must be a number';
      } else if (year < 1000 || year > currentYear) {
        errors.publication_year = `Publication year must be between 1000 and ${currentYear}`;
      }
    }
    // ISBN validation
    if (values.isbn) {
      const cleanedIsbn = values.isbn.replace(/[-\s]/g, '');
      if (!cleanedIsbn.trim()) {
        errors.isbn = 'ISBN cannot be empty if provided';
      } else if (cleanedIsbn.length !== 10 && cleanedIsbn.length !== 13) {
        errors.isbn = 'ISBN must be 10 or 13 digits long (excluding hyphens)';
      }
    }
  
    // Publisher validation
    if (values.publisher && !values.publisher.trim()) {
      errors.publisher = 'Publisher cannot be empty if provided';
    } else if (values.publisher && values.publisher.length > 255) {
      errors.publisher = 'Publisher must be 255 characters or less';
    }
  
    // Description validation (if it's part of your book model)
    if (values.description && values.description.length > 1000) {
      errors.description = 'Description must be 1000 characters or less';
    }
  
    return errors;
  };