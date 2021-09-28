

let mainContainer = document.querySelector('.main-container');
const form = document.querySelector('.form');
const mostPopBtn = document.querySelector('.most-populated');
const sortAZBtn = document.querySelector('.sort-az');
const sortZABtn = document.querySelector('.sort-za');
const largestAreaBtn = document.querySelector('.largest-area');
const searchInput = document.getElementById('search-input');
const countryNames = document.querySelectorAll('.country-name');



let countriesArr = [];

//FUNCTIONS

// GET DATA FROM API
async function getCountriesData() {
    try {
        let apiKey = 'a84c1f7c00f9712365e88084d26b5648';
        let url = 'http://api.countrylayer.com/v2/all?access_key=';
        const response = await fetch(url += apiKey);
        const data = await response.json();

        //replace "Å" with "A"
        let string = data[1].name
        let newString = string.replace(/Å/g, "A");
        data[1].name = newString;

        console.log(data);
        showCountries(data);
    } catch (err) {
        console.log('There has been an error!', err);
    }

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

//get filtered countries
async function getFilteredCountries(countryName) {
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${ countryName }?fullText=true
    `);
    const data = await response.json();

    return {
        name: data
    }
}

//EVENT LISTENERS

//most populated countries button 
mostPopBtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    let mostPopCountries = sortCountries(countriesArr, 'population');

    const ids = mostPopCountries.map(o => o.name)
    const filtered = mostPopCountries.filter(({ name }, index) => !ids.includes(name, index + 1))

    showCountries(filtered)
})

//sort countries from a to z
sortAZBtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    let sortedCountriesAZ = sortCountries(countriesArr, 'name');

    const ids = sortedCountriesAZ.map(o => o.name)
    const filtered = sortedCountriesAZ.filter(({ name }, index) => !ids.includes(name, index + 1)).reverse()

    showCountries(filtered)
})

//sort countries from z to a
sortZABtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    let sortedCountriesAZ = sortCountries(countriesArr, 'name');

    const ids = sortedCountriesAZ.map(o => o.name)
    const filtered = sortedCountriesAZ.filter(({ name }, index) => !ids.includes(name, index + 1))

    showCountries(filtered)
})

//largest area countries button 
largestAreaBtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    let sortedCountriesAZ = sortCountries(countriesArr, 'area');

    const ids = sortedCountriesAZ.map(o => o.name)
    const filtered = sortedCountriesAZ.filter(({ name }, index) => !ids.includes(name, index + 1))

    showCountries(filtered)
})

//search country 
searchInput.addEventListener('keyup', (e) => {
    const userText = e.target.value.toLowerCase();
    const countryNames = document.querySelectorAll('.country-name');
    countryNames.forEach((countryName) => {
        if (countryName.innerText.toLowerCase().indexOf(userText) != -1) {
            countryName.parentElement.parentElement.style.display = 'flex';
        } else {
            countryName.parentElement.parentElement.style.display = 'none';
        }
    })
});

getCountriesData()




