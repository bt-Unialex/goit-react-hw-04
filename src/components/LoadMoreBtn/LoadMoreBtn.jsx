import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ gallery, onClick }) {
  return (
    <button
      className={css.button}
      type="button"
      onClick={() => {
        onClick(gallery.quary, gallery.pagesLoaded + 1);
      }}>
      Load more
    </button>
  );
}
