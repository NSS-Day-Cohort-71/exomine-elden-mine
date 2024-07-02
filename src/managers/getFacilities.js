export const getFacilities = async () => {
  const response = await fetch("http://localhost:8088/facilities");
  const data = await response.json();
  return data;
};

export const getFacilityById = async (id) => {
  const response = await fetch(`http://localhost:8088/facilities/${id}`);
  const facility = await response.json();
  return facility;
};
