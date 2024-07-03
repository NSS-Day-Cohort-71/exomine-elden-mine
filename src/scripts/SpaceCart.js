export const SpaceCart = () => {
  return `
      <h2>Space Cart</h2>
      <div id="spaceCartItems">
        <!-- Space Cart Items will be dynamically added here -->
      </div>
      <button id="purchaseButton">Purchase Mineral</button>
    `;
};

// Function to update the Space Cart display
export const updateSpaceCart = () => {
  const state = getTransientState();
  const spaceCartItemsElement = document.querySelector("#spaceCartItems");

  if (state.mineralId.length > 0) {
    spaceCartItemsElement.innerHTML = state.mineralId
      .map((mineralId) => {
        const mineral = state.minerals.find((min) => min.id === mineralId);
        return `<p>${mineral.quantity} tons of ${mineral.name}</p>`;
      })
      .join("");
  } else {
    spaceCartItemsElement.innerHTML = "<p>Your cart is empty.</p>";
  }
};

// Add an event listener for the Purchase Button
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
