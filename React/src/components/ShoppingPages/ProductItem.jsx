import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Button,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import ProductModal from './ProductModal';
import ShoppingContext from '../../context/ShoppingContext';

const ProductItem = (props) => {
	const { image, name, description, price, category, subcategory } = props;
	const [showModal, setShowModal] = useState(false);
	const [stock, setStock] = useState(5);

	const cartCtx = useContext(ShoppingContext);
	const { shoppingCart, setShoppingCart } = cartCtx;

	const handleCart = () => {
		const addedItem = {
			id: Math.floor(Math.random() * 100000).toString(),
			name: name,
			price: price,
		};

		setShoppingCart((prevCart) => [...prevCart, addedItem]);
		console.log(shoppingCart);
	};

	//   //POST (store items in shopping cart in database)
	//   const addItems = async () => {
	//  const res = await fetch(import.meta.env.VITE_SERVER) + "/product"
	//   }

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
								onClick={handleCart}
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
					stock={stock}
					setStock={setStock}
					handleCart={handleCart}></ProductModal>
			)}
		</>
	);
};

export default ProductItem;
