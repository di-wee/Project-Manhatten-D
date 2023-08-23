import React, { useContext } from 'react';
import ShoppingContext from '../../context/ShoppingContext';
import {
	Container,
	Paper,
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Divider,
} from '@mui/material';

const Payment = () => {
	const shoppingCtx = useContext(ShoppingContext);
	const { cartItems, clearCart } = shoppingCtx;
	const cartArray = cartItems.items;

	// Calculate the total price based on the cart items.
	console.log(shoppingCtx, cartItems);
	const totalPrice = cartArray.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0
	);

	return (
		<Container>
			<Paper
				elevation={3}
				style={{ padding: '2rem', marginTop: '2rem' }}>
				<Typography
					variant='h4'
					align='center'
					gutterBottom>
					Receipt
				</Typography>
				<Divider style={{ margin: '1rem 0' }} />

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Items</TableCell>
							<TableCell align='center'>Quantity</TableCell>
							<TableCell align='center'>Price</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cartArray.map((item, index) => (
							<TableRow key={index}>
								<TableCell>
									<img
										src={`/${item.product.image[0]}`}
										alt={item.product.name}
										style={{
											width: '200px',
											height: '240px',
											marginRight: '1rem',
										}}
									/>
									{item.product.name}
								</TableCell>
								<TableCell align='center'>{item.quantity}</TableCell>
								<TableCell align='center'>
									${item.product.price * item.quantity}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Typography
					variant='h6'
					align='right'
					style={{ marginTop: '1rem' }}>
					Total Price: ${totalPrice}
				</Typography>

				<Typography
					variant='body1'
					align='center'
					style={{ marginTop: '2rem' }}>
					Your order has been confirmed!
				</Typography>
			</Paper>
		</Container>
	);
};

export default Payment;
