import React from 'react';
import { Container, Paper, Typography, Box, Chip, Grid } from '@mui/material';
import Page from 'components/Page';

export default function OrderHistory() {
  const orders = [
    {
      id: '#ORD001',
      date: '2023-07-20',
      total: 2499,
      status: 'Delivered',
      items: [
        { name: 'Product 1', quantity: 2, price: 999 },
        { name: 'Product 2', quantity: 1, price: 501 },
      ],
    },
    // Add more orders as needed
  ];

  return (
    <Page title="Order History">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Order History</Typography>
        {orders.map((order) => (
          <Paper key={order.id} sx={{ p: 3, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">{order.id}</Typography>
              <Chip
                label={order.status}
                color={order.status === 'Delivered' ? 'success' : 'primary'}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Ordered on: {order.date}
                </Typography>
              </Grid>
              {order.items.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{item.name} x {item.quantity}</Typography>
                    <Typography>₹{item.price}</Typography>
                  </Box>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">₹{order.total}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
    </Page>
  );
}