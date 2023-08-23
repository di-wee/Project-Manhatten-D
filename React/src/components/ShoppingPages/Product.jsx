import React, { useContext, useEffect, useState } from 'react';
import ShoppingContext from '../../context/ShoppingContext';
import ProductItem from './ProductItem';
import { Grid } from '@mui/material';

const Product = (props) => {
	const { category, subcategory } = props; //category and subcategory propped down from pages
	//state management
	const shoppingCtx = useContext(ShoppingContext);

	const { product, setProduct } = shoppingCtx;

	const getProducts = async (category, subcategory) => {
		try {
			let url = import.meta.env.VITE_SERVER + '/api3/product';

			if (category) {
				url += `?category=${category}`; // if category exist, will add on to query paramater
			}
			if (subcategory) {
				url += subcategory ? `&subcategory=${subcategory}` : ''; // if subcategroy is present will add on subcategory or else  it'll be blank
			}
			const res = await fetch(url);
			const data = await res.json();

			setProduct(data);

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
			<Grid
				container
				alignItems='center'
				justifyContent='center'
				spacing={2.5}>
				{product.map((item) => {
					return (
						<Grid
							item
							xs={12}
							sm={4}
							md={3}
							lg={2.7}
							key={item._id}>
							<ProductItem
								key={item._id}
								id={item._id}
								name={item.name}
								description={item.description}
								price={item.price}
								image={item.image}
								category={item.category}
								subcategory={item.subcategory}
								stock={item.stock}></ProductItem>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

export default Product;
