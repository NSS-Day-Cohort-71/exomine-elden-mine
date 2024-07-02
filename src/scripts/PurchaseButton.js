import { getFacilityById } from "../managers/getFacilities.js";
import { getGovernorById } from "../managers/getGovernors.js";
import { renderColonyMinerals, renderFacilityMinerals } from "./Minerals.js";
import {
  //Import the functions from TransientState.js
  getTransientState,
  purchaseMineral,
  clearTransientState,
} from "./TransientState.js";

//Define the PurchaseButton component which returns purchase button HTML.
export const PurchaseButton = () => {
  return `
    <button id="purchaseButton">Purchase Mineral</button>
  `;
};

//An event listener for click events.
document.addEventListener("click", async (event) => {
  //Check if the clicked element has the "purchaseButton" id.
  if (event.target.id === "purchaseButton") {
    //Get current transient state.
    const state = getTransientState();

    if (
      //Check if the required state properties are set.
      state.facilityId &&
      state.governorId &&
      state.colonyId &&
      state.mineralId.length > 0 &&
      state.quantity > 0
    ) {
      // purchase from state
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

      document.dispatchEvent(new CustomEvent("stateChanged"));
    } else {
      // Alert if the required properties are not set.
      alert("Please select a facility, governor, and minerals.");
    }
  }
});
