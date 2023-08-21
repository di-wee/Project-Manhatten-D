import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Button,
} from '@mui/material';
import React, { useState } from 'react';
import ProductModal from './ProductModal';

const ProductItem = (props) => {
	const { image, name, description, price, category, subcategory } = props;
	const [showModal, setShowModal] = useState(false);

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
							{price}
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
								margin: '10px auto',
							}}>
							Details
						</Button>
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
					setShowModal={setShowModal}></ProductModal>
			)}
		</>
	);
};

export default ProductItem;
