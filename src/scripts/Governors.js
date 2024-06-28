import { getGovernors } from "../managers/getGovernors.js";
import { setGovernor } from "./TransientState.js";
import { renderGovernorMinerals } from "./Minerals.js";

// Create export async function to display all governors
export const governorChoices = async () => {
  const governors = await getGovernors();

  let optionsHTML = governors
    .map((governor) => {
      return `<option value="${governor.id}">${governor.name}</option>`;
    })
    .join("");

  const dropdownHtml = `
    <div>
        <label for="governors">Choose a governor:</label>
        <select id="governors" name="governors">
            <option value="">Select a governor</option>
            ${optionsHTML}
        </select>
    </div>
  `;

  const governorDropdownContainer = document.getElementById('governorDropdownContainer');
  if (governorDropdownContainer) {
      governorDropdownContainer.innerHTML = dropdownHtml;
  } else {
      console.error('Element with ID governorDropdownContainer not found.');
      return;
  }

  document.getElementById('governors').addEventListener("change", handleGovChange);

  return dropdownHtml;
};

const handleGovChange = async (changeEvent) => {
  if (changeEvent.target.name === "governors") {
    const governorId = parseInt(changeEvent.target.value);
    await setGovernor(governorId);

    const selectedGovernor = (await getGovernors()).find(
      (gov) => gov.id === governorId
    );
    if (selectedGovernor) {
      const mineralsHTML = await renderGovernorMinerals(selectedGovernor);
      const governorMinerals = document.getElementById("governorMinerals");
      if (governorMinerals) {
          governorMinerals.innerHTML = mineralsHTML;
      } else {
          console.error('Element with ID governorMinerals not found.');
      }

      document.dispatchEvent(new CustomEvent('governorSelected', {
        detail: { governorId }
      }));
    }
  }
};
