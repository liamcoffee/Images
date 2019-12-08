import './ImageList.css';
import React from 'react';
import ImageCard from './ImageCard';
import styled from 'styled-components';

const Grid = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const ImageGrid = (props) => {
    const {selected, openCarousel} = props;
	const images = props.images.map((image, i) => {
		return (
			<ImageCard handleClick={openCarousel} key={image.id} image={image} index={i} delay={100 + i * 20} selected={selected == i ? true : false} />
		);
	});

	return <Grid>{images}</Grid>;
};

export default ImageGrid;
