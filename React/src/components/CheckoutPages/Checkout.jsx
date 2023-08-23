import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
	Button,
	TextField,
	Container,
	Typography,
	Box,
	CircularProgress,
	Stepper,
	Step,
	StepLabel,
} from '@mui/material';

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [formData, setFormData] = useState({
		fullName: '',
		address: '',
		city: '',
		state: '',
		zip: '',
	});
	const [clientSecret, setClientSecret] = useState(null);
	const [loading, setLoading] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const steps = ['Shipping Details', 'Payment Information'];

	const createPaymentIntent = async (cartId) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER}/api/payment/intent/${cartId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const data = await response.json();
			setClientSecret(data.clientSecret);
			return data.clientSecret;
		} catch (error) {
			console.log(error.message);
			alert('error creating payment intent!');
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const receivedClientSecret = await createPaymentIntent(
			'64e4bb81b63cbb3c95ca9c34'
		);

		if (!receivedClientSecret) {
			console.log('error saving clientSecret for backend');
			setLoading(false);
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
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
				alert('Payment successful!');
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
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={index}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<form onSubmit={handleSubmit}>
				{activeStep === 0 ? (
					<>
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
					</>
				) : (
					<>
						<Typography variant='h6'>Payment Information</Typography>
						<Box mb={2}>
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
					</>
				)}
				<Button
					onClick={() => (activeStep === 0 ? setActiveStep(1) : handleSubmit())}
					type={activeStep === 0 ? 'button' : 'submit'}
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
					{loading
						? 'Processing...'
						: activeStep === 0
						? 'Next'
						: 'Complete Checkout'}
				</Button>
			</form>
		</Container>
	);
}

export default CheckoutForm;
