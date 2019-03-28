const countriesList = {

    elements: {
        resultSection: document.querySelector('.result-section'),
        subTitle: document.querySelector('.sub-title'),
        searchInput: document.querySelector('.search-input'),
        buttons: document.querySelector('.button-container')

    },

    createContent: (content) => {
        const { name, capital, languages, population, flag } = content;
        return `<div class = "country-div">
            <img class= "flag-image" src="${flag}"/>
            <p>${name}</p>
            <p>${capital}</p>
            <p>${languages.join(', ')}</p>
            <p>${population.toLocaleString()}</p>
        </div>`

    },

    filterCountries: (arr, search) => {
        const filteredCountries = arr.filter(country => {
            let { name, capital, languages } = country;
            let isName = name.toLowerCase().includes(search);
            let isCapital = capital.toLowerCase().includes(search);
            let isLanguages = languages.join().toLowerCase().includes(search);

            return isName || isCapital || isLanguages;
        })
        let result = search == '' ? arr : filteredCountries;
        return result;
    },

    showCountries: (arr) => {
        let contents = '';
        resultSection.innerHTML = '';
        arr.forEach((country) => {
            contents += countriesList.createContent(country);
        });

        resultSection.innerHTML = contents;
    },

    sortByName: (arr) => {
        if (searchInput.value = '') {
            showCountries(arr.sort().reverse());
        } else {
            showCountries(filterCountries(arr.sort().reverse(), searchInput.value.toLowerCase()));
        }

    },
    sortByCapital: (arr) => {

    }

};

let { resultSection, subTitle, searchInput, buttons } = countriesList.elements;
const { createContent, filterCountries, showCountries, sortByName } = countriesList;


subTitle.textContent = `Currently, we  have (${countriesObject.length}) countries`
buttons.addEventListener('click', (e) => {
    console.log(e.target.classList.contains('sort-by-name'));
    if (e.target.classList.contains('sort-by-name')) {
        sortByName(countriesObject);
    }
});


searchInput.addEventListener('keyup', (e) => {
    let searchTerm = e.target.value.toLowerCase();
    showCountries(filterCountries(countriesObject, searchTerm));
    let count = document.querySelectorAll('.country-div');
    subTitle.textContent = `Currently, we  have (${count.length}) countries`;
});

//showCountries(filterCountries(countriesObject, searchInput.value));


