const API_BASE_URL = "https://randomuser.me/";

export async function getExperts(size) {
  const response = await fetch(API_BASE_URL + "api/?results=" + size.toString());
  const data = await response.json();
  return data;
}