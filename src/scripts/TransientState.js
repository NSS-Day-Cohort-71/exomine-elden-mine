const state = {
  governorId: 0,
  facilityId: 0,
  colonyId: 0,
  mineralId: [],
};

export const setFacility = (facilityId) => {
  state.facilityId = facilityId;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};
// I feel like this function should ALSO set the colonyId
export const setGovernor = (governorId) => {
  state.governorId = governorId;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setColony = (colonyId) => {
  state.colonyId = colonyId;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setMineral = (mineralId, isChecked) => {
  if (isChecked) {
    state.mineralId.push(mineralId);
  } else {
    state.mineralId = state.mineralId.filter((id) => id != mineralId);
  }
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

/*
      Does the chosen governor's colony already own some of this mineral?
          - If yes, what should happen? (hint: PUT)
          - If no, what should happen? (hint: POST)

      Defining the algorithm for this method is traditionally the hardest
      task for teams during this group project. It will determine when you
      should use the method of POST, and when you should use PUT.

      Only the foolhardy try to solve this problem with code. 
*/

export const purchaseMineral = async (data) => {
  // Check if the colony already owns the mineral
  const checkResponse = await fetch(
    `http://localhost:8088/colonyMinerals?colonyId=${data.colonyId}&mineralId=${data.mineralId}` // we are going to need to get colonyId somehow -- probably from setGovernor
  );
  if (checkResponse.status === 404) {
    // if it does not, use this POST
    const response = await fetch("http://localhost:8088/colonyMinerals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    document.dispatchEvent(new CustomEvent("stateChanged"));
  } else {
    // if the colony does own some of this material, use PUT
    const response = await fetch("http://localhost:8088/colonyMinerals", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    document.dispatchEvent(new CustomEvent("stateChanged"));
  }
};
