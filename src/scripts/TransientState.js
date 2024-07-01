import { getGovernors } from "../managers/getGovernors.js";

const state = {
  governorId: 0,
  facilityId: 0,
  colonyId: 0,
  mineralId: [],
};

export const getTransientState = () => {
  return { ...state };
};

export const clearTransientState = () => {
  state.governorId = 0;
  state.facilityId = 0;
  state.colonyId = 0;
  state.mineralId = [];
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

// export const getPurchaseRequirements = () => {
//   return {
//     colonyId: state.colonyId,
//     mineralId: [...state.mineralId],
//   };
// };

export const setFacility = (facilityId) => {
  state.facilityId = facilityId;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setGovernor = async (governorId) => {
  state.governorId = governorId;
  const governor = await getGovernorById(governorId);
  if (governor) {
    state.colonyId = governor.colonyId;
  }
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

const getGovernorById = async (governorId) => {
  const governors = await getGovernors();
  return governors.find((governor) => governor.id === governorId);
};

export const purchaseMineral = async (data) => {
  // Debugging: Check if data.mineralId is an array
  console.log("data.mineralId:", data.mineralId);

  if (!Array.isArray(data.mineralId)) {
    throw new TypeError("data.mineralId is not an array");
  }

  const requests = data.mineralId.map(async (mineralId) => {
    const checkResponse = await fetch(
      `http://localhost:8088/colonyMinerals?colonyId=${data.colonyId}&mineralId=${mineralId}`
    );

    const method = checkResponse.status === 404 ? "POST" : "PUT";

    // possibly Add all 4 properties (key/value pairs)
    // might possibly need to add specific index for the PUT placement in the URL

    const requestData = {
      colonyId: data.colonyId,
      mineralId: mineralId,
      quantity: 100,
      // Add other properties if needed such as quantity
    };

    await fetch("http://localhost:8088/colonyMinerals", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
  });

  await Promise.all(requests);
  document.dispatchEvent(new CustomEvent("stateChanged"));
};
