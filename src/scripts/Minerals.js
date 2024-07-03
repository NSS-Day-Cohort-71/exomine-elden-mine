import {
  getColonyMinerals,
  getFacilityMinerals,
  getMinerals,
} from "../managers/getMinerals.js";
import { setMineral, setQuantity } from "./TransientState.js";

// Render the minerals available for when a governor is selected
export const renderColonyMinerals = async (governor) => {
  const colonyMinerals = await getColonyMinerals(governor.colonyId);

  let html = `<ul id="colony-minerals-list" class="minerals-colony-list">`;

  html += colonyMinerals
    .filter((colonyMineral) => colonyMineral.colonyId === governor.colonyId)
    .map((colonyMineral) => {
      const mineral = colonyMineral.mineral;
      if (mineral) {
        return `<li class="mineral-colony-option" data-id="${mineral.id}" data-quantity="${colonyMineral.quantity}">${colonyMineral.quantity} tons of ${mineral.name}</li>`;
      }
      return "";
    })
    .join("");

  html += `</ul>`;

  return html;
};

// Render the minerals available for when a facility is selected
export const renderFacilityMinerals = async (facility) => {
  const facilityMinerals = await getFacilityMinerals();

  let html = `
    <h2>Facility Minerals for ${facility.name}</h2>
    <ul class="minerals-facilities-list">`;

  html += facilityMinerals
    .filter((facilityMineral) => facilityMineral.facilityId === facility.id)
    .map((facilityMineral) => {
      return `
          <p>
            <input type="radio" id="mineral-${facilityMineral.id}" name="facility-mineral" class="mineral-facility-option" value="${facilityMineral.mineral.id}" data-id="${facilityMineral.mineral.id}" data-quantity="${facilityMineral.mineralQuantity}">
            <label for="mineral-${facilityMineral.mineral.id}" data-id="${facilityMineral.mineral.id}" data-quantity="${facilityMineral.mineralQuantity}">${facilityMineral.mineralQuantity} tons of ${facilityMineral.mineral.name}</label>
          </p>`;
    })
    .join("");

  html += `</ul>`;

  return html;
};

// Create handleTargetMineralChange function
export const handleTargetMineralChange = async (changeEvent) => {
  if (changeEvent.target.name === "facility-mineral") {
    const mineralId = parseInt(changeEvent.target.value);
    const quantity = parseInt(changeEvent.target.dataset.quantity);
    setMineral(mineralId, changeEvent.target.checked);
    setQuantity(quantity);
  }
};

// Create event listener to invoke the handleTargetMineralChange
document.addEventListener("change", handleTargetMineralChange);
