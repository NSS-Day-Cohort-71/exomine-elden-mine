import { getMinerals } from "../managers/getMinerals";
import { setMineral } from "./TransientState";

// render the minerals available for when a governor is selected (maybe an exported function for the governors module
export const renderGovernorMinerals = async (governor) => {
  const minerals = await getMinerals();

  let html = `<ul class="minerals-governors-list">`;

  html += minerals
    .map((mineral) => {
      return `<li class="mineral-governor-option" data-id="${mineral.id}">${mineral.name}</li>`;
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
