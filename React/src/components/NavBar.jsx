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
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Typography
						variant='h6'
						component='div'>
						<Link
							to='/'
							style={{ textDecoration: 'none', color: 'inherit' }}>
							MANHATTAN D
						</Link>
					</Typography>
					<Button color='inherit'>
						<Link
							to='clothing'
							style={{ textDecoration: 'none', color: 'inherit' }}>
							CLOTHING
						</Link>
					</Button>
					<Button color='inherit'>
						<Link
							to='bags'
							style={{ textDecoration: 'none', color: 'inherit' }}>
							BAGS
						</Link>
					</Button>
					<Button color='inherit'>
						<Link
							to='shoes'
							style={{ textDecoration: 'none', color: 'inherit' }}>
							SHOES
						</Link>
					</Button>
					<Typography
						variant='h6'
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
