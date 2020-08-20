import './styles.css';
import cardTpl from '../templates/card.hbs';
import apiService from './apiservice.js';
import refs from './refs'



refs.searchForm.addEventListener('submit', event => {
event.preventDefault()

const form = event.currentTarget;
apiService.query = form.elements.query.value;

refs.imagesList.innerHTML = ' ';
    
    apiService.resetPage();

  refs.loadMoreBtn.classList.add('is-hidden')

    apiService.fetchImg().then((hits) => {
      updateImgMarkup(hits);
refs.loadMoreBtn.classList.remove('is-hidden')
      form.reset();
    });
})
function updateImgMarkup(hits) {
    const markup = cardTpl(hits);

    refs.imagesList.insertAdjacentHTML("beforeend", markup);
}
refs.loadMoreBtn.addEventListener('click', () => {
    apiService.fetchImg()
        .then((hits) => {
      updateImgMarkup(hits);
        });
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  })
})