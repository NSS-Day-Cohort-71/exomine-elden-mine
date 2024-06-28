import { getFacilities } from "../managers/getFacilities.js";
import { setFacility } from "./TransientState.js";
import { renderFacilityMinerals } from "./Minerals.js";

export const facilityChoices = async () => {
  const facilities = await getFacilities();
  let optionsHTML = facilities
    .map((facility) => {
      return `<option value="${facility.id}">${facility.name}</option>`;
    })
    .join("");

  const divStringArray = `<div>
                <label for="facilities">Choose a facility</label>
                <select id="facilities" name="facilities">
                    ${optionsHTML}
                </select>
            </div>`;

  document.addEventListener("change", handleFacilityChange);
  return divStringArray;
};

const handleFacilityChange = async (changeEvent) => {
  if (changeEvent.target.name === "facilities") {
    const facilityId = parseInt(changeEvent.target.value);
    setFacility(facilityId);

    // depending on dropdown choice, display facility minerals in a separate div as radio button
    const selectedFacility = (await getFacilities()).find(
      (facility) => facility.id === facilityId
    );
    if (selectedFacility) {
      const mineralsHTML = await renderFacilityMinerals(selectedFacility);
      document.getElementById("facilityMinerals").innerHTML = mineralsHTML;
    }
  }
};
