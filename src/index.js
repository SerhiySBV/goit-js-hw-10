import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const serchInput = document.querySelector('#search-box');
serchInput.addEventListener('input', debounce(onSerch, DEBOUNCE_DELAY));

function onSerch(evt) {
  const serchValue = evt.target.value.trim();
  if (!serchValue) {
    return;
  }
  fetchCountries(serchValue).then(countrys => {
    if (countrys.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
    return;
  });
}
function marckUp() {}
