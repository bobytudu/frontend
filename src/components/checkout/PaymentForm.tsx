import React from 'react';
import { Box, Grid, TextField, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface PaymentFormProps {
  paymentMethod: string;
  handlePaymentMethodChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PaymentForm({ paymentMethod, handlePaymentMethodChange }: PaymentFormProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label="Cash on Delivery"
        />
        <FormControlLabel
          value="card"
          control={<Radio />}
          label="Credit/Debit Card"
        />
        <FormControlLabel
          value="upi"
          control={<Radio />}
          label="UPI Payment"
        />
      </RadioGroup>
      
      {paymentMethod === 'card' && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              placeholder="1234 5678 9012 3456"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiry Date"
              placeholder="MM/YY"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              type="password"
              placeholder="123"
            />
          </Grid>
        </Grid>
      )}

      {paymentMethod === 'upi' && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="UPI ID"
              placeholder="username@upi"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}