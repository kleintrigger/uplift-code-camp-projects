/* const API = "https://roberts-job-application-tracking-node-app.onrender.com/api";  */
const API = "/api"// your backend base URL

export async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  token = null,
) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || data.message || "API error");

  return data;
}
