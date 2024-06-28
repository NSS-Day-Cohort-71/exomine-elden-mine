import { Form } from "./src/scripts/form.js";

const render = async () => {
  // grab container from the DOM
  const containerElement = document.querySelector("#container");
  // Get the HTML content of the Form component
  const formHtml = await Form();

  // Set the container element's innerHTML to include the formHtml
  containerElement.innerHTML = formHtml;
};

render();

// Invoke the render function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", render);
