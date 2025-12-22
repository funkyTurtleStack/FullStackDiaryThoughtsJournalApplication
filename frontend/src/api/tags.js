const API_BASE = import.meta.env.VITE_BACKEND_URL;

/**
 * GET /api/tags
 */
export async function getTags() {
  const res = await fetch(`${API_BASE}/tags`, {
    credentials: "include",
  });

  return res.json();
}

/**
 * GET /api/tags/:id
 */
export async function getTagById(id) {
  const res = await fetch(`${API_BASE}/tags/${id}`, {
    credentials: "include",
  });

  return res.json();
}

/**
 * POST /api/tags
 */
export async function createTag(name) {
  const res = await fetch(`${API_BASE}/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name }),
  });

  return res.json();
}

/**
 * PUT /api/tags/:id
 */
export async function updateTag(id, name) {
  const res = await fetch(`${API_BASE}/tags/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name }),
  });

  return res.json();
}

/**
 * DELETE /api/tags/:id
 */
export async function deleteTag(id) {
  const res = await fetch(`${API_BASE}/tags/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
}