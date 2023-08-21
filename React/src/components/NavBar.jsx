import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	Breadcrumbs,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';

const NavBar = () => {
	//managing states
	const [menCategory, setMenCategory] = useState(false);
	const [womenCategory, setWomenCategory] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	const handleMenClick = () => {
		setMenCategory(true);

		if (womenCategory) {
			setWomenCategory(false);
		}

		if (!showMenu) {
			setShowMenu(true);
		}
	};

	const handleWomenClick = () => {
		setWomenCategory(true);
		setShowMenu(true);

		if (menCategory) {
			setMenCategory(false);
		}
		if (!showMenu) {
			setShowMenu(true);
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography component='div'>
						<Link
							to='faqs'
							style={{ textDecoration: 'none', color: 'inherit' }}>
							FAQ
						</Link>
					</Typography>
					<Typography
						variant='h6'
						component='div'
						sx={{ marginLeft: '7rem' }}>
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
					flexDirection: 'column',
					alignItems: 'center',
					margin: '2rem 0',
				}}>
				{/* HEADER NAVBAR FOR MEN AND WOMEN	 */}
				<Breadcrumbs separator=' '>
					<Button
						aria-controls='men-menu'
						aria-haspopup='true'
						onClick={handleMenClick}
						sx={{ color: 'gray' }}>
						MEN
					</Button>
					<Button
						aria-controls='women-menu'
						aria-haspopup='true'
						onClick={handleWomenClick}
						sx={{ color: 'gray' }}>
						WOMEN
					</Button>
				</Breadcrumbs>

				{showMenu && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							margin: '1rem 0',
							width: '100%',
						}}>
						<Breadcrumbs
							separator=' '
							aria-label='breadcrumb'
							component='men-top'>
							<Link
								to={menCategory ? 'men/tops' : 'women/tops'}
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Tops</Typography>
							</Link>

							<Link
								to={menCategory ? 'men/bottoms' : 'women/bottoms'}
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Bottoms</Typography>
							</Link>

							<Link
								to={menCategory ? 'men/shoes' : 'women/sh'}
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Shoes</Typography>
							</Link>

							<Link
								to={menCategory ? 'men/bags' : 'women/bags'}
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Bags</Typography>
							</Link>

							<Link
								to={menCategory ? 'men/accessories' : 'women/accessories'}
								style={{ textDecoration: 'none' }}>
								<Typography sx={{ color: 'gray' }}>Accesories</Typography>
							</Link>
						</Breadcrumbs>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default NavBar;
