// random facts: https://uselessfacts.jsph.pl/random.json?language=en

const countriesURL = 'https://restcountries.eu/rest/v2/all';

let mainContainer = document.querySelector('.main-container');
const form = document.querySelector('.form');
const mostPopBtn = document.querySelector('.most-populated');
const sortAZBtn = document.querySelector('.sort-az');
const sortZABtn = document.querySelector('.sort-za');
const largestAreaBtn = document.querySelector('.largest-area');
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
        countriesArr.push(country);
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

//SORT THE ARRAY TEMPLATE FUNCTION
function sortCountries(arr, type) {
    const countries = [...arr]
    const sortedCountries = countries.sort((a, b) => {
        if (a[type] > b[type]) return -1
        if (a[type] < b[type]) return 1
        return 0
    })
    return sortedCountries
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

mostPopBtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    let mostPopCountries = sortCountries(countriesArr, 'population');

    const ids = mostPopCountries.map(o => o.name)
    const filtered = mostPopCountries.filter(({ name }, index) => !ids.includes(name, index + 1))

    showCountries(filtered)
})

sortAZBtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    let sortedCountriesAZ = sortCountries(countriesArr, 'name');

    const ids = sortedCountriesAZ.map(o => o.name)
    const filtered = sortedCountriesAZ.filter(({ name }, index) => !ids.includes(name, index + 1)).reverse()

    showCountries(filtered)
})

sortZABtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    let sortedCountriesAZ = sortCountries(countriesArr, 'name');

    const ids = sortedCountriesAZ.map(o => o.name)
    const filtered = sortedCountriesAZ.filter(({ name }, index) => !ids.includes(name, index + 1))

    showCountries(filtered)
})

largestAreaBtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    let sortedCountriesAZ = sortCountries(countriesArr, 'area');

    const ids = sortedCountriesAZ.map(o => o.name)
    const filtered = sortedCountriesAZ.filter(({ name }, index) => !ids.includes(name, index + 1))

    showCountries(filtered)
})


getCountriesData()


// REPLACE THE Å IN ALAND ISLAND TO ENGLISH ALPHABET A

// FINISH THE TEXT INPUT SEARCH


