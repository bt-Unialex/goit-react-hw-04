import axios from 'axios';

export function searchImage(request, page = 1, per_page = 20) {
  const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

  const BASE_URL = 'https://pixabay.com/api/';
  const param = new URLSearchParams({
    key: API_KEY,
    q: encodeURIComponent(request),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page,
  });

  const URL = `${BASE_URL}?${param}`;

  const response = axios.get(URL).then((response) => {
    return {
      quary: request,
      images: response.data.hits,
      pagesLoaded: page,
      pagesAvailable: Math.ceil(response.data.totalHits / 20),
    };
  });
  return response;
}
