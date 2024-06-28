import { getGovernors } from '../managers/getGovernors.js';

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
  const checkResponse = await fetch(
    `http://localhost:8088/colonyMinerals?colonyId=${data.colonyId}&mineralId=${data.mineralId}`
  );
  if (checkResponse.status === 404) {
    const response = await fetch("http://localhost:8088/colonyMinerals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    document.dispatchEvent(new CustomEvent("stateChanged"));
  } else {
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
