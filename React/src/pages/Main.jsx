import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import WomenTops from './WomenTops';

function App() {
	return (
		<div style={{ position: 'relative', minHeight: '100vh' }}>
			<Container
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '100vh',
					padding: 0,
				}}>
				<img
					src='/mainpic.png'
					alt='Your Brand Name'
					style={{
						width: '100vw',
						height: '100vh',
						objectFit: 'cover',
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: -1,
					}}
				/>
			</Container>

			<Link
				to='/women/tops'
				style={{ position: 'absolute', bottom: 20, left: 20 }}>
				<Button
					variant='contained'
					color='primary'
					style={{
						textDecoration: 'none',
						'&:hover': { textDecoration: 'underline' },
					}}>
					Browse
				</Button>
			</Link>

			<Routes>
				<Route
					path='/'
					element={<></>}
				/>
				<Route
					path='/women/tops'
					element={<WomenTops />}
				/>
			</Routes>
		</div>
	);
}

export default App;
