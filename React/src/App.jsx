import React from 'react';
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
