const resultSection = document.querySelector('.result-section');
const subTitle = document.querySelector('.sub-title');
const searchInput = document.querySelector('.search-input')
const buttons = document.querySelector('.button-container');
const graphSection = document.querySelector('.graph-section');
const tenPop = document.querySelector('.ten-pop');
const tenLang = document.querySelector('.ten-lang');
let clickState = 0;

const createContent = (content) => {
    const { name, capital, languages, population, flag } = content;
    return `<div class = "country-div">
        <img class= "flag-image" src="${flag}"/>
        <p>${name}</p>
        <p>${capital}</p>
        <p>${languages.join(', ')}</p>
        <p>${population.toLocaleString()}</p>
    </div>`
}

const filterCountries = (arr, search) => {
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

const showCountries = (arr) => {
    let contents = '';
    resultSection.innerHTML = '';
    arr.forEach((country) => {
        contents += createContent(country);
    });

    resultSection.innerHTML = contents;
}

const sortByName = (arr) => {
    const sortedName = arr.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;

    });
    if (clickState == 0) {
        showCountries(filterCountries(sortedName, searchInput.value.toLowerCase()));
        clickState = 1;
    } else {
        showCountries(filterCountries(sortedName.reverse(), searchInput.value.toLowerCase()));
        clickState = 0;
    }

}

const sortByCapital = (arr) => {

    const sortedCapital = arr.sort(function (a, b) {
        if (a.capital < b.capital) {
            return -1;
        }
        if (a.capital > b.capital) {
            return 1;
        }
        return 0;
    });

    if (clickState == 0) {
        console.log('hello');
        showCountries(filterCountries(sortedCapital, searchInput.value.toLowerCase()));
        clickState = 1;
    } else {
        showCountries(filterCountries(sortedCapital.reverse(), searchInput.value.toLowerCase()));
        clickState = 0;
    }

}

const sortByPopulation = (arr) => {

    const sortedPopulation = arr.sort(function (a, b) {
        if (a.population < b.population) return -1;
        if (a.population > b.population) return 1;
        return 0;
    });

    if (clickState == 0) {
        showCountries(filterCountries(sortedPopulation, searchInput.value.toLowerCase()));
        clickState = 1;
    } else {
        showCountries(filterCountries(sortedPopulation.reverse(), searchInput.value.toLowerCase()));
        clickState = 0;
    }
}

// #################################################################### //
const  mostSpokenLanguage = (arr) => {
    // creating empty array and filtering and storing
    let allLanguages = []; 
    arr.forEach((element) => {
        allLanguages.push(element.languages.join(', ')); // join makes array to string 

    })

    // since all languages have array of group of string and single string 
    // make the whole array to string and then turn them to single string 
    let joined = allLanguages.join(', ').split(', ');

    // create the set and pass the array to get new values
    let mySet = new Set(joined);

    // create new array to store the language name and how many times they occur
    let langData = [];
    for (let lang of mySet) {
        let repeatedLanguage = joined.filter(language => language === lang);
       langData.push([lang,  repeatedLanguage.length]);
    }
    langData.sort(function(a,b){ // sorts the langdata array
        return b[1] - a[1];
    })

    // slicing the top ten array items 
    let topten = langData.slice(0,10);
    let sum = 0;
    let width = 0;
    topten.forEach((arr)=>{ // looping throught the array and creating html elements 
        sum = sum + arr[1];
        width = Math.floor((arr[1]/sum)* 100);
        console.log(width);

        graphSection.innerHTML += `<div><p>${arr[0]}</p>
        <div class="bar-length" style ="height:20px; width:${width}%">${arr[1]}</div>
        </div>`;  

    }) 
}

subTitle.textContent = `Currently, we  have (${countriesObject.length}) countries`;

// event listeners 
buttons.addEventListener('click', (e) => {

    if (e.target.classList.contains('sort-by-name')) {
        sortByName(countriesObject);
        e.target.classList.toggle('red');
    }
    if (e.target.classList.contains('sort-by-capital')) {
        sortByCapital(countriesObject);
        e.target.classList.toggle('red');
    }
    if (e.target.classList.contains('sort-by-population')) {
        sortByPopulation(countriesObject);
        e.target.classList.toggle('red');
    }
});

searchInput.addEventListener('keyup', (e) => {
    let searchTerm = e.target.value.toLowerCase();
    showCountries(filterCountries(countriesObject, searchTerm));
    let count = document.querySelectorAll('.country-div');
    subTitle.textContent = `Currently, we  have (${count.length}) countries`;
});

tenPop.addEventListener('click', (e) =>{
    if(clickState === 0) {
        graphSection.style.display = 'block';
        clickState = 1;
    } else {
        graphSection.style.display = 'none';
        clickState = 0;
    }
})
mostSpokenLanguage(countriesObject);
