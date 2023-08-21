import {
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
	Button,
	IconButton,
} from '@mui/material';

import React, { useContext } from 'react';
import ShoppingContext from '../../context/ShoppingContext';
import { Close } from '@mui/icons-material';

const ProductModal = (props) => {
	const {
		image1,
		image2,
		image3,
		image4,
		name,
		description,
		price,
		category,
		subcategory,
		setShowModal,
	} = props;

	const cartCtx = useContext(ShoppingContext);
	const { shoppingCart, setShoppingCart } = cartCtx;

	const handleCart = () => {
		const addedItem = {
			id: Math.floor(Math.random() * 100000).toString(),
			name: name,
			price: price,
		};

		setShoppingCart((prevCart) => [...prevCart, addedItem]);
	};
	const handleClose = () => {
		setShowModal(false);
		handleCart();
	};
	console.log(shoppingCart);

	const images = [image1, image2, image3, image4].filter(Boolean); // filter for any images that is undefined

	return (
		<>
			<Dialog
				onClose={() => setShowModal(false)}
				open={true}
				maxWidth='xl'
				fullWidth>
				<Button
					onClick={() => setShowModal(false)}
					variant='outlined'
					sx={{
						position: 'absolute',
						top: '10px',
						right: '10px',
						width: '10px',
						color: 'black',
						backgroundColor: 'white',
						borderColor: 'black',
						justifyItems: 'center',
						margin: '10px auto',
						zIndex: 1, // to ensure it appears above other content
					}}>
					X
				</Button>
				<DialogTitle sx={{ textAlign: 'center', marginTop: '20px' }}>
					<h3>{name}</h3>
				</DialogTitle>

				<DialogContent dividers>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flexWrap: 'wrap',
							minWidth: 500,
							width: '100%',
							justifyContent: 'center',
							justifyItems: 'center',
							textAlign: 'center',
							fontSize: '18px',
						}}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							{images.map((img, idx) => (
								<img
									key={idx}
									src={`/${img}`}
									style={{ width: '300px', margin: '5px' }}
								/>
							))}
						</div>
						<br />
						<p>
							<strong>Description:</strong> {description}
						</p>
						<p>
							<strong>Price:</strong> ${price}
						</p>
						<p>
							<strong>Category:</strong> {category}
						</p>
						<p>
							<strong>Subcategory:</strong> {subcategory}
						</p>
						<Button
							onClick={handleClose}
							style={{ width: '150px' }}
							variant='contained'
							sx={{
								width: '150px',
								color: 'white', // Set the text color
								backgroundColor: 'black', // Set the background color
								justifyItems: 'center',
								margin: '10px auto',
							}}>
							Add to Cart
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProductModal;
