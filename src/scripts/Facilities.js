// import getFacilities from managers folder
import { getFacilities } from "../managers/getFacilities.js"
import { setFacility } from "./TransientState.js"

// create export async function to display all facilities
export const facilityChoices = async () => {
// fetch all facilities    
    const facilities = await getFacilities()

// map facilities and add html template strings, then join
    let optionsHTML = facilities.map(
        (facility) => {
            return `<option value="${facility.id}">${facility.name}</option>`
        }).join("")

// create dropdown menu for the facilities
        const divStringArray = 
            `<div>
                <label for="facilities">Choose a facility</label>
                <select id="governors" name="governors">
                    ${optionsHTML}
                </select>
            </div>`

            document.body.innerHTML = divStringArray

// create event listener to invoke the handleTargetGovernorChange
            document.getElementById('facilities')
            document.addEventListener("change", handleFacilityChange)

            return divStringArray
}

// create handleTargetGovernorChange function
const handleFacilityChange = (changeEvent) => {
    if (changeEvent.target.name === 'governor') {
        const convertedToInteger = parseInt(changeEvent.target.value)
        setFacility(convertedToInteger)
    }
}


// depending on dropdown choice, display facility minerals in a separate div as radio buttons



