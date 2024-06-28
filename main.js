import { Form } from "./src/scripts/form.js";
import { ColonySelector } from "./src/scripts/Colonies.js";
import { PurchaseButton } from "./src/scripts/PurchaseButton.js";

const render = async () => {
  const containerElement = document.querySelector("#container");
  const coloniesContainer = document.querySelector("#colonies-container");

  // Render form with governors dropdown
  const formHtml = await Form();
  containerElement.innerHTML = formHtml;

  // Render colonies selector
  const coloniesHtml = await ColonySelector();
  coloniesContainer.innerHTML = coloniesHtml;

  // Attach Purchase Combo button
  const purchaseButtonHtml = PurchaseButton();
  containerElement.insertAdjacentHTML("beforeend", purchaseButtonHtml);
};

document.addEventListener("DOMContentLoaded", render);
