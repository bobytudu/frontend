import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import Page from 'components/Page';
import CheckoutForm from 'components/checkout/CheckoutForm';
import PaymentForm from 'components/checkout/PaymentForm';

const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total } = useAppSelector((state) => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Here you would typically make an API call to process the order
    console.log('Order submitted:', { formData, paymentMethod });
    navigate('/order-confirmation');
  };

  const OrderSummary = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar src={item.image} variant="square" />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography>₹{(item.price * item.quantity).toLocaleString()}</Typography>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Subtotal</Typography>
        <Typography>₹{total.toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Shipping</Typography>
        <Typography>Free</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">₹{total.toLocaleString()}</Typography>
      </Box>
    </Box>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <CheckoutForm formData={formData} handleChange={handleChange} />
            <OrderSummary />
          </>
        );
      case 1:
        return (
          <>
            <PaymentForm
              paymentMethod={paymentMethod}
              handlePaymentMethodChange={handlePaymentMethodChange}
            />
            <OrderSummary />
          </>
        );
      case 2:
        return <OrderSummary />;
      default:
        return null;
    }
  };

  return (
    <Page title="Checkout">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Place Order
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Page>
  );
}

