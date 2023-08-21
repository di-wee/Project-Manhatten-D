import { Dialog, DialogTitle, DialogContent, Box, Button } from '@mui/material';

import React, { useContext } from 'react';
import ShoppingContext from '../../context/ShoppingContext';

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

	console.log(shoppingCart);

	return (
		<>
			<Dialog
				onClose={() => setShowModal(false)}
				open={true}
				maxWidth='xl'
				fullWidth>
				<DialogTitle sx={{ textAlign: 'center', marginTop: '20px' }}>
					<h3>{name}</h3>
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
						}}>
						X
					</Button>
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
							<img
								src={`/${image1}`}
								style={{ width: '300px', margin: '5px' }}
							/>
							{image2 && (
								<>
									<img
										src={`/${image2}`}
										style={{ width: '300px', margin: '5px' }}
									/>
									<img
										src={`/${image3}`}
										style={{ width: '300px', margin: '5px' }}
									/>
									<img
										src={`/${image4}`}
										style={{ width: '300px', margin: '5px' }}
									/>
								</>
							)}
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
							onClick={handleCart}
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
