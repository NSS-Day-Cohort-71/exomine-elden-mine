import { getColonies } from "../managers/getColonies.js";
import { getGovernors } from "../managers/getGovernors.js";
// import { getColonyMinerals } from '../managers/getMinerals.js';

// Function to display the colony based on the selected governor
export async function ColonySelector(governorId) {
  if (!governorId) {
    console.error("No governor ID provided.");
    return "<p>No colony found for the selected governor.</p>";
  }

  const colonies = await getColonies();
  const governors = await getGovernors();

  const selectedGovernor = governors.find((gov) => gov.id === governorId);

  // this is for michael to start on Monday
  // need to use selectedGovernor.colonyId to find the colony to pass to colonyMinerals
  // const colonyMinerals = await getColonyMinerals();
  // then invoke the renderGovernorMinerals function to display the minerals for the selected governor/colony

  if (!selectedGovernor) {
    console.error("No governor found with ID:", governorId);
    return "<p>No colony found for the selected governor.</p>";
  }

  const colony = colonies.find((col) => col.id === selectedGovernor.colonyId);
  const colonyHtml = colony
    ? `
        <div class="colony" data-colony-id="${colony.id}">
            <h3>${colony.name}</h3>
            <p>Governor: ${selectedGovernor.name}</p>
        </div>
    `
    : "<p>No colony found for the selected governor.</p>";

  return colonyHtml;
}

// Listen for governor selection changes
document.addEventListener("governorSelected", async (event) => {
  const governorId = event.detail.governorId;
  console.log("Governor selected with ID:", governorId);
  const colonyHtml = await ColonySelector(governorId);
  const coloniesContainer = document.getElementById("coloniesContainer");
  if (coloniesContainer) {
    coloniesContainer.innerHTML = colonyHtml;
  } else {
    console.error("Element with ID coloniesContainer not found.");
  }
});
