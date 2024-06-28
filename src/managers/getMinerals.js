export const getMinerals = async () => {
  const response = await fetch("http://localhost:8088/minerals");
  const data = await response.json();
  return data;
};
