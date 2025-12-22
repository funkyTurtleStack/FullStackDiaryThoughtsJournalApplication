const API_BASE = import.meta.env.VITE_BACKEND_URL;

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // important for cookie
  });
  return res.json();
}

export async function register({ username, email, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  });
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    credentials: "include",
  });
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}