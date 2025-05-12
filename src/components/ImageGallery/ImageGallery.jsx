import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images, showImg }) {
  return (
    <ul className={css.wrapper}>
      {images.map((image, index) => (
        <li key={image.id + '-' + index} className={css.item}>
          <ImageCard image={image} showImg={showImg} />
        </li>
      ))}
    </ul>
  );
}
