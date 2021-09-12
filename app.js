// random facts: https://uselessfacts.jsph.pl/random.json?language=en

const countriesURL = 'https://restcountries.eu/rest/v2/all';

const mainContainer = document.querySelector('.main-container');
const form = document.querySelector('.form');
const input = document.getElementById('input');

let countriesArr = [];






// GET DATA FROM API
async function getCountriesData() {
    const response = await fetch(countriesURL);
    const data = await response.json();
    showCountries(data);
}

//SHOW COUNTRIES 
function showCountries(countries) {
    countries.forEach((country) => {
        countriesArr.push(country)
        let box = document.createElement('div');
        box.classList.add('box');
        if (country.area != null) {
            box.innerHTML = `
        <div class="flag-container">
            <img src="${ country.flag }" alt="flag" title="Flag">
        </div>
        <div class="country-info">
            <h2 class="country-name" title="Country">${ country.name }</h2>
            <h3 class="country-capital" title="Capital">${ country.capital }</h3>
        </div>
        <div class="country-stats">
            <span class="population" title="Population"><i class="fas fa-street-view"></i> ${ formatNumbers(country.population) } </span>
            <span class="area" title="Area"><i class="fas fa-mountain"></i> ${ formatNumbers(country.area) } k㎡</span>
        </div>
        `;
        } else {
            box.innerHTML = `
        <div class="flag-container">
            <img src="${ country.flag }" alt="flag" title="Flag">
        </div>
        <div class="country-info">
            <h2 class="country-name" title="Country">${ country.name }</h2>
            <h3 class="country-capital" title="Capital">${ country.capital }</h3>
        </div>
        <div class="country-stats">
            <span class="population" title="Population"><i class="fas fa-street-view"></i> ${ formatNumbers(country.population) } </span>
            <span class="area" title="Area"><i class="fas fa-mountain"></i> ${ 0 } k㎡</span>
        </div>
        `;
        }

        mainContainer.appendChild(box);
    })
}


// FORMAT NUMBERS TO ADD COMMA EVERY 3 DIGITS
function formatNumbers(number) {
    if (number < 1000) {
        return number
    } else {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

//EVENT LISTENERS
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputValue = input.value.trim();
    let inputValue2 = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
    console.log(inputValue2);
    input.value = '';
})


getCountriesData()
    .then(res => {
        countriesArr.push(res);
    })

