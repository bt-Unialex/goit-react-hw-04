import css from './ImageCard.module.css';
export default function ImageCard({ image, showImg = () => {}, bigImg }) {
  const {
    urls: { thumb: tinyImg },
    alt_description: alt,
  } = image;
  return (
    <div className={css.wrapper}>
      <img
        onClick={() => showImg(image)}
        className={css.image}
        src={bigImg || tinyImg}
        alt={alt}
      />
    </div>
  );
}
