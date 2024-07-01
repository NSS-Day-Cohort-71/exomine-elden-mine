// import statements
import { governorChoices } from "./Governors.js";
import { ColonySelector } from "./Colonies.js";
import { facilityChoices } from "./Facilities.js";
import { PurchaseButton } from "./PurchaseButton.js";
// Export async function for rendering the HTML
export const Form = async () => {
  const governorDropdown = await governorChoices();
  const facilityDropdown = await facilityChoices();
  const coloniesDisplay = await ColonySelector();
  return `
      <div id="sidebar">
          <div id="governorDropdownContainer">${governorDropdown}</div>
          <div id="facilityDropdownContainer">${facilityDropdown}</div>
      </div>
      <div id="content">
          <div id="coloniesContainer">${coloniesDisplay}</div>
          <div id="facilityMinerals"></div>
          ${PurchaseButton()}
      </div>
    `;
};
