import config from "../conf/index.js";

const api = config.backendEndpoint;

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(`${api}/reservations`);
    // console.log(response.clone().json())
    return await response.json();
  } catch (reason) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  const elNoResBanner = document.getElementById("no-reservation-banner");
  const elReservationTableParent = document.getElementById("reservation-table-parent");
  const elReservationTable = document.getElementById("reservation-table");
  if (reservations.length > 0) {
    elNoResBanner.style.setProperty("display", "none");
    elReservationTableParent.style.setProperty("display", "block");
    reservations.forEach((reservation) => {
      const { id, name, adventureName, person, date, price, adventure, time } =
        reservation;
      const reservedDate = new Date(date).toLocaleDateString("en-IN");
      const reservationDate =
        new Date(time).toLocaleString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) +
        ", " +
        new Date(time).toLocaleTimeString("en-IN");
      // console.log(reservedDate, reservationDate)

      const reservationRow = document.createElement("tr");
      const rowFields = [
        `<td class="fw-bold">${id}</td>`,
        `<td>${name}</td>`,
        `<td>${adventureName}</td>`,
        `<td>${person}</td>`,
        `<td>${reservedDate}</td>`,
        `<td>${price}</td>`,
        `<td>${reservationDate}</td>`,
        `<td id="${id}" class="visit"></td>`
      ];
      reservationRow.innerHTML = reservationRow.innerHTML.concat(...rowFields);
      // console.log(reservationRow)
      const visitBtn = `<a href="../detail/?adventure=${adventure}"><btn class="reservation-visit-button" type="button">Visit Adventure</button></a>`;
      reservationRow.querySelector(".visit").innerHTML = visitBtn;
      // console.log(reservationRow)
      elReservationTable.appendChild(reservationRow);
    });
  } else {
    elNoResBanner.style.setProperty("display", "block");
    elReservationTableParent.style.setProperty("display", "none");
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
