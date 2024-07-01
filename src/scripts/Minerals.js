import {
  getColonyMinerals,
  getFacilityMinerals,
  getMinerals,
} from "../managers/getMinerals.js";
import { setMineral } from "./TransientState.js";

// render the minerals available for when a governor is selected (maybe an exported function for the governors module
export const renderColonyMinerals = async (governor) => {
  const colonyMinerals = await getColonyMinerals(governor.colonyId);

  let html = `<ul id="colony-minerals-list" class="minerals-colony-list">`;

  html += colonyMinerals
    .filter((colonyMineral) => colonyMineral.colonyId === governor.colonyId)
    .map((colonyMineral) => {
      return `<li class="mineral-colony-option" data-id="${colonyMineral.mineral.id}">${colonyMineral.mineral.name}</li>`;
    })
    .join("");

  html += `</ul>`;

  return html;
};

// render the minerals available for when a facility is selected (maybe an exported function for the facilities module)
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
            <input type="radio" id="mineral-${facilityMineral.id}" name="facility-mineral" class="mineral-facility-option" value="${facilityMineral.id}" data-id="${facilityMineral.id}">
            <label for="mineral-${facilityMineral.mineral.id}">${facilityMineral.mineralQuantity} tons of ${facilityMineral.mineral.name}</label>
          </p>`;
    })
    .join("");

  html += `</ul>`;

  return html;
};

// create handleTargetMineralChange function
export const handleTargetMineralChange = async (changeEvent) => {
  if (changeEvent.target.name === "facility-mineral") {
    const mineralId = parseInt(changeEvent.target.value);
    setMineral(mineralId, changeEvent.target.checked);
  }
};

// create event listener to invoke the handleTargetMineralChange
document.addEventListener("change", handleTargetMineralChange);
