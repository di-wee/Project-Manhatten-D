import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ProductModal from './ProductModal';

const ProductItem = (props) => {
	const { image, name, description, price, category, subcategory } = props;
	const [showModal, setShowModal] = useState(false);
	return (
		<div>
			<Card
				sx={{
					width: 400,
					margin: '2rem',
				}}>
				<CardActionArea>
					<CardMedia
						component='img'
						height='380'
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
					</CardContent>
				</CardActionArea>
			</Card>

			<ProductModal></ProductModal>
		</div>
	);
};

export default ProductItem;
