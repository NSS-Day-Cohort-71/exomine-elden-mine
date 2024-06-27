export const getColonies = async () => {
  const response = await fetch("http://localhost:8088/governors");
  const data = await response.json();
  return data;
};
