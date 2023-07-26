import { API_URL } from "../constants";

export default async function getDetails(id) {
  const res = await fetch(API_URL + `/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "force-cache",
    },
  });
  if (!res.ok) return [];
  return await res.json();
}
