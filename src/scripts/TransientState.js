import { getGovernors } from "../managers/getGovernors.js";
import { getMinerals } from "../managers/getMinerals.js";

const state = {
  governorId: 0,
  facilityId: 0,
  colonyId: 0,
  mineralId: [], // Now this will be an array of objects { id: mineralId, quantity: mineralQuantity, name: mineralName }
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

export const setMineral = (mineralId, quantity, name, isChecked) => {
  if (isChecked) {
    state.mineralId.push({ id: mineralId, quantity, name });
  } else {
    state.mineralId = state.mineralId.filter(
      (mineral) => mineral.id !== mineralId
    );
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
  const requests = data.mineralId.map(async (mineral) => {
    // mineral is an object { id, quantity, name }
    const checkResponse = await fetch(
      `http://localhost:8088/colonyMinerals?colonyId=${data.colonyId}&mineralId=${mineral.id}`
    );

    const existingResources = await checkResponse.json();

    if (existingResources.length === 0) {
      // POST request (create new resource)
      const requestData = {
        colonyId: data.colonyId,
        mineralId: mineral.id,
        quantity: mineral.quantity,
      };

      await fetch("http://localhost:8088/colonyMinerals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
    } else {
      // PUT request (update existing resource)
      const existingResource = existingResources[0];
      const requestData = {
        id: existingResource.id,
        colonyId: data.colonyId,
        mineralId: mineral.id,
        quantity: existingResource.quantity + mineral.quantity,
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

  await Promise.all(requests);
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const updateSpaceCart = async () => {
  const state = getTransientState();
  const spaceCartItems = document.querySelector("#spaceCartItems");
  if (spaceCartItems) {
    const minerals = await getMinerals();
    spaceCartItems.innerHTML = state.mineralId
      .map((mineral) => {
        const mineralDetails = minerals.find((m) => m.id === mineral.id);
        const mineralName = mineralDetails ? mineralDetails.name : "undefined";
        return `<p>${mineral.quantity} tons of ${mineralName}</p>`;
      })
      .join("");
  }
};

document.addEventListener("stateChanged", updateSpaceCart);
