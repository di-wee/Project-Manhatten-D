import React from 'react';
import Checkout from './Checkout';
import { Link } from 'react-router-dom';

//to display items that have been added to shopping cart
//allow updating/deleting of cart item quantities
//display cost per item and total order cost

const ShoppingCart = (props) => {
	//prop states down from apps using useContext
	//map out the items
	//create delete item from cart button
	//checkout button to go proceed to checkout page
	return (
		<>
			<Link
				to='checkout'
				style={{ textDecoration: 'none' }}>
				<Typography sx={{ color: 'gray' }}>Check out</Typography>
			</Link>
		</>
	);
};

export default ShoppingCart;
