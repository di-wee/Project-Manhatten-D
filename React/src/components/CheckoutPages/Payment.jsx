import React, { useEffect, useState } from 'react';

const Payment = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		// Define an asynchronous function within the useEffect
		const fetchData = async () => {
			try {
				const apiURL = `${import.meta.env.VITE_SERVER}/api3`;
				// Make a GET request to your API endpoint
				const response = await fetch(apiURL);

				// Parse the JSON data from the response
				const data = await response.json();

				// Set the state with the fetched data
				setItems(data);
			} catch (error) {
				console.error('There was an error fetching the data:', error);
			}
		};

		// Invoke the async function
		fetchData();
	}, []); // Empty dependency array means this useEffect runs once when the component mounts

	const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

	return (
		<div>
			<h2>Receipt</h2>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						{item.name} - ${item.price}
					</li>
				))}
			</ul>
			<h3>Total Price: ${totalPrice}</h3>
			<p>Thank you for purchasing from our website!</p>
		</div>
	);
};

export default Payment;
