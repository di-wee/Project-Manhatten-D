import React, { useContext, useEffect, useState } from 'react';
import ShoppingContext from '../../context/ShoppingContext';
import ProductItem from './ProductItem';

const Product = (props) => {
	const { category, subcategory } = props;
	const shoppingCtx = useContext(ShoppingContext);
	const { product, setProduct } = shoppingCtx;

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
			{product.map((item) => {
				return (
					<ProductItem
						key={item._id}
						id={item._id}
						name={item.name}
						description={item.description}
						price={item.price}
						image={item.image}
						category={item.category}
						subcategory={item.subcategory}></ProductItem>
				);
			})}
		</div>
	);
};

export default Product;
