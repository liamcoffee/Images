import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {opacity:0 }
  100% {  opacity:1 }
`;

const ImgCard = styled.div`
	width: ${(props) => (props.full ? '100%' : '20%')};
	height: ${(props) => (props.carousel ? '100%' : '33%')};
	overflow: hidden;
	display: Flex;
	opacity: 0;
	animation-name: ${fadeIn};
	animation-direction: normal;
	animation-fill-mode: forwards;
	animation-duration: 0.3s;
	animation-delay: ${(props) => props.delay}ms;
	border: ${(props) => (props.selected ? '2px solid blue' : '')};
	text-align: center;
`;

const Image = styled.img`
	max-width: 100%;
	height: auto;
	object-fit: ${(props) => (props.full ? 'contain' : 'cover')};
	src: url(${(props) => props.src});
`;

const ImageCard = (props) => {
	const { description, urls } = props.image;
	const { handleClick = {} } = props;
	return (
		<ImgCard
			delay={props.delay}
			full={props.full}
			grid={props.gid}
			carousel={props.carousel}
			onClick={() => handleClick(props.index)}
			selected={props.selected}
		>
			<Image src={urls.regular} alt={description} full={props.full} />
		</ImgCard>
	);
};

export default ImageCard;
