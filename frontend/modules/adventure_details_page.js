import config from "../conf/index.js";

const api = config.backendEndpoint;

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const searchParams = new URLSearchParams(search);
  return searchParams.get("adventure");
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(
      `${api}/adventures/detail?adventure=${adventureId}`
    );
    return await response.json();
  } catch (reason) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const adventureName = document.getElementById("adventure-name");
  const adventureSubtitle = document.getElementById("adventure-subtitle");
  const adventurePhotoGallery = document.getElementById("photo-gallery");
  const adventureContent = document.getElementById("adventure-content");
  const { name, subtitle, images, content } = adventure;
  adventureName.textContent = name;
  adventureSubtitle.textContent = subtitle;
  adventureContent.textContent = content;
  images.forEach((imageUrl, i) => {
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `
      <img class="activity-card-image" src="${imageUrl}" alt="Image ${i + 1}">
    `;
    adventurePhotoGallery.insertAdjacentElement("beforeend", imgDiv);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const imageCarouselId = "imageCarousel" 
  const adventurePhotoGallery = document.getElementById("photo-gallery");
  const divIndicators = document.createElement("div");
  divIndicators.className = "carousel-indicators";
  const divInner = document.createElement("div");
  divInner.className = "carousel-inner";
  images.forEach((image, i) => {
    let indicator;
    let inner;
    if (i > 0) {
      indicator = `<button type="button" data-bs-target="#${imageCarouselId}" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>`
      inner = `
        <div class="carousel-item">
          <img class="activity-card-image" src="${image}" alt="Image ${i + 1}">
        </div>
      `
    } else {
      indicator = `<button type="button" data-bs-target="#${imageCarouselId}" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i + 1}"></button>`;
      inner = `
        <div class="carousel-item active">
          <img class="activity-card-image" src="${image}" alt="Image ${i + 1}">
        </div>
      `
    }
    divIndicators.insertAdjacentHTML("beforeend", indicator);
    divInner.insertAdjacentHTML("beforeend", inner);
  });
  const bootstrapCarousel = `
    <div id="${imageCarouselId}" class="carousel slide" data-bs-ride="true" data-bs-pause="hover" data-bs-interval="4000">
      ${divIndicators.outerHTML}
      ${divInner.outerHTML}
      <button class="carousel-control-prev" type="button" data-bs-target="#${imageCarouselId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${imageCarouselId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
  adventurePhotoGallery.innerHTML = ""
  adventurePhotoGallery.insertAdjacentHTML("afterbegin", bootstrapCarousel);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
