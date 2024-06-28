import { getColonies } from '../managers/getColonies.js';
import { getGovernors } from '../managers/getGovernors.js';
// Function to display all colonies
export async function coloniesSelector() {
    const colonies = await getColonies();
    const governors = await getGovernors();

    const coloniesHtml = colonies.map(colony => {
        const governor = governors.find(gov => gov.colonyId === colony.id);
        return `
            <div class="colony" data-colony-id="${colony.id}">
                <h3>${colony.name}</h3>
                <p>Governor: ${governor ? governor.name : 'No Governor'}</p>
                <label for="governorSelect${colony.id}">Change Governor:</label>
                <select id="governorSelect${colony.id}" class="governor-select">
                    ${governors.map(gov => `
                        <option value="${gov.id}" ${gov.colonyId === colony.id ? 'selected' : ''}>${gov.name}</option>
                    `).join('')}
                </select>
            </div>
        `;
    }).join('');

    document.getElementById('coloniesContainer').innerHTML = coloniesHtml;

    // Attach event listeners to governor select elements
    document.querySelectorAll('.governor-select').forEach(select => {
        select.addEventListener('change', handleTargetGovernorChange);
    });
}

// Function to handle governor change
async function handleTargetGovernorChange(event) {
    const selectElement = event.target;
    const colonyId = selectElement.closest('.colony').dataset.colonyId;
    const newGovernorId = selectElement.value;

    await fetch(`/api/colonies/${colonyId}/governor`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ governorId: newGovernorId }),
    });

    console.log(`Governor for colony ${colonyId} changed to ${newGovernorId}`);

    // Optionally update the UI if needed
    await coloniesSelector(); // Re-display colonies to reflect the change
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    coloniesSelector();
});