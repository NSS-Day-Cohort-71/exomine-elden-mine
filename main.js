import { Form } from "./src/scripts/form.js";
import { governorChoices } from "./src/scripts/Governors.js";

const render = async () => {
  const containerElement = document.querySelector("#container");

  // Render form with governors dropdown
  const formHtml = await Form();
  containerElement.innerHTML = formHtml;

  // Initialize the dropdown and colonies after rendering the form
  await initializeComponents();
};

const initializeComponents = async () => {
  await governorChoices(); // Initialize governor dropdown
};

// Invoke the render function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", render);
