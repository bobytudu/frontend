import React from 'react';
import { Container, Paper, Typography, Button, Grid, Box, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Page from 'components/Page';

export default function SavedAddresses() {
  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main St, Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    // Add more addresses as needed
  ];

  return (
    <Page title="Saved Addresses">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Saved Addresses</Typography>
          <Button startIcon={<AddIcon />} variant="contained">
            Add New Address
          </Button>
        </Box>
        <Grid container spacing={3}>
          {addresses.map((address) => (
            <Grid item xs={12} key={address.id}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">
                    {address.type}
                    {address.isDefault && (
                      <Chip size="small" label="Default" color="primary" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                  <Box>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography>{address.address}</Typography>
                <Typography>{address.city}, {address.state} - {address.pincode}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}