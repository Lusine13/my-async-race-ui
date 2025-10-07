import { BASE_URL } from "../core/utils/constants";

export async function getCars(page = 1, limit = 7) {
  const response = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
  return response.json();
}
