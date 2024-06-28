import { Form } from "./src/scripts/form.js";
import { governorChoices } from "./src/scripts/Governors.js";

const render = async () => {
  // grab container from the DOM
  const containerElement = document.querySelector("#container");
  // Get the HTML content of the Form component
  const formHtml = await Form();

  // Set the container element's innerHTML to include the formHtml
  containerElement.innerHTML = formHtml;

  // Initialize the dropdown and colonies after rendering the form
  await initializeComponents();
};

const initializeComponents = async () => {
  await governorChoices(); // Initialize governor dropdown
};

// Invoke the render function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", render);
