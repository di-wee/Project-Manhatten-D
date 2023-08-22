import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
	Button,
	TextField,
	Container,
	Typography,
	Box,
	CircularProgress,
} from '@mui/material';

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements(); //calls the layout/UI of stripe
	const [formData, setFormData] = useState({
		fullName: '',
		address: '',
		city: '',
		state: '',
		zip: '',
	});
	const [clientSecret, setClientSecret] = useState(null);
	const [loading, setLoading] = useState(false);
	const createPaymentIntent = async () => {
		try {
			const response = await fetch(
				import.meta.env.VITE_SERVER + '/api/payment/intent',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const data = await response.json();
			setClientSecret(data.clientSecret); // clientsecret from backend side
		} catch (error) {
			console.log(error.message);
			alert('error creating payment intent!');
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		await createPaymentIntent(); //setting clientSecret to state

		if (!clientSecret) {
			// if clientSecret is not set to state
			console.log('error saving clientSecret for backend');
			setLoading(false);
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement), // this is stripe's element so none of the card details goes to our backend; goes straight to stripe
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
			alert('error with payment');
			setLoading(false);
		} else {
			// confirming the PaymentIntent with the payment method

			//renaming error to confirmationError for clarity
			const { error: confirmationError } = await stripe.confirmCardPayment(
				clientSecret,
				{
					payment_method: paymentMethod.id,
				}
			);

			if (confirmationError) {
				console.log('Error confirming PaymentIntent:', confirmationError);
				setLoading(false);
			} else {
				console.log('Payment successful!');
			}
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};
	return (
		<Container>
			<Typography
				variant='h4'
				align='center'>
				Checkout
			</Typography>
			<form onSubmit={handleSubmit}>
				<Typography variant='h6'>Shipping Details</Typography>
				<Box mb={2}>
					<TextField
						fullWidth
						required
						label='Full Name'
						name='fullName'
						value={formData.fullName}
						onChange={handleInputChange}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						required
						label='Address'
						name='address'
						value={formData.address}
						onChange={handleInputChange}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						required
						label='City'
						name='city'
						value={formData.city}
						onChange={handleInputChange}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						required
						label='State'
						name='state'
						value={formData.state}
						onChange={handleInputChange}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						required
						label='ZIP Code'
						name='zip'
						value={formData.zip}
						onChange={handleInputChange}
					/>
				</Box>
				<Typography variant='h6'>Payment Information</Typography>
				<Box mb={2}>
					<Typography variant='subtitle2'>Credit Card</Typography>
					<Box
						sx={{
							border: '1px solid rgba(0, 0, 0, 0.23)',
							borderRadius: '4px',
							p: 1,
							'&:hover': {
								borderColor: 'rgba(0, 0, 0, 0.87)',
							},
							'&.Mui-focused': {
								borderColor: 'primary.main',
								boxShadow: (t) => `0 0 0 0.2rem ${t.palette.primary.light}`,
							},
						}}>
						<CardElement
							options={{
								style: {
									base: {
										fontSize: '16px',
										color: '#424770',
										'::placeholder': {
											color: '#aab7c4',
										},
									},
									invalid: {
										color: '#9e2146',
									},
								},
							}}
						/>
					</Box>
				</Box>
				<Button
					onClick={handleSubmit}
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					disabled={loading}
					startIcon={
						loading ? (
							<CircularProgress
								size={20}
								color='inherit'
							/>
						) : null
					}>
					{loading ? 'Processing...' : 'Complete Checkout'}
				</Button>
			</form>
		</Container>
	);
}

export default CheckoutForm;
