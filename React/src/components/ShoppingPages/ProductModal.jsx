import {
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
	Button,
	TextField,
	Typography,
} from '@mui/material';

import React, { useState } from 'react';

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
		showModal,
		setShowModal,
		stock,
		handleCart,
	} = props;
	const [value, setValue] = useState(0);
	const images = [image1, image2, image3, image4].filter(Boolean); // filter for any images that is undefined
	const handleChange = (event) => {};
	return (
		<>
			<Dialog
				onClose={() => setShowModal(false)}
				open={showModal}
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
						<Box>
							<Typography>Quantity:</Typography>
							<TextField
								value={value}
								variant='outlined'
								type='number'
								inputProps={{ min: '0' }}
								style={{ margin: '0 10px' }}></TextField>
						</Box>

						{stock > 0 ? (
							<Button
								onClick={() => {
									handleCart();
									setShowModal(false);
								}}
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
						) : (
							<p style={{ color: 'red' }}>Out of stock</p>
						)}
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProductModal;
