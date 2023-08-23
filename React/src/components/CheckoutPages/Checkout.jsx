import React, { useState, useRef, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

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
import ShoppingContext from '../../context/ShoppingContext';

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [address, setAddress] = useState([]);
	const navigate = useNavigate();
	const shoppingCtx = useContext(ShoppingContext);
	const { cartId } = shoppingCtx;

	const fullNameRef = useRef();
	const addressLine1Ref = useRef();
	const addressLine2Ref = useRef();
	const cityRef = useRef();
	const stateRef = useRef();
	const countryRef = useRef();
	const postalCodeRef = useRef();
	const emailAddressRef = useRef();

	const [clientSecret, setClientSecret] = useState(null);
	const [loading, setLoading] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const steps = ['Shipping Details', 'Payment Information'];

	//GET addresses
	const getAddress = async () => {
		const res = await fetch(import.meta.env.VITE_SERVER + '/api4/address');

		const data = await res.json();
		setAddress(data);
		console.log(data);
	};

	//PUT addresses
	const addAddress = async () => {
		const res = await fetch(import.meta.env.VITE_SERVER + '/api4/address', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				fullName: fullNameRef.current.value,
				addressLine1: addressLine1Ref.current.value,
				addressLine2: addressLine2Ref.current.value,
				city: cityRef.current.value,
				state: stateRef.current.value,
				country: countryRef.current.value,
				postalCode: postalCodeRef.current.value,
				emailAddress: emailAddressRef.current.value,
			}),
		});
		if (res.status === 200) {
			getAddress();
			fullNameRef.current.value = '';
			addressLine1Ref.current.value = '';
			addressLine2Ref.current.value = '';
			cityRef.current.value = '';
			stateRef.current.value = '';
			countryRef.current.value = '';
			postalCodeRef.current.value;
			emailAddressRef.current.value = '';
		}
	};

	const validateFields = () => {
		const requiredFields = [
			fullNameRef.current.value,
			addressLine1Ref.current.value,
			cityRef.current.value,
			stateRef.current.value,
			countryRef.current.value,
			postalCodeRef.current.value,
			emailAddressRef.current.value,
		];

		for (let field of requiredFields) {
			if (field === '') {
				return false;
			}
		}
		return true;
	};
	const createPaymentIntent = async (cartId) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER}/api1/payment/intent/${cartId}`,
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

	const handleSubmit = async (cartId) => {
		setLoading(true);
		const receivedClientSecret = await createPaymentIntent(cartId);

		if (!receivedClientSecret) {
			console.log('error saving clientSecret for backend');
			setLoading(false);
			return;
		}

		const clientSecret = receivedClientSecret;

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
			billing_details: {
				name: fullNameRef.current.value,
				address: {
					city: cityRef.current.value,
					line1: addressLine1Ref.current.value,
					state: stateRef.current.value,
					postal_code: postalCodeRef.current.value,
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
				navigate('/shopping-cart/checkout/payment');
			}
		}
	};

	const handleDefault = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		getAddress();
	}, []);

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
			<form onSubmit={handleDefault}>
				{activeStep === 0 ? (
					<>
						<Typography variant='h6'>Shipping Details</Typography>
						<Box mb={2}>
							<TextField
								fullWidth
								required
								label='Full Name'
								name='fullName'
								inputRef={fullNameRef}
							/>
						</Box>
						<Box mb={2}>
							<TextField
								fullWidth
								required
								label='Address'
								name='addressline1'
								inputRef={addressLine1Ref}
							/>
						</Box>
						<Box mb={2}>
							<TextField
								fullWidth
								required
								label='Address'
								name='addressline2'
								inputRef={addressLine2Ref}
							/>
						</Box>
						<Box mb={2}>
							<TextField
								fullWidth
								required
								label='City'
								name='city'
								inputRef={cityRef}
							/>
						</Box>
						<Box mb={2}>
							<TextField
								fullWidth
								required
								label='State'
								name='state'
								inputRef={stateRef}
							/>
						</Box>
						<Box mb={2}>
							<TextField
								fullWidth
								required
								label='Address'
								name='address'
								inputRef={countryRef}
							/>
						</Box>
						<Box mb={2}>
							<TextField
								fullWidth
								required
								label='Postal Code'
								name='postalcode'
								inputRef={postalCodeRef}
							/>
						</Box>
						<Box mb={2}>
							<TextField
								fullWidth
								required
								label='Email Address'
								name='emailaddress'
								inputRef={emailAddressRef}
							/>
						</Box>
					</>
				) : (
					<>
						<Typography variant='h6'>Payment Information</Typography>
						<Box
							mb={4}
							mt={4}>
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
					onClick={() => {
						if (activeStep === 0) {
							if (validateFields()) {
								setActiveStep(1);
								addAddress();
							} else {
								alert('Please fill in all required fields before proceeding.');
							}
						} else {
							handleSubmit();
						}
					}}
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
