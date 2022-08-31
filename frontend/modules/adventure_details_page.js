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
  const imageCarouselId = "imageCarousel";
  const adventurePhotoGallery = document.getElementById("photo-gallery");
  const divIndicators = document.createElement("div");
  divIndicators.className = "carousel-indicators";
  const divInner = document.createElement("div");
  divInner.className = "carousel-inner";
  images.forEach((image) => {
    if (image) {
      let indicator;
      let inner;
      if (divInner.children.length > 0) {
        indicator = `<button type="button" data-bs-target="#${imageCarouselId}" data-bs-slide-to="${
          divInner.children.length
        }" aria-label="Slide ${divInner.children.length + 1}"></button>`;
        inner = `
          <div class="carousel-item">
            <img class="activity-card-image" src="${image}" alt="Image ${
          divInner.children.length + 1
        }">
          </div>
        `;
      } else {
        indicator = `<button type="button" data-bs-target="#${imageCarouselId}" data-bs-slide-to="${
          divInner.children.length
        }" class="active" aria-current="true" aria-label="Slide ${
          divInner.children.length + 1
        }"></button>`;
        inner = `
          <div class="carousel-item active">
            <img class="activity-card-image" src="${image}" alt="Image ${
          divInner.children.length + 1
        }">
          </div>
        `;
      }
      divIndicators.insertAdjacentHTML("beforeend", indicator);
      divInner.insertAdjacentHTML("beforeend", inner);
    }
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
  adventurePhotoGallery.innerHTML = "";
  adventurePhotoGallery.insertAdjacentHTML("afterbegin", bootstrapCarousel);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const elSoldOut = document.getElementById("reservation-panel-sold-out");
  const elAvailable = document.getElementById("reservation-panel-available");
  const elCostPerHead = document.getElementById("reservation-person-cost");
  elCostPerHead.textContent = adventure.costPerHead;
  const availability = adventure.available;
  if (availability) {
    elSoldOut.style.setProperty("display", "none");
    elAvailable.style.setProperty("display", "block");
  } else {
    elSoldOut.style.setProperty("display", "block");
    elAvailable.style.setProperty("display", "none");
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const elCostTotal = document.getElementById("reservation-cost");
  const costPerHead = adventure.costPerHead;
  const costTotal = costPerHead * persons;
  elCostTotal.textContent = costTotal;
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const formReservation = document.forms.myForm;
  const resName = formReservation.elements.name.value;
  const resDate = formReservation.elements.date.value;
  const resPerson = formReservation.elements.person.value;
  const reservationData = {
    name: resName,
    date: resDate,
    person: resPerson,
    adventure: adventure.id,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(reservationData),
  };
  try {
    const response = await fetch(`${api}/reservations/new`, options);
    // console.log(response);
    if (response.ok) {
      window.alert("Success!");
      window.location.reload();
    } else {
      window.alert("Failed!");
    }
  } catch (reason) {
    console.log(reason);
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    reservedBanner.style.setProperty("display", "block");
  } else {
    reservedBanner.style.setProperty("display", "none");
  }
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
