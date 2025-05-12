import './App.css';
import { useRef, useState } from 'react';
import { searchImage } from './searchImage';

import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [gallery, setGallery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgForModal, setImgForModal] = useState(null);
  const [requestError, setRequestError] = useState('');
  const galleryRef = useRef(null);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  async function loadImg(quary, page = 1) {
    try {
      if (page === 1) {
        setGallery(null);
      }
      setRequestError('');
      setIsLoading(true);

      const newGallery = await searchImage(quary, page);
      if (newGallery.images.length === 0) throw new Error('No image for your request');

      setGallery((prevGallery) => ({
        ...newGallery,
        images: [...(prevGallery?.images || []), ...newGallery.images],
      }));

      setTimeout(() => {
        window.scrollTo({
          top: galleryRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 300);
    } catch (error) {
      console.error(error);
      setRequestError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function showImg(img) {
    setImgForModal(img);
    setModalIsOpen(true);
  }

  return (
    <>
      <SearchBar onSubmit={loadImg} />
      <main>
        {!requestError && gallery ? (
          <ImageGallery ref={galleryRef} images={gallery.images} showImg={showImg} />
        ) : (
          <ErrorMessage message={requestError} />
        )}
        {isLoading && <Loader />}
        {!requestError && gallery?.pagesLoaded < gallery?.pagesAvailable && (
          <LoadMoreBtn gallery={gallery} onClick={loadImg} />
        )}
        {imgForModal && (
          <ImageModal modalIsOpen={modalIsOpen} image={imgForModal} onClose={toggleModal} />
        )}
      </main>
    </>
  );
}

export default App;
