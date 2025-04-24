import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Grid, 
  Box, 
  IconButton, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Page from 'components/Page';
import { useForm } from 'react-hook-form';

interface AddressFormData {
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface Address extends AddressFormData {
  id: number;
}

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: 'Home',
      address: '123 Main St, Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressFormData>();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAddress(null);
    reset();
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    reset(address);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const onSubmit = (data: AddressFormData) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...data, id: editingAddress.id } 
          : data.isDefault ? { ...addr, isDefault: false } : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        ...data,
        id: Math.max(...addresses.map(a => a.id), 0) + 1
      };
      
      setAddresses(prev => [
        ...prev.map(addr => data.isDefault ? { ...addr, isDefault: false } : addr),
        newAddress
      ]);
    }
    handleCloseDialog();
  };

  return (
    <Page title="Saved Addresses">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Saved Addresses</Typography>
          <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpenDialog}>
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
                    <IconButton size="small" onClick={() => handleEdit(address)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleDelete(address.id)}
                      disabled={address.isDefault}
                    >
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

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Type"
                    placeholder="Home, Office, etc."
                    {...register('type', { required: 'Address type is required' })}
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    {...register('address', { required: 'Address is required' })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    {...register('city', { required: 'City is required' })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    {...register('state', { required: 'State is required' })}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    {...register('pincode', { 
                      required: 'Pincode is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Please enter a valid 6-digit pincode'
                      }
                    })}
                    error={!!errors.pincode}
                    helperText={errors.pincode?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register('isDefault')}
                      />
                    }
                    label="Set as default address"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingAddress ? 'Save Changes' : 'Add Address'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Page>
  );
}
