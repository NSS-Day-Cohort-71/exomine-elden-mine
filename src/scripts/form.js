// import statements
import { governorChoices } from "../scripts/Governors.js";
import { facilityChoices } from "../scripts/Facilities.js";

// Export async function for rendering the HTML
export const Form = async () => {
  const governorDropdown = await governorChoices();
  const facilityDropdown = await facilityChoices();
  const coloniesDisplay = await ColonySelector();

  return `
      ${await governorChoices()}
      ${await facilityChoices()} 
      ${await ColonySelector()} //Placeholder
      ${await MineralSelector()} //Placeholder
      ${PurchaseButton()}
    `;
};
