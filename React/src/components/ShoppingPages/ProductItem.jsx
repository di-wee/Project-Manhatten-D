import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Button,
} from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import ProductModal from './ProductModal';
import ShoppingContext from '../../context/ShoppingContext';

const ProductItem = (props) => {
	const { id, image, name, description, price, category, subcategory, stock } =
		props;
	const [showModal, setShowModal] = useState(false);

	const cartCtx = useContext(ShoppingContext);
	const { setShoppingCart, cartItems, cartId, getItems } = cartCtx;

	//PUT (store items in shopping cart in database)
	const addItems = async (productid, quantity) => {
		const res = await fetch(import.meta.env.VITE_SERVER + '/api2/cart/', {
			method: 'PUT',

			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				productId: productid,
				cartId: cartId,
				price: price,
				quantity: quantity,
			}),
		});

		if (res.ok) {
			getItems(cartId);
		} else {
			console.log('error adding items to cart');
		}
	};

	const handleCart = (productid, quantity) => {
		addItems(productid, quantity);
		console.log(cartItems.items);
	};

	useEffect(() => {
		getItems(cartId);
	}, []);

	return (
		<>
			<Card
				sx={{
					width: 300,
				}}>
				<CardActionArea>
					<CardMedia
						component='img'
						height='360'
						image={`/${image[0]}`}
					/>
					<CardContent>
						<Typography
							gutterBottom
							variant='h5'
							component='div'>
							{name}
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'>
							${price}
						</Typography>
						<Button
							onClick={() => setShowModal(true)}
							variant='outlined'
							sx={{
								width: '10px',
								color: 'black',
								backgroundColor: 'white',
								borderColor: 'black',
								justifyItems: 'center',
								margin: '10px 5px',
							}}>
							Details
						</Button>
						{stock > 0 ? (
							<Button
								onClick={() => handleCart(id)}
								style={{ width: '110px' }}
								variant='contained'
								sx={{
									width: '150px',
									color: 'white',
									backgroundColor: 'black',
									justifyItems: 'center',
									margin: '10px 5px',
								}}>
								Add to Cart
							</Button>
						) : (
							<p style={{ color: 'red' }}>Out of stock</p>
						)}
					</CardContent>
				</CardActionArea>
			</Card>

			{showModal && (
				<ProductModal
					image1={image[0]}
					image2={image[1]}
					image3={image[2]}
					image4={image[3]}
					name={name}
					description={description}
					price={price}
					category={category}
					subcategory={subcategory}
					showModal={showModal}
					setShowModal={setShowModal}
					handleCart={handleCart}
					stock={stock}
					id={id}></ProductModal>
			)}
		</>
	);
};

export default ProductItem;
