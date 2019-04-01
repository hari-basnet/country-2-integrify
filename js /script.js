const resultSection = document.querySelector('.result-section');
const subTitle = document.querySelector('.sub-title');
const searchInput = document.querySelector('.search-input')
const buttons = document.querySelector('.button-container');
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
function mostSpokenLanguage(arr) {

    let allLanguages = [];
    arr.forEach((element) => {
        allLanguages.push(element.languages.join(', '));

    })
    // console.log(allLanguages);
    let joined = allLanguages.join(', ').split(', ');
    //    console.log(joined);

    let mySet = new Set(joined);
    console.log(mySet);

    let myMap = new Map();
    for (let lang of mySet) {
        let count = joined.filter(element => element === lang);
        //console.log(lang, count.length);
        myMap.set(lang, count.length);
        //    console.log(count);
    }

    console.log(myMap);
    // myMap.forEach(element => {
    //     console.log(element.keys(), element.value)
    // })
    
}



// ################################################################### //
mostSpokenLanguage(countriesObject);

for(let i = 0; i <= 10; i++){
    const graphSection = document.querySelector('.graph-section');

    graphSection.innerHTML = `<p>Finland ${i}</p>
    <div class="bar-length"></div>
     `;  
}
//console.log(sortByCapital(countriesObject));
subTitle.textContent = `Currently, we  have (${countriesObject.length}) countries`
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


// make a function to show the chart 

// create a set 
// put the sorted data in set first 10
// check the population 
// divide total population and make percentage
// use that percentage to the width of the div created
