const countriesList = {

    elements: {
        resultSection: document.querySelector('.result-section'),
        subTitle: document.querySelector('.sub-title'),
        searchInput: document.querySelector('.search-input'),
        buttons: document.querySelector('.button-container')

    },

    createContent: function (content){
        const {name, capital, languages, population, flag} = content;
        return `<div class = "country-div">
            <img class= "flag-image" src="${flag}"/>
            <p>${name}</p>
            <p>${capital}</p>
            <p>${languages.join(', ')}</p>
            <p>${population.toLocaleString()}</p>
        </div>`

    },

    filterCountries: function (arr,search){
        const filteredCountries = arr.filter(country => {
            let {name, capital, languages} = country;
            let isName = name.toLowerCase().includes(search);
            let isCapital = capital.toLowerCase().includes(search);
            let isLanguages = languages.join().toLowerCase().includes(search);

            return isName || isCapital || isLanguages;
        })
        let result = search == '' ? arr : filteredCountries;
        return result;
    },

    showCountries: function (arr){
        let contents = '';
        resultSection.innerHTML = '';
        arr.forEach((country, i) => {
            contents += countriesList.createContent(country);
        });

        resultSection.innerHTML = contents;
    }

};

let {resultSection, subTitle, searchInput, buttons} = countriesList.elements;
const { createContent, filterCountries, showCountries} = countriesList;

buttons.addEventListener('click', e => {
    console.log(e.target.className);
});


searchInput.addEventListener('input', e =>{
    let searchTerm = e.target.value.toLowerCase();
    showCountries(filterCountries(countriesObject, searchTerm));
});

subTitle.textContent = `Currently, we  have ${countriesObject.length} countries`;
showCountries(filterCountries(countriesObject, searchInput.value));
