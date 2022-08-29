import config from "../conf/index.js";

const api = config.backendEndpoint;

////////////////////////////////////////////
// OPTIONAL
// Add new adventure
// !!!!!!!!!!!!!!!!! Does not work !!!!!!!!!!!!!!!!!!
/* const buttonAddNew = document.getElementById("add-new");
buttonAddNew.addEventListener("click", addNewAdventure);

async function addNewAdventure() {
  const city = getCityFromURL(window.location.search);
  const data = { city: city };
  const options = { method: "POST", body: JSON.stringify(data) };
  try {
    const responseData = await fetch(`${api}/adventures/new`, options); 
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
} */
////////////////////////////////////////////

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const queryParams = new URLSearchParams(search);
  const city = queryParams.get("city");
  // const city = search.split("=")[1];
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventures = await fetch(`${api}/adventures?city=${city}`);
    return adventures.json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const adventureCardContainer = document.getElementById("data");
  if (adventures.length === 0) {
    const empty = `<div class="empty">No adventures match your criteria :(</div>`;
    adventureCardContainer.insertAdjacentHTML("afterbegin", empty);
  }

  adventures.forEach(
    ({ id, name, costPerHead, currency, image, duration, category }) => {
      const adventureCardHTML = `
        <div class="col-6 col-lg-3 mb-4">
          <a id="${id}" href="detail/?adventure=${id}">
            <div class="card adventure-card">
              <div class="adventure-card-img-con">
                <img
                  src="${image}"
                  alt="${name}"
                  class="card-img-top"
                />
              </div>
              <div
                class="card-body d-flex flex-row justify-content-between flex-md-column"
              >
                <div
                  class="mb-md-2 d-flex flex-column flex-md-row justify-content-between text-center"
                >
                  <div class="mb-1 mb-md-0 fw-bold">${name}</div>
                  <div>${currency} ${costPerHead}</div>
                </div>
                <div
                  class="d-flex flex-column flex-md-row justify-content-between text-center"
                >
                  <div class="mb-1 mb-md-0 fw-bold">Duration</div>
                  <div>${duration} Hours</div>
                </div>
              </div>
              <div class="category-banner">${category}</div>
            </div>
          </a>
        </div>
      `;
      adventureCardContainer.insertAdjacentHTML(
        "afterbegin",
        adventureCardHTML
      );
    }
  );
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list = list.filter(
    (adventure) => adventure.duration >= low && adventure.duration <= high
  );
  return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  list = list.filter((adventure) => categoryList.includes(adventure.category));
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  const { duration: durationFilter, category: categoryFilter } = filters;
  const [low, high] = durationFilter.split("-");

  if (!durationFilter && categoryFilter.length) {
    // category only
    list = filterByCategory(list, categoryFilter);
  } else if (durationFilter && !categoryFilter.length) {
    // duration only
    list = filterByDuration(list, low, high);
  } else if (durationFilter && categoryFilter.length) {
    // both
    list = filterByCategory(list, categoryFilter);
    list = filterByDuration(list, low, high);
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  //return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = JSON.parse(localStorage.getItem("filters"));
  
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const filterPillsContainer = document.getElementById("category-list");
  const categoryFilter = filters.category;
  const filterPills = categoryFilter.map((category) => {
    const filterPill = document.createElement("div");
    filterPill.className = "category-filter";
    filterPill.textContent = category;
    return filterPill;
  });
  filterPillsContainer.append(...filterPills);
  document.getElementById("duration-select").value = filters.duration;
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
