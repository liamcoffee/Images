import React, { useState, useEffect, useCallback } from 'react';
import unsplash from '../api/unsplash';
import ImageGrid from './ImageGrid';
import styled from 'styled-components';
import ImageCarousel from './ImageCarousel';

const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 15%;
`;

const ImageBody = styled.div`
	height: 70%;
	background-color: gray;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const App = () => {
	const [ images, setImages ] = useState([]);
	const [ view, setView ] = useState('grid');
	const [ selected, setSelected ] = useState(0);

	const handleUserKeyPress = useCallback((event) => {
		const { keyCode } = event;
		const max = images.length - 1;

		if (keyCode === 37) {
			setSelected((prevSelected) => {
				return prevSelected > 0 ? prevSelected - 1 : 0;
			});
		} else if (keyCode == 39) {
			setSelected((prevSelected) => {
				return prevSelected < max ? prevSelected + 1 : max;
			});
		}
	});

	useEffect(
		() => {
			window.addEventListener('keydown', handleUserKeyPress);

			return () => {
				window.removeEventListener('keydown', handleUserKeyPress);
			};
		},
		[ handleUserKeyPress ]
	);

	const getGalleryOne = async () => {
		const response = await unsplash.get('/search/photos', {
			params: { query: 'cars', per_page: 15 }
		});
		setView('grid');
		setImages(response.data.results);
	};

	const getGallerytwo = async () => {
		const response = await unsplash.get('/search/photos', {
			params: { query: 'Fast+cars', per_page: 9 }
		});
		setView('grid');
		setImages(response.data.results);
	};

	const openCarousel = (i) => {
		setSelected(i);
		setView('carousel');
	};

	const viewHelper = () => {
		if (view == 'grid') {
			return <ImageGrid images={images} selected={selected} openCarousel={openCarousel} />;
		} else {
			return <ImageCarousel images={images} selected={selected} setSelected={setSelected} />;
		}
	};

	console.log('slected is');
	console.log(selected);
	return (
		<div className="ui container" style={{ marginTop: '10px', height: '600px' }}>
			<Header />
			<button onClick={() => getGalleryOne()}>get set one</button>
			<button onClick={() => getGallerytwo()}>get set two</button>
			<button onClick={() => setView('grid')}>Close</button>
			<ImageBody>{viewHelper()}</ImageBody>
		</div>
	);
};

export default App;
