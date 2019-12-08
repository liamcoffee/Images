import './ImageList.css';
import React from 'react';
import ImageCard from './ImageCard';
import styled from 'styled-components';

const Hero = styled.div`
	height: 80%;
	text-align: center;
`;

const Carousel = styled.div`
	height: 20%;
	display: flex;
	flex-wrap: wrap;
`;

const ImageCarousel = (props) => {
	const { selected, images, setSelected } = props;

	const imagesList = images.map((image, i) => {
		return (
			<ImageCard
				handleClick={() => setSelected(i)}
				key={image.id}
				image={image}
				slide={true}
				delay={100 + i * 20}
				carousel={true}
				selected={selected == i ? true : false}
			/>
		);
	});

	return (
		<React.Fragment>
			<Hero>
				<ImageCard
					key={images[selected].id}
					image={images[selected]}
					full={true}
					carousel={true}
					handleClick={() => false}
				/>
			</Hero>
			<Carousel>{imagesList}</Carousel>
		</React.Fragment>
	);
};

export default ImageCarousel;
