"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// function getCountry(country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
//   );
//   request.send();
//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);

//     //   console.log(data);
//     const html = `
//         <article class="country">
//           <img class="country__img" src=${data.flag} />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}M people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = '1';
//   });
// }
// getCountry('india');
// getCountry('sweden');
// getCountry('canada');
// getCountry('japan');
// getCountry('iceland');

//=====call back hell!====

function renderCountry(data, className = "") {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src=${data.flag} />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = "1";
}
function renderError(msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
}
// function getCountryAndNeighbor(country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
//   );
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     //render country
//     renderCountry(data);
//     //get neighbor
//     const [neighbor] = data.borders;
//     if (!neighbor) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       console.log(this.responseText);
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// }
// // getCountryAndNeighbor('india');
// // getCountryAndNeighbor('sweden');
// getCountryAndNeighbor('canada');
// // getCountryAndNeighbor('japan');
// // getCountryAndNeighbor('iceland');

//--------FETCH API & PROMISES-----
//--old way
// const request = new XMLHttpRequest();
// request.open(
//   "GET",
//   `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
// );
// request.send();

//--fetch

// function getCountry(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
//     .then((response) => response.json())
//     .then((data) => renderCountry(data[0]));
// }
// getCountry("canada");

// function getCountry(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
//     .then((response) => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`${response.status}: country not found!`);
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       if (!neighbor) return;
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     })
//     .then((response) => response.json())
//     .then((neighData) => renderCountry(neighData, "neighbour"))
//     .catch((err) => {
//       console.error(`${err}🎃`);
//       return renderError(`Something went wrong.. ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// }

// btn.addEventListener("click", function () {
//   getCountry("germany");
// });
// // getCountry("gadlkfjn");

function getJSON(url, errMsg = "Something went wrong!") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${response.status}: ${errMsg}`);
    return response.json();
  });
}
function getCountry(country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}?fullText=true`,
    "Country not found!"
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) throw new Error("No neighbor found! 🏝");
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
        "Country not found!"
      );
    })
    .then((neighData) => renderCountry(neighData, "neighbour"))
    .catch((err) => {
      console.error(`${err}🎃`);
      return renderError(`Something went wrong.. ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

// btn.addEventListener("click", function () {
//   getCountry("australia");
// });
// getCountry("gadlkfjn");

btn.addEventListener("click", function () {
  whereAmI(52.508, 13.381);
});

function whereAmI(lat, lang) {
  fetch(`https://geocode.xyz/${lat},${lang}?geoit=json`)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Error from geocode 🎆");
      }
      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(
        `https://restcountries.eu/rest/v2/name/${data.country}?fullText=true`
      )
        .then((response) => {
          if (!response.ok) throw new Error("Error from restCountries! 🎆");
          return response.json();
        })
        .then((data) => renderCountry(data[0]));
    })
    .catch((err) => console.log(err));
}
