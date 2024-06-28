// import statements
import { governorChoices } from "../scripts/Governors.js";
import { ColonySelector } from "./Colonies.js";
import { facilityChoices } from "./Facilities.js";
import { PurchaseButton } from "./PurchaseButton.js";

// ${await MineralSelector()}

// Export async function for rendering the HTML
export const Form = async () => {
  return `
      ${await governorChoices()}
      
      ${await ColonySelector()}
      ${await facilityChoices()}
      ${PurchaseButton()}
    `;
};
