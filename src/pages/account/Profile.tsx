import React from 'react';
import { Container, Paper, Typography, Grid, TextField, Button, Avatar, Box } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import Page from 'components/Page';

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = React.useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  return (
    <Page title="Profile">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={`${user?.photoURL}`}
              sx={{ width: 80, height: 80 }}
            />
            <Typography variant="h5">Profile Settings</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Page>
  );
}