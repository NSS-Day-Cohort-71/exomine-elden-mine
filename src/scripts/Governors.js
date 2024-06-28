// import getGovernors from managers folder

import { getGovernors } from "../managers/getGovernors.js";
import { setGovernor } from "./TransientState.js";
import { renderGovernorMinerals } from "./Minerals.js";

// create export async function to display all governors
export const governorChoices = async () => {
  const governors = await getGovernors();

  let optionsHTML = governors
    .map((governor) => {
      return `<option value="${governor.id}">${governor.name}</option>`;
    })
    .join("");

  const divStringArray = `
    <div>
        <label for="governors">Choose a governor:</label>
        <select id="governors" name="governors">
            ${optionsHTML}
        </select>
    </div>
`;

  document.body.innerHTML = divStringArray;

  document.getElementById("governors");
  document.addEventListener("change", handleGovChange);

  return divStringArray;
};

const handleGovChange = async (changeEvent) => {
  if (changeEvent.target.name === "governor") {
    const governorId = parseInt(changeEvent.target.value);
    setGovernor(governorId);

    const selectedGovernor = (await getGovernors()).find(
      (gov) => gov.id === governorId
    );
    if (selectedGovernor) {
      const mineralsHTML = await renderGovernorMinerals(selectedGovernor);
      document.getElementById("governorMinerals").innerHTML = mineralsHTML;
    }
  }
};
