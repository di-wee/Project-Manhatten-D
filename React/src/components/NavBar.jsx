import React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography component='div'>
						<Link
							to='faq'
							style={{ textDecoration: 'none', color: 'inherit' }}>
							FAQ
						</Link>
					</Typography>

					<Typography
						variant='h6'
						component='div'>
						<Link
							to='/'
							style={{ textDecoration: 'none', color: 'inherit' }}>
							MANHATTAN D
						</Link>
					</Typography>

					<Typography
						variant='h8'
						component='div'>
						<Link
							to='shopping-cart'
							style={{ textDecoration: 'none', color: 'inherit' }}>
							SHOPPING CART
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;
