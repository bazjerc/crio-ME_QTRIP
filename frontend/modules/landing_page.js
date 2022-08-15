import config from "../conf/index.js";

const api = config.backendEndpoint;

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const citiesData = await fetch(`${api}/cities`);
    return citiesData.json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityCardContainer = document.getElementById("data");
  const cityCardHTML = `
    <div class="col-sm-6 col-lg-3 mb-4">
      <a id="${id}" href="./pages/adventures/?city=${id}">
        <div
          class="tile d-flex justify-content-center h-100 rounded-3 overflow-hidden"
        >
          <img src="${image}" />
          <div class="tile-text">
            <div class="fw-bold mb-1">${city}</div>
            <div>${description}</div>
          </div>
        </div>
      </a>
    </div>
  `;
  cityCardContainer.insertAdjacentHTML("beforeend", cityCardHTML);
}

export { init, fetchCities, addCityToDOM };
