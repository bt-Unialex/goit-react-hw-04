import './App.css';
import { useState } from 'react';
import { searchImage } from './searchImage';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [gallery, setGallery] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgForModal, setImgForModal] = useState({});

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  async function loadImg(quary, page = 1) {
    try {
      if (page === 1) {
        setGallery({});
      }
      setIsLoading(true);
      const newGallery = await searchImage(quary, page);
      setGallery((prevGallery) => ({
        ...newGallery,
        images: [...(prevGallery.images || []), ...newGallery.images],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function showImg(img) {
    setImgForModal(img);
    setModalIsOpen(true);
    // console.log(img);
  }

  return (
    <>
      <SearchBar onSubmit={loadImg} />
      <main>
        {gallery.images?.length ? (
          <ImageGallery images={gallery.images} showImg={showImg} />
        ) : (
          <ErrorMessage />
        )}
        {isLoading && <Loader />}
        {gallery.pagesLoaded < gallery.pagesAvailable && (
          <LoadMoreBtn gallery={gallery} onClick={loadImg} />
        )}
        {imgForModal.largeImageURL && (
          <ImageModal
            modalIsOpen={modalIsOpen}
            image={imgForModal}
            onClose={toggleModal}
          />
        )}
      </main>
    </>
  );
}

export default App;
