import React from 'react';
import ShoesItems from './ShoesItems';

//get and map/prop shoes into ShoesItems below

const Shoes = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const getProducts = async () => {
		const res = await fetch(import.meta.env.VITE_SERVER + '/api/product');
		const data = await res.json();
		setProducts(data);
		console.log(data);
	};

	const filterProducts = (category, subcategory) => {
		const filter = products.filter(
			(item) => item.category === category && item.subcategory === subcategory
		);
		setFilteredProducts(filter);
	};

	useEffect(() => {
		getProducts();
		console.log(products);
	}, []);

	useEffect(() => {
		filterProducts('Men', 'Shoes');
	}, [products]);

	return (
		<>
			<ShoesItems></ShoesItems>
		</>
	);
};

export default Shoes;
