import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

//receive user's address and payment method
//display total order cost

const Checkout = () => {
	return (
		<div>
			<Button variant='contained'>
				<Link
					to='payment'
					style={{ textDecoration: 'none' }}>
					<Typography sx={{ color: 'gray' }}>Submit</Typography>
				</Link>
			</Button>
		</div>
	);
};

export default Checkout;
