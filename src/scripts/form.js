// import statements
import { governorChoices } from "../scripts/Governors.js";

// Export async function for rendering the HTML
export const Form = async () => {
  return `
      ${await governorChoices()}
      ${await FacilitySelector()} //Placeholder 
      ${await ColonySelector()} //Placeholder
      ${await MineralSelector()} //Placeholder
      ${PurchaseButton()}
    `;
};
