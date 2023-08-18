import React from 'react';
import '@fontsource/roboto-condensed';
import Main from './pages/Main';
import { Route, Routes } from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material';
import NavBar from './components/NavBar';
import ShoppingCart from './components/CheckoutPages/ShoppingCart';
import Clothing from './components/ShoppingPages/Clothing';
import Bags from './components/ShoppingPages/Bags';
import Shoes from './components/ShoppingPages/Shoes';
import { grey } from '@mui/material/colors';

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

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
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
							path='/clothing'
							element={<Clothing />}
						/>
						<Route
							path='/bags'
							element={<Bags />}
						/>
						<Route
							path='/shoes'
							element={<Shoes />}
						/>
						<Route
							path='/shopping-cart'
							element={<ShoppingCart />}
						/>
					</Routes>
				</main>
			</ThemeProvider>
		</>
	);
}

export default App;
