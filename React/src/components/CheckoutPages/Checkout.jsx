import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const Checkout = (props) => {
	const [formData, setFormData] = useState({
		fullName: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		cardName: '',
		cardNumber: '',
		expiration: '',
		cvv: '',
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Checkout data:', formData);
		// Process the checkout data
		// Redirect to confirmation page, etc.
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
					<TextField
						fullWidth
						required
						label='Cardholder Name'
						name='cardName'
						value={formData.cardName}
						onChange={handleInputChange}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						required
						label='Card Number'
						name='cardNumber'
						value={formData.cardNumber}
						onChange={handleInputChange}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						required
						label='Expiration Date'
						name='expiration'
						value={formData.expiration}
						onChange={handleInputChange}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						required
						label='CVV'
						name='cvv'
						value={formData.cvv}
						onChange={handleInputChange}
					/>
				</Box>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth>
					Complete Checkout
				</Button>
			</form>
		</Container>
	);
};

export default Checkout;
