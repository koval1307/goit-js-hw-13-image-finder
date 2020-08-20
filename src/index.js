import './styles.css';
import cardTpl from '../templates/card.hbs';
import apiService from './apiservice.js';
import refs from './refs'

function updateImgMarkup(hits) {
    const markup = cardTpl(hits);

    refs.imagesList.insertAdjacentHTML("beforeend", markup);
}

function searchAction() {
  event.preventDefault()
  const form = event.currentTarget;
  apiService.query = form.elements.query.value.trim();
  if (apiService.query.length === 0 || apiService.query === " ") {
    hideBtn();
  }
  else {
    refs.imagesList.innerHTML = ' ';
    apiService.resetPage();
    hideBtn();
    createElement();
    showBtn()
  };
};
function loadMoreAction() {
  createElement();
  scrollTo();
};
function scrollTo() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  })
};
function hideBtn() {
  refs.loadMoreBtn.classList.add('is-hidden')
};
function showBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden')
};
function createElement() {
  
  apiService.fetchImg().then((hits) => {
    updateImgMarkup(hits);
  })
}
  
refs.loadMoreBtn.addEventListener('click', loadMoreAction);
refs.searchForm.addEventListener('submit', searchAction);