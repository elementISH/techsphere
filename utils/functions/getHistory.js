import { API_URL } from "../constants";

export default async function getHistory(id, token) {
  const res = await fetch(API_URL + `/order-history/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Cache-Control": " no-cache, no-store, must-revalidate",
    },
  });
  if (!res.ok) return [];
  return await res.json();
}
