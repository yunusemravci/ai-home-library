import React from 'react';
import { Typography, Button, Box } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // Burada hata loglama servisi kullanılabilir
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5" color="error" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" paragraph>
            We're sorry for the inconvenience. Please try again later.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;