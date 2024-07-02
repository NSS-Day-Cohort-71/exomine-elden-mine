import { getGovernors } from "../managers/getGovernors.js";

const state = {
  governorId: 0,
  facilityId: 0,
  colonyId: 0,
  mineralId: [],
  quantity: 0,
};

export const getTransientState = () => {
  return { ...state };
};

export const clearTransientState = () => {
  state.governorId = 0;
  state.facilityId = 0;
  state.colonyId = 0;
  state.mineralId = [];
  state.quantity = 0;
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

export const setQuantity = (quantity) => {
  state.quantity = parseInt(quantity); // Convert to integer
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const purchaseMineral = async (data) => {
  const requests = data.mineralId.map(async (mineralId) => {
    const checkResponse = await fetch(
      `http://localhost:8088/colonyMinerals?colonyId=${data.colonyId}&mineralId=${mineralId}`
    );

    const existingResources = await checkResponse.json();

    if (existingResources.length === 0) {
      // POST request (create new resource)
      const requestData = {
        colonyId: data.colonyId,
        mineralId: mineralId,
        quantity: data.quantity,
      };

      await fetch("http://localhost:8088/colonyMinerals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log("POST");
    } else {
      // PUT request (update existing resource)
      const existingResource = existingResources[0];
      const requestData = {
        id: existingResource.id,
        colonyId: data.colonyId,
        mineralId: mineralId,
        quantity: existingResource.quantity + data.quantity,
      };

      await fetch(
        `http://localhost:8088/colonyMinerals/${existingResource.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
    }
  });
  console.log("PUT");

  await Promise.all(requests);
  document.dispatchEvent(new CustomEvent("stateChanged"));
};
