import React, { useState, useEffect } from 'react';
import '@fontsource/roboto-condensed';
import Main from './pages/Main';
import { Route, Routes } from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material';
import NavBar from './components/NavBar';
import ShoppingCart from './components/CheckoutPages/ShoppingCart';
import { grey } from '@mui/material/colors';
import MenTops from './pages/MenTops';
import MenBottoms from './pages/MenBottoms';
import MenShoes from './pages/MenShoes';
import MenBags from './pages/MenBags';
import MenAccessories from './pages/MenAccessories';
import WomenTops from './pages/WomenTops';
import WomenBottoms from './pages/WomenBottoms';
import WomenShoes from './pages/WomenShoes';
import WomenBags from './pages/WomenBags';
import WomenAccessories from './pages/WomenAccessories';
import FAQ from './pages/FAQ';
import ShoppingContext from './context/ShoppingContext';
import Checkout from './components/CheckoutPages/Checkout';
import Payment from './components/CheckoutPages/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import LandingPage from './pages/LandingPage'
const theme = createTheme({
	palette: {
		primary: {
			main: grey[50],
		},
	},
	typography: {
		fontFamily: 'Roboto Condensed',
	},
});

const stripePromise = loadStripe(import.meta.env.VITE_API_KEY);

function App() {
	//state management for useContext
	// const [accessories, setAccessories] = useState([]);
	// const [shoes, setShoes] = useState([]);
	const [product, setProduct] = useState([]);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [cartId, setCartId] = useState('');

	const createEmptyCart = async () => {
		try {
			const res = await fetch(import.meta.env.VITE_SERVER + '/api/cart', {
				method: 'POST',
			});

			const data = await res.json();
			setCartId(data);
			if (!res.ok) {
				console.log('error creating cart');
			}
		} catch (error) {
			console.log('internal error: error creating cart');
		}
	};

	const getItems = async () => {
		const res = await fetch(
			import.meta.env.VITE_SERVER + '/api/cart/64e4bb81b63cbb3c95ca9c34'
		);

		if (!res.ok) {
			throw new Error('issue in network response');
		}
		const data = await res.json();
		setCartItems(data);
	};

	useEffect(() => {
		createEmptyCart;
		getItems();
		console.log(cartItems);
	}, []);

	return (
		<>
		{/* <LandingPage></LandingPage> */}
			<Elements stripe={stripePromise}>
				<ThemeProvider theme={theme}>
					<ShoppingContext.Provider
						value={{
							product,
							setProduct,
							shoppingCart,
							setShoppingCart,
							cartItems,
							setCartItems,
							getItems,
							cartId,
							setCartId,
						}}>
						<header>
							<NavBar></NavBar>
						</header>
						<main>
							<Routes>
								<Route
									path='/'
									element={<Main />}
								/>
								<Route
									path='/faqs'
									element={<FAQ></FAQ>}
								/>
								<Route
									path='/men/tops'
									element={<MenTops></MenTops>}
								/>
								<Route
									path='/men/bottoms'
									element={<MenBottoms></MenBottoms>}
								/>
								<Route
									path='/men/shoes'
									element={<MenShoes></MenShoes>}
								/>
								<Route
									path='/men/bags'
									element={<MenBags></MenBags>}
								/>
								<Route
									path='/men/accessories'
									element={<MenAccessories></MenAccessories>}
								/>
								<Route
									path='/women/tops'
									element={<WomenTops></WomenTops>}
								/>
								<Route
									path='/women/bottoms'
									element={<WomenBottoms></WomenBottoms>}
								/>
								<Route
									path='/women/shoes'
									element={<WomenShoes></WomenShoes>}
								/>
								<Route
									path='/women/bags'
									element={<WomenBags></WomenBags>}
								/>
								<Route
									path='/women/accessories'
									element={<WomenAccessories></WomenAccessories>}
								/>

								<Route
									path='/shopping-cart/checkout'
									element={<Checkout></Checkout>}
								/>

								<Route
									path='/shopping-cart/checkout/payment'
									element={<Payment></Payment>}
								/>

								<Route
									path='/shopping-cart'
									element={
										<ShoppingCart
											shoppingCart={shoppingCart}
											setShoppingCart={setShoppingCart}
										/>
									}
								/>
							</Routes>
						</main>
					</ShoppingContext.Provider>
				</ThemeProvider>
			</Elements>
		</>
	);
}

export default App;
