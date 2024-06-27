// create export component button rendering html to the DOM
export const PurchaseButton = () => {
  return `
        <button id="purchaseButton">Purchase Button</button>
    `;
};
// create an event listener for when the button is pressed to invoke transient state to permanent state function

document.addEventListener("click", async (event) => {
  if (event.target.id === "purchaseButton") {
    const state = getTransientState();

    if (
      state.selectedFacility &&
      state.selectedMineral &&
      state.selectedGovernor
    ) {
      const response = await fetch("http://localhost:8088/colonyMinerals");
      const colonyMinerals = await response.json();

      const governorResponse = await fetch(
        `http://localhost:8088/governors/${state.selectedGovernor}`
      );
    }
    const governor = await governorResponse.json();

    const colonyMineral = colonyMinerals.find(
      (cm) =>
        cm.colonyId === governor.colonyId &&
        cm.mineralId === state.selectedMineral
    );
  }
});
