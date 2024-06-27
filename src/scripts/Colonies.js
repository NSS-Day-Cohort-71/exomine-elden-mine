import { getColonies } from './managers/colonies.js';
import { getGovernors } from './managers/governors.js';

export async function displayAllColonies() {
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
                        <option value="${gov.colonyId}" ${gov.colonyId === colony.id ? 'selected' : ''}>${gov.name}</option>
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
}

// create export async function to display all colonies

// fetch all colonies & governors

// map colonies and add html template strings, then join

// create handleTargetGovernorChange function

// create event listener to invoke the handleTargetGovernorChange
