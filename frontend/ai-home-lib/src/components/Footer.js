import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} AI Open Library. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;