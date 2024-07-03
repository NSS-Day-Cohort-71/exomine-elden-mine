export const getMinerals = async () => {
  const response = await fetch("http://localhost:8088/minerals");
  const data = await response.json();
  return data;
};

export const getColonyMinerals = async () => {
  const response = await fetch(
    "http://localhost:8088/colonyMinerals?&_expand=colony&_expand=mineral"
  );
  const data = await response.json();
  return data;
};

export const getFacilityMinerals = async () => {
  const response = await fetch(
    "http://localhost:8088/facilityMinerals?&_expand=facility&_expand=mineral"
  );
  const data = await response.json();
  return data;
};

// Function to fetch a mineral by its ID
// export const getMineralById = async (mineralId) => {
//   const response = await fetch(`http://localhost:8088/minerals/${mineralId}`);
//   const data = await response.json();
//   return data;
// };
