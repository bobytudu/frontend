import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Page from 'components/Page';

export default function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: 'Product Name',
      price: 1999,
      image: 'product-image-url',
      brand: 'Brand Name',
    },
    // Add more items as needed
  ];

  return (
    <Page title="Wishlist">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>My Wishlist</Typography>
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.brand}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ₹{item.price}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      fullWidth
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}