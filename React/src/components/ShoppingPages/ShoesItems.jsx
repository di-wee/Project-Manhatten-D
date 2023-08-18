import React from 'react';
import ShoesDetailsModal from './ShoesDetailsModal';

// 1. display items here
// 2. prop details into xDetailsModal

const ShoesItems = (props) => {
	return (
		<>
			<div>
				<img
					src={props.image}
					className='row'></img>
				<div className='row'>{props.name}</div>
				<div className='row'>{props.description}</div>
				<div className='row'>{props.price}</div>
				<div className='row'>{props.category}</div>
				<div className='row'>{props.subcategory}</div>
			</div>
			<ShoesDetailsModal></ShoesDetailsModal>
		</>
	);
};

export default ShoesItems;
