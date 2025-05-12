import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

export default function SearchBar({ onSubmit }) {
  async function handleSubmit(evt) {
    evt.preventDefault();
    const quary = evt.target.elements.search.value;
    if (quary.trim() === '') {
      toast.error('Please enter search term!');
      return;
    }
    onSubmit(quary);
    evt.target.reset();
  }
  return (
    <header>
      <form onSubmit={handleSubmit} className={css.wrapper}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
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
    </header>
  );
}
