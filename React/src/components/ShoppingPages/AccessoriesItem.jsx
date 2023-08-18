import React from 'react';
import AccessoriesModal from './AccessoriesModal';
import { Typography } from '@mui/material';

const AccessoriesItem = (props) => {
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
			<AccessoriesModal></AccessoriesModal>
		</div>
	);
};

export default AccessoriesItem;
