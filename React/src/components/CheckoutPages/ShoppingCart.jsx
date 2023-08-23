import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoppingContext from '../../context/ShoppingContext';

const ShoppingCart = (props) => {
	const shoppingCtx = useContext(ShoppingContext);
	const { cartItems, cartId, getItems } = shoppingCtx;
	const cartArray = cartItems.items; // getting item array from cart
	const [value, setValue] = useState(1);
	const [totalCost, setTotalCost] = useState(0);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const removeFromCart = async (productid) => {
		try {
			const res = await fetch(import.meta.env.VITE_SERVER + '/api2/cart/', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					productId: productid,
					cartId: cartId,
				}),
			});

			if (res.ok) {
				getItems(cartId);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = (productid) => {
		removeFromCart(productid);
	};

	useEffect(() => {
		let total = 0;
		cartArray.forEach((item) => {
			total += item.product.price * item.quantity;
		});
		setTotalCost(total);
	}, [cartArray]);

	return (
		<div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
			<Typography
				sx={{ fontWeight: 'bold', color: 'grey', textAlign: 'center' }}>
				Yo Mama's Cart
			</Typography>
			<>
				{cartArray.map((item, index) => (
					<div
						key={index}
						style={{ display: 'flex', alignItems: 'center' }}>
						<img
							src={item.product.image[0]}
							alt={item.name}
							width={'160px'}
						/>
						<div style={{ margin: 'center' }}>
							<Typography sx={{ color: 'grey', textAlign: 'center' }}>
								{item.product.name}
							</Typography>
							<Typography sx={{ color: 'grey', textAlign: 'center' }}>
								${item.product.price} x {item.quantity}
							</Typography>
							<Box>
								<Typography>Quantity:</Typography>
								<TextField
									onChange={handleChange}
									value={value}
									variant='outlined'
									type='number'
									inputProps={{ min: '0' }}
									style={{ margin: '0 10px' }}></TextField>
							</Box>

							<Button
								onClick={() => handleDelete(item.product._id)}
								variant='contained'>
								Delete From Cart
							</Button>
						</div>
					</div>
				))}
			</>
			<div style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>
				Total Order Cost: ${totalCost.toFixed(2)}
			</div>
			<Button variant='contained'>
				<Link
					to='/'
					style={{ textDecoration: 'none' }}>
					<Typography sx={{ color: 'gray' }}>browse more</Typography>
				</Link>
			</Button>
			<Button variant='contained'>
				<Link
					to='checkout'
					style={{ textDecoration: 'none' }}>
					<Typography sx={{ color: 'gray' }}>Check out</Typography>
				</Link>
			</Button>
		</div>
	);
};

export default ShoppingCart;
