// import getGovernors from managers folder
import { getGovernors } from "./src/managers/getGovernors.js"

// create export async function to display all governors
export const governorChoices = async () => {
    const governors = await getGovernors()
    
    let optionsHTML = governors.map(
        (governor) => {
            return `<option value="${governor.id}">${governor.name}</option>`
        }).join("")

    const divStringArray = 
        <div>
            <label for="governors">Choose a governor:</label>
            <select id="governors" name="governors">
                ${optionsHTML}
            </select>
        </div>

        document.body.innerHTML = divStringArray

        document.getElementById('governors')
        document.addEventListener("change", handleGovChange)

// fetch all governors

// map governors and add html template strings, then join
// create dropdown menu for the governors
// when a governor is chosen, display all of the related-colony's minerals

// create handleTargetGovernorChange function

// create event listener to invoke the handleTargetGovernorChange
}