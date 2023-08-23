import { Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ShoppingContext from '../../context/ShoppingContext';

const ShoppingCart = (props) => {
	const shoppingCtx = useContext(ShoppingContext);
	const { cartItems } = shoppingCtx;
	const cartArray = cartItems.items; // getting item array from cart

	const removeFromCart = (index) => {
		shoppingCtx.removeFromCart(index);
	};

	const increaseQuantity = (index) => {
		// Increase the quantity of an item
		const itemToUpdate = cartArray[index];
		itemToUpdate.quantity += 1;

		// Trigger a re-render by updating the state
		shoppingCtx.updateCartItem(index, itemToUpdate);
	};

	const decreaseQuantity = (index) => {
		// Increase the quantity of an item
		const itemToUpdate = cartArray[index];
		itemToUpdate.quantity += -1;

		// Trigger a re-render by updating the state
		shoppingCtx.updateCartItem(index, itemToUpdate);
	};

	const [totalCost, setTotalCost] = React.useState(0);

	React.useEffect(() => {
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
							<Button
								sx={{ color: 'grey' }}
								onClick={() => increaseQuantity(index)}>
								Increase
							</Button>
							<Button
								sx={{ color: 'grey' }}
								onClick={() => decreaseQuantity(index)}>
								Decrease
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
