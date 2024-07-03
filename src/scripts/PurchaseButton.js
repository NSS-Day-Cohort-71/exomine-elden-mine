import { getFacilityById } from "../managers/getFacilities.js";
import { getGovernorById } from "../managers/getGovernors.js";
import { renderColonyMinerals, renderFacilityMinerals } from "./Minerals.js";
import {
  getTransientState,
  purchaseMineral,
  clearTransientState,
} from "./TransientState.js";

// Define the PurchaseButton component which returns purchase button HTML.
export const PurchaseButton = () => {
  return `
    <div id="spaceCart">
      <h2>Space Cart</h2>
      <div id="spaceCartItems">
        <!-- Space Cart Items will be dynamically added here -->
      </div>
      <button id="purchaseButton">Purchase</button>
    </div>
  `;
};

// Function to update the Space Cart display
const updateSpaceCart = () => {
  const state = getTransientState();
  const spaceCartItemsElement = document.querySelector("#spaceCartItems");

  // Clear out any existing content
  spaceCartItemsElement.innerHTML = "";

  // If there are minerals in the cart
  if (state.mineralId.length > 0) {
    // Create the HTML for each mineral item
    state.mineralId.forEach((mineral) => {
      spaceCartItemsElement.innerHTML += `<p>${mineral.quantity} ton of ${mineral.name}</p>`;
    });
  } else {
    // If the cart is empty
    spaceCartItemsElement.innerHTML = "<p>Your cart is empty.</p>";
  }
};

// An event listener for click events.
document.addEventListener("click", async (event) => {
  if (event.target.id === "purchaseButton") {
    const state = getTransientState();

    if (
      state.facilityId &&
      state.governorId &&
      state.colonyId &&
      state.mineralId.length > 0 &&
      state.quantity > 0
    ) {
      // Purchase from state
      purchaseMineral(state);

      // Fetch full governor and facility objects
      const governor = await getGovernorById(state.governorId);
      const facility = await getFacilityById(state.facilityId);

      // Refresh the colonies and facility minerals display.
      const colonyMineralsHtml = `Minerals:${await renderColonyMinerals(
        governor
      )}`;
      const facilityMineralsHtml = await renderFacilityMinerals(facility);

      // Update the DOM with new content
      document.querySelector("#colony-minerals").innerHTML = colonyMineralsHtml;
      document.querySelector("#facilityMinerals").innerHTML =
        facilityMineralsHtml;

      // Clear the transient state
      clearTransientState();

      // Update the Space Cart display
      updateSpaceCart();

      document.dispatchEvent(new CustomEvent("stateChanged"));
    } else {
      alert("Please select a facility, governor, and minerals.");
    }
  }
});

// Event listener to update Space Cart when minerals are selected
document.addEventListener("change", (event) => {
  if (event.target.matches(".mineral-facility-option")) {
    const mineralId = parseInt(event.target.value);
    const quantity = parseInt(event.target.dataset.quantity);
    const isChecked = event.target.checked;

    const state = getTransientState();

    if (isChecked) {
      state.mineralId.push({ id: mineralId, quantity });
    } else {
      state.mineralId = state.mineralId.filter(
        (mineral) => mineral.id !== mineralId
      );
    }

    // Update the Space Cart display
    updateSpaceCart();
  }
});
