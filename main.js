import { Form } from "./src/scripts/form.js";
import { governorChoices } from "./src/scripts/Governors.js";
import { PurchaseButton } from "./src/scripts/PurchaseButton.js";
import { updateSpaceCart } from "./src/scripts/TransientState.js"; // Import the updateSpaceCart function

const render = async () => {
  const containerElement = document.querySelector("#container");

  if (containerElement) {
    // Render form with governors dropdown
    const formHtml = await Form();
    containerElement.innerHTML = formHtml;

    // Render the PurchaseButton component
    const spaceCartContainer = document.querySelector("#spaceCartContainer");
    if (spaceCartContainer) {
      spaceCartContainer.innerHTML = `
        <h2>Space Cart</h2>
        <div id="spaceCartItems"></div> <!-- Updated to match the JavaScript code -->
        ${PurchaseButton()}
      `;
      // Initialize the Space Cart and update its contents
      await updateSpaceCart(); // Ensure this is awaited to fetch and display cart contents
    }

    // Initialize the dropdown and colonies after rendering the form
    await initializeComponents();
  } else {
    console.error("#container element not found");
  }
};

const initializeComponents = async () => {
  await governorChoices(); // Initialize governor dropdown
  // Update Space Cart contents on state change
  document.addEventListener("stateChanged", updateSpaceCart);
};

// Invoke the render function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", render);
