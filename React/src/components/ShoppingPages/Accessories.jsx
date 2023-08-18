import React, { useContext, useEffect, useState } from 'react';
import AccessoriesItem from './AccessoriesItem';
import ShoppingContext from '../../context/ShoppingContext';
import { Button } from '@mui/material';

const Accessories = (props) => {
	const { category, subcategory } = props;
	const shoppingCtx = useContext(ShoppingContext);
	const { accessories, setAccessories } = shoppingCtx;

	const getProducts = async (category, subcategory) => {
		try {
			let url = import.meta.env.VITE_SERVER + '/api/product';

			if (category) {
				url += `?category=${category}`;
			}
			if (subcategory) {
				url += subcategory ? `&subcategory=${subcategory}` : '';
			}
			const res = await fetch(url);
			const data = await res.json();

			setAccessories(data);

			if (!res.ok) {
				alert('error fetching data!');
			}
		} catch (error) {
			console.log(error.message);
			alert('an error has occured');
		}
	};

	useEffect(() => {
		getProducts(category, subcategory);
	}, [category, subcategory]);

	return (
		<div>
			{accessories.map((item) => {
				return (
					<AccessoriesItem
						key={item._id}
						id={item._id}
						name={item.name}
						description={item.description}
						price={item.price}
						image={item.image}
						category={item.category}
						subcategory={item.subcategory}></AccessoriesItem>
				);
			})}
		</div>
	);
};

export default Accessories;
