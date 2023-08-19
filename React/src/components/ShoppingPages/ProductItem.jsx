import { Typography } from '@mui/material';
import React from 'react';
import ProductModal from './ProductModal';

const ProductItem = (props) => {
	const { image, name, description, price, category, subcategory } = props;
	return (
		<div>
			<img
				src={image}
				className='row'></img>
			<Typography>{name}</Typography>
			<Typography>{description}</Typography>
			<Typography>{price}</Typography>
			<Typography>{category}</Typography>
			<Typography>{subcategory}</Typography>
			<ProductModal></ProductModal>
		</div>
	);
};

export default ProductItem;
