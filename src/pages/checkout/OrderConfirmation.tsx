import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Page from 'components/Page';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <Page title="Order Confirmation">
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Thank you for your order!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Your order has been successfully placed. We'll send you an email confirmation with order details shortly.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/orders')}
            >
              View Orders
            </Button>
          </Box>
        </Paper>
      </Container>
    </Page>
  );
}