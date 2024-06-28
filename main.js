// import statements
import { Form } from "./src/scripts/form.js";

// grab container from the DOM
const render = async () => {
  const containerElement = document.querySelector("#container");

  // Get the HTML content of the Form component
  const formHtml = await Form();

  // Set the container element's innerHTML to include the formHtml
  containerElement.innerHTML = formHtml;
};

// Invoke the render function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", render);
