const countryName = new URLSearchParams(location.search).get("name");
const flagImage = document.querySelector(".country-details img");
const countryHeading = document.querySelector(".deatils-text-container h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries=document.querySelector('.border-countries')
const themeChanger=document.querySelector('.theme-changer')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.svg;
    countryHeading.innerHTML = country.name.common;
    population.innerHTML = country.population;
    domain.innerHTML = country.tld.join(", ");
    region.innerHTML = country.region;

    if (country.name.nativeName) {
      nativeName.innerHTML = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerHTML = country.name.common;
    }
    if (country.subregion) {
      subRegion.innerHTML = country.subregion;
    }

    if (country.capital) {
      capital.innerHTML = country.capital;
    }

    if (country.currencies) {
      currencies.innerHTML = Object.values(country.currencies)
        .map((currencies) => currencies.name)
        .join(", ");
    }
    if (country.languages) {
      languages.innerHTML = Object.values(country.languages).join(", ");
    }

    if(country.borders){
        country.borders.forEach((border)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=>res.json())
            .then(([borderCountry])=>{
                const borderCountryTag=document.createElement('a')
                borderCountryTag.innerHTML=borderCountry.name.common
                borderCountryTag.href=`country.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag)
            })
        })
    }
  });


  themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        themeChanger.innerHTML = '🔆 Light Mode';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        themeChanger.innerHTML = '🌙 Dark Mode';
        localStorage.removeItem('darkMode');
    }
});

window.addEventListener('load', () => {
    const darkModeState = localStorage.getItem('darkMode');
    if (darkModeState === 'enabled') {
        document.body.classList.add('dark');
        themeChanger.innerHTML = '🔆 Light Mode';
    }
});