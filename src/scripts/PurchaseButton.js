import {
  //Import the functions from TransientState.js
  getTransientState,
  purchaseMineral,
  clearTransientState,
} from "./TransientState.js";

//Define the PurchaseButton component which returns purchase button HTML.
export const PurchaseButton = () => {
  return `
    <button id="purchaseButton">Purchase Combo</button>
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
      state.mineralId.length > 0
    ) {
      // Iterate over each selected mineral ID.
      for (const mineralId of state.mineralId) {
        await purchaseMineral({
          colonyId: state.colonyId,
          mineralId: mineralId,
          quantity: 1, // Placeholder
        });
      }
      // Clear the transient state after processing the purchase.
      clearTransientState();
    } else {
      //alert if the required properties are not set.
      alert("Please select a facility, governor, and minerals.");
    }
  }
});
