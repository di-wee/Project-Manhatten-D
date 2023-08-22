import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, TextField, Container, Typography, Box } from "@mui/material";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements(); //calls the layout/UI of stripe
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement), //credit card details will be stored in CardElement and sent to Stripe. we do not store any cc details on our end. getElement = get the credit card details of user
      billing_details: {
        name: formData.fullName,
        address: {
          city: formData.city,
          line1: formData.address,
          state: formData.state,
          postal_code: formData.zip,
        },
      },
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Send paymentMethod.id to your server
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center">
        Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Shipping Details</Typography>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="ZIP Code"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
          />
        </Box>
        <Typography variant="h6">Payment Information</Typography>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="Cardholder Name"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="Expiration Date"
            name="expiration"
            value={formData.expiration}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="CVV"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Complete Checkout
        </Button>
      </form>
    </Container>
  );
}

export default CheckoutForm;
