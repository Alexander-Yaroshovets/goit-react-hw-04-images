import { useState, useEffect } from 'react';

import { Button } from './Button';

import { SearchBar } from './Searchbar';

import { ImageGallery } from './ImageGallery';

import { Loader } from './Loader';

import { Modal } from './Modal';

import { getImages } from 'services/api';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [bigImage, setBigImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleEffect = async () => {
      try {
        if (!query) {
          return;
        }
        setIsLoading(true);

        const getAllImages = await getImages(query, page);

        const imagesArray = getAllImages.hits;

        setItems(prevItems => [...prevItems, ...imagesArray]);

        setIsLoading(false);

        if (imagesArray.length === 0) {
          alert('Wrong query');
          return;
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    handleEffect();
  }, [page, query]);

  const handleSubmit = async event => {
    const { value } = event.target.elements.query;
    event.preventDefault();
    if (value === '') {
      alert('type something');
      setItems([]);
      return;
    }
    setQuery(value);
    setPage(1);
    setItems([]);
    setShowModal(false);
    event.target.reset();
  };

  const loadMore = () => {
    try {
      setIsLoading(true);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = image => {
    setShowModal(showModal => !showModal);
    setBigImage(image);
  };

  return (
    <>
      {error && <p> loading error!!!</p>}

      <SearchBar submit={handleSubmit}></SearchBar>

      <ImageGallery onImageClick={toggleModal} images={items}></ImageGallery>

      {items.length > 0 && items.length % 2 === 0 && (
        <Button click={loadMore}></Button>
      )}

      {isLoading && <Loader></Loader>}

      {showModal && <Modal bigImage={bigImage} onClose={toggleModal}></Modal>}
    </>
  );
};
