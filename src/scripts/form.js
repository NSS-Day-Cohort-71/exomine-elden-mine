// import statements
import { governorChoices } from "../scripts/Governors.js";
import { ColonySelector } from "./Colonies.js";
import { PurchaseButton } from "./PurchaseButton.js";

// ${await FacilitySelector()}
// ${await MineralSelector()}

// Export async function for rendering the HTML
export const Form = async () => {
  return `
      ${await governorChoices()}
      
      ${await ColonySelector()}
      
      ${PurchaseButton()}
    `;
};
