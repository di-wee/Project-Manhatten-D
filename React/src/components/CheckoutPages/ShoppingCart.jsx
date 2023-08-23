import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoppingContext from '../../context/ShoppingContext';

const ShoppingCart = (props) => {
	const shoppingCtx = useContext(ShoppingContext);
	const { cartItems, cartId, getItems } = shoppingCtx;
	const cartArray = cartItems.items; // getting item array from cart
	const [quantities, setQuantities] = useState({});

	const handleChange = (productId, event) => {
		const updatedQuantities = {
			...quantities,
			[productId]: event.target.value,
		};
		setQuantities(updatedQuantities);
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

	const updateQuantity = async (productId, quantity) => {
		try {
			const res = await fetch(import.meta.env.VITE_SERVER + '/api2/cart', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					productId: productId,
					cartId: cartId,
					quantity: quantity,
				}),
			});

			if (res.ok) {
				const data = await res.json();

				getItems(cartId);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateQuantity = (productId, quantity) => {
		updateQuantity(productId, quantity);
	};
	return (
		<div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
			<Typography
				sx={{ fontWeight: 'bold', color: 'grey', textAlign: 'center' }}>
				Yo Mama's Cart
			</Typography>

			{!cartArray ? (
				<Typography
					sx={{ color: 'grey', textAlign: 'center', marginTop: '20px' }}>
					Your cart is empty.
				</Typography>
			) : (
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
										onChange={(event) => handleChange(item.product._id, event)}
										value={quantities[item.product._id] || item.quantity}
										variant='outlined'
										type='number'
										inputProps={{ min: '0' }}
										style={{ margin: '0 10px' }}></TextField>
								</Box>
								<Button
									onClick={() =>
										handleUpdateQuantity(
											item.product._id,
											quantities[item.product._id] || item.quantity
										)
									}
									variant='contained'>
									Update Quantity
								</Button>

								<Button
									onClick={() => handleDelete(item.product._id)}
									variant='contained'>
									Delete From Cart
								</Button>
							</div>
						</div>
					))}
					<div
						style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>
						Total Order Cost: ${cartItems.totalAmount}
					</div>
				</>
			)}

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
