import './App.css';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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
  const galleryRef = useRef(null);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  async function loadImg(quary, page = 1) {
    try {
      if (page === 1) {
        setGallery(null);
      }
      setIsLoading(true);

      const newGallery = await searchImage(quary, page);
      if (newGallery.images.length === 0) {
        toast.error('No image for your request');
        return;
      }
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
        {gallery ? (
          <ImageGallery
            ref={galleryRef}
            images={gallery.images}
            showImg={showImg}
          />
        ) : (
          <ErrorMessage />
        )}
        {isLoading && <Loader />}
        {gallery?.pagesLoaded < gallery?.pagesAvailable && (
          <LoadMoreBtn gallery={gallery} onClick={loadImg} />
        )}
        {imgForModal && (
          <ImageModal
            modalIsOpen={modalIsOpen}
            image={imgForModal}
            onClose={toggleModal}
          />
        )}
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: '2px solid #20b2aa',
            background: 'transparent',
            color: '#fafafa',
          },
          iconTheme: {
            primary: '#ff0000',
            secondary: '#fafafa',
          },
        }}
      />
    </>
  );
}

export default App;
