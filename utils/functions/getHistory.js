import { API_URL } from "../constants";

export default async function getHistory(id, token) {
  const res = await fetch(API_URL + `/order-history/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      cache: "force-cache",
    },
  });
  if (!res.ok) throw new Error("failed to fetch history");
  return await res.json();
}
