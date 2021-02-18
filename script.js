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

// function renderCountry(data, className = "") {
//   const html = `
//         <article class="country ${className}">
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
//   countriesContainer.insertAdjacentHTML("beforeend", html);
//   countriesContainer.style.opacity = "1";
// }
// function renderError(msg) {
//   countriesContainer.insertAdjacentText("beforeend", msg);
// countriesContainer.style.opacity = 1;
// }
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

// function getJSON(url, errMsg = "Something went wrong!") {
//   return fetch(url).then((response) => {
//     if (!response.ok) throw new Error(`${response.status}: ${errMsg}`);
//     return response.json();
//   });
// }
// function getCountry(country) {
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}?fullText=true`,
//     "Country not found!"
//   )
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       if (!neighbor) throw new Error("No neighbor found! 🏝");
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
//         "Country not found!"
//       );
//     })
//     .then((neighData) => renderCountry(neighData, "neighbour"))
//     .catch((err) => {
//       console.error(`${err}🎃`);
//       return renderError(`Something went wrong.. ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// }

// // btn.addEventListener("click", function () {
// //   getCountry("australia");
// // });
// // getCountry("gadlkfjn");

// // btn.addEventListener("click", function () {
// //   whereAmI(52.508, 13.381);
// // });

// // function whereAmI(lat, lang) {
// //   fetch(`https://geocode.xyz/${lat},${lang}?geoit=json`)
// //     .then((response) => {
// //       if (!response.ok) {
// //         console.log(response);
// //         throw new Error("Error from geocode 🎆");
// //       }
// //       return response.json();
// //     })
// //     .then((data) => {
// //       console.log(`You are in ${data.city}, ${data.country}`);
// //       return fetch(
// //         `https://restcountries.eu/rest/v2/name/${data.country}?fullText=true`
// //       )
// //         .then((response) => {
// //           if (!response.ok) throw new Error("Error from restCountries! 🎆");
// //           return response.json();
// //         })
// //         .then((data) => renderCountry(data[0]));
// //     })
// //     .catch((err) => console.log(err));
// // }

// // const lotteryPromise = new Promise(function (resolve, reject) {
// //   console.log("bought the ticket!");
// //   setTimeout(function () {
// //     if (Math.random() >= 0.5) {
// //       resolve("You WIN WINE!💰🍷");
// //     } else {
// //       reject(new Error("You didnt win wine!🤮"));
// //     }
// //   }, 2000);
// // });

// // lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err));
// //Promisifying setTimeout---
// // function wait(seconds) {
// //   return new Promise(function (resolve) {
// //     setTimeout(resolve, seconds * 1000);
// //   });
// // }
// // wait(3)
// //   .then(function () {
// //     console.log("I waited 3 seconds!");
// //     return wait(1);
// //   })
// //   .then(() => console.log("I waited 1 seconds"));

// // navigator.geolocation.getCurrentPosition(
// //   (position) => console.log(position),
// //   (err) => console.log(err)
// // );
// // function getPosition() {
// //   return new Promise(function (resolve, reject) {
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => resolve(position),
// //       (err) => reject(err)
// //     );
// //   });
// // }
// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }
// // getPosition().then((position) => console.log(position));

// function whereAmI() {
//   getPosition()
//     .then((pos) => {
//       console.log(pos);
//       const { latitude, longitude } = pos.coords;
//       return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
//     })
//     .then((response) => {
//       if (!response.ok) {
//         console.log(response);
//         throw new Error("Error from geocode 🎆");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(
//         `https://restcountries.eu/rest/v2/name/${data.country}?fullText=true`
//       )
//         .then((response) => {
//           if (!response.ok) throw new Error("Error from restCountries! 🎆");
//           return response.json();
//         })
//         .then((data) => renderCountry(data[0]));
//     })
//     .catch((err) => console.log(err));
// }
// btn.addEventListener("click", whereAmI);

function wait(seconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, seconds * 1000);
  });
}
const imageContainer = document.querySelector(".images");
function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    const imageEl = document.createElement("img");
    imageEl.setAttribute("src", imgPath);

    imageEl.addEventListener("load", function () {
      imageContainer.append(imageEl);
      resolve(imageEl);
    });
    imageEl.addEventListener("error", function () {
      reject(new Error("image not found!"));
    });
  });
}
let currentImg;
createImage("img/img-1.jpg")
  .then((imageEl) => {
    currentImg = imageEl;
    console.log("Image 1 loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((imageEl) => {
    currentImg = imageEl;
    console.log("Image 2 loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-3.jpg");
  })
  .catch((err) => console.log(err));
