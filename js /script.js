const resultSection = document.querySelector('.result-section');
const subTitle = document.querySelector('.sub-title');
const searchInput = document.querySelector('.search-input')
const buttons = document.querySelector('.button-container');

const createContent=  (content) => {
    const { name, capital, languages, population, flag } = content;
    return `<div class = "country-div">
        <img class= "flag-image" src="${flag}"/>
        <p>${name}</p>
        <p>${capital}</p>
        <p>${languages.join(', ')}</p>
        <p>${population.toLocaleString()}</p>
    </div>`

}

const filterCountries =  (arr, search) => {
    const filteredCountries = arr.filter(country => {
        let { name, capital, languages } = country;
        let isName = name.toLowerCase().includes(search);
        let isCapital = capital.toLowerCase().includes(search);
        let isLanguages = languages.join().toLowerCase().includes(search);

        return isName || isCapital || isLanguages;
    })
    let result = search == '' ? arr : filteredCountries;
    return result;
}

const showCountries =  (arr) => {
    let contents = '';
    resultSection.innerHTML = '';
    arr.forEach((country) => {
        contents += createContent(country);
    });

    resultSection.innerHTML = contents;
}

const sortByName =  (arr) => {
    if (searchInput.value) {
        showCountries(filterCountries(arr.sort().reverse(), searchInput.value.toLowerCase()));
    } else {
        showCountries(arr.sort().reverse());
    }

}

const sortByCapital = (arr) => {
    const sortedCapital = arr.sort(function(a, b) {
        if (a.capital < b.capital) {
          return 1;
        }
        if (a.capital > b.capital) {
          return -1;
        }
        return 0;
      });

      if (searchInput.value) {
          console.log('hello');
        showCountries(filterCountries(sortedCapital, searchInput.value.toLowerCase()));
    } else {
        showCountries(sortedCapital.reverse());
    }
      
}

//console.log(sortByCapital(countriesObject));





subTitle.textContent = `Currently, we  have (${countriesObject.length}) countries`
buttons.addEventListener('click', (e) => {
    console.log(e.target.classList.contains('sort-by-name'));
    console.log(e.target.classList.contains('sort-by-capital'));

    if (e.target.classList.contains('sort-by-name')) {
        sortByName(countriesObject);
    }else if (e.target.classList.contains('sort-by-capital')){
        sortByCapital(countriesObject);
    }else{

    }
});


searchInput.addEventListener('keyup', (e) => {
    let searchTerm = e.target.value.toLowerCase();
    showCountries(filterCountries(countriesObject, searchTerm));
    let count = document.querySelectorAll('.country-div');
    subTitle.textContent = `Currently, we  have (${count.length}) countries`;
});