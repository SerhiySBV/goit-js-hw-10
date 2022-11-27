import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const serchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

serchInput.addEventListener('input', debounce(onSerch, DEBOUNCE_DELAY));

function onSerch(evt) {
  const serchValue = evt.target.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (!serchValue) {
    return;
  }

  fetchCountries(serchValue)
    .then(country => {
           if (country.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      marckUpList(country);
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function marckUpList(array) {
  if (array.length === 1) {
    return (countryInfo.innerHTML = array
      .map(country => {
        return `<img src="${country.flags.svg}" alt="${
          country.name.official
        }" class="svg" width = "80px" height ="50px">
  <h1 style="
        display: inline;
        font-size: 65px;">${country.name.official}</h1>
<p class="info">Capital: ${country.capital}</p>
<p class="info">Population: ${country.population}</p>
<p class="info">languages: ${Object.values(country.languages).join(', ')}</p>`;
      })
      .join(''));
  }

  countryList.innerHTML = array
    .map(country => {
      return `<li class="item" style="display: flex; gap: 30px;     align-items: center;">
  <img class="img" src="${country.flags.svg}" alt="${country.name.official}" class="svg" width = "60px" height ="30px">
  <h2>${country.name.official}</h2>
</li>`;
    })
    .join('');
}
