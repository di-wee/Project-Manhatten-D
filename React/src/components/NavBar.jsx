import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	Breadcrumbs,
	Menu,
	MenuItem,
	Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';

const NavBar = () => {
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);

	//element that will trigger the opening of menu
	const handleMenuOpen = (event) => {
		setMenuAnchorEl(event.currentTarget);
	};

	//element that will trigger the closing of menu
	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};
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
					<Button
						color='inherit'
						endIcon={<ShoppingCart></ShoppingCart>}>
						<Typography
							variant='h8'
							component='div'>
							<Link
								to='shopping-cart'
								style={{ textDecoration: 'none', color: 'inherit' }}>
								SHOPPING CART
							</Link>
						</Typography>
					</Button>
				</Toolbar>
			</AppBar>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: '1rem',
					marginLeft: '-6rem',
				}}>
				<Breadcrumbs>
					<Button
						aria-controls='men-menu'
						aria-haspopup='true'
						onClick={handleMenuOpen}
						sx={{ color: 'gray' }}>
						MEN
					</Button>
				</Breadcrumbs>
				<Menu
					id='men-menu'
					anchorEl={menuAnchorEl}
					open={Boolean(menuAnchorEl)}
					onClose={handleMenuClose}>
					<Paper
						sx={{
							backgroundColor: '#f5f5f5',
							boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
						}}>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='men/tops'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Tops</Typography>
							</Link>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='men/bottoms'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Bottoms</Typography>
							</Link>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='men/shoes'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Shoes</Typography>
							</Link>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='men/bags'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Bags</Typography>
							</Link>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='men/accessories'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Accesories</Typography>
							</Link>
						</MenuItem>
					</Paper>
				</Menu>
				<Typography sx={{ color: 'gray', mx: 1 }}>/</Typography>
				<Breadcrumbs>
					<Button
						aria-controls='women-menu'
						aria-haspopup='true'
						onClick={handleMenuOpen}
						sx={{ color: 'gray' }}>
						WOMEN
					</Button>
				</Breadcrumbs>
				<Menu
					id='men-menu'
					anchorEl={menuAnchorEl}
					open={Boolean(menuAnchorEl)}
					onClose={handleMenuClose}>
					<Paper
						sx={{
							backgroundColor: '#f5f5f5',
							boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
						}}>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='women/tops'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Tops</Typography>
							</Link>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='women/bottoms'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Bottoms</Typography>
							</Link>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='women/shoes'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Shoes</Typography>
							</Link>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='women/bags'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Bags</Typography>
							</Link>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Link
								to='women/accessories'
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Accesories</Typography>
							</Link>
						</MenuItem>
					</Paper>
				</Menu>
			</Box>
		</Box>
	);
};

export default NavBar;
