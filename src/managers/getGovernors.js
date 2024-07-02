export const getGovernors = async () => {
  const response = await fetch("http://localhost:8088/governors");
  const data = await response.json();
  return data;
};
export const getGovernorById = async (id) => {
  const response = await fetch(`http://localhost:8088/governors/${id}`);
  const governor = await response.json();
  return governor;
};
