import React, { useContext, useEffect } from 'react';
import ShoesItems from './ShoesItems';
import ShoppingContext from '../../context/ShoppingContext';

//get and map/prop shoes into ShoesItems below

const Shoes = (props) => {
	const { category, subcategory } = props;
	const shoppingCtx = useContext(ShoppingContext);
	const { shoes, setShoes } = shoppingCtx;

	const getProducts = async (category, subcategory) => {
		let url = import.meta.env.VITE_SERVER + '/api/product';
		if (category) {
			url += `?category=${category}`; //adding filtering query for filter if category is present
		}
		if (subcategory) {
			url += subcategory ? `&subcategory=${subcategory}` : ''; //if subcategory is present to add query filter else blank
		}
		const res = await fetch(url);
		const data = await res.json();
		setShoes(data);
	};

	useEffect(() => {
		getProducts(category, subcategory);
		console.log(shoes);
	}, [category, subcategory]);

	return (
		<>
			{shoes.map((item) => {
				return (
					<ShoesItems
						key={item._id}
						id={item._id}
						name={item.name}
						description={item.description}
						price={item.price}
						image={item.image}
						category={item.category}
						subcategory={item.subcategory}></ShoesItems>
				);
			})}
		</>
	);
};

export default Shoes;
