import React from 'react';
import { Container, Paper, Typography, Button, Grid, Box, IconButton, Chip } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Page from 'components/Page';

export default function PaymentMethods() {
  const cards = [
    {
      id: 1,
      type: 'Visa',
      number: '****-****-****-4242',
      expiry: '12/24',
      isDefault: true,
    },
    // Add more cards as needed
  ];

  return (
    <Page title="Payment Methods">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Payment Methods</Typography>
          <Button startIcon={<AddIcon />} variant="contained">
            Add New Card
          </Button>
        </Box>
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} key={card.id}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <CreditCardIcon />
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6">{card.type}</Typography>
                <Typography>{card.number}</Typography>
                <Typography color="text.secondary">Expires: {card.expiry}</Typography>
                {card.isDefault && (
                  <Chip size="small" label="Default" color="primary" sx={{ mt: 1 }} />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}