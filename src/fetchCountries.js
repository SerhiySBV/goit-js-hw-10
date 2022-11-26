export default function fetchCountries(name = 'Ukraine') {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';

  return fetch(
    `${BASE_URL}${name}?fields=name,capital,population,languages,flags`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
