import { getMinerals } from "../managers/getMinerals.js";
import { setMineral } from "./TransientState.js";

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
  const minerals = await getMinerals();

  let html = `
    <h2>Facility Minerals for ${facility.name}</h2>
    <ul class="minerals-facilities-list">`;

  html += minerals
    .map((mineral) => {
      return `
          <li>
            <input type="radio" id="mineral-${mineral.id}" name="facility-mineral" class="mineral-facility-option" value="${mineral.id}" data-id="${mineral.id}">
            <label for="mineral-${mineral.id}">${mineral.name}</label>
          </li>`;
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
