const API_BASE = import.meta.env.VITE_BACKEND_URL;

/**
 * GET /api/entries
 * Optional params:
 *   - tags: "work,school"
 *   - sort: "date" | "alpha"
 *   - order: "asc" | "desc"
 */
export async function getEntries({ tags, sort, order } = {}) {
  const params = new URLSearchParams();

  if (tags) params.append("tags", tags);
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);

  const query = params.toString();
  const url = `${API_BASE}/entries${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    credentials: "include",
  });

  return res.json();
}

/**
 * GET /api/entries/:id
 */
export async function getEntryById(id) {
  const res = await fetch(`${API_BASE}/entries/${id}`, {
    credentials: "include",
  });

  return res.json();
}

/**
 * POST /api/entries
 */
export async function createEntry({ title, content, summary, tags }) {
  const res = await fetch(`${API_BASE}/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, content, summary, tags }),
  });

  return res.json();
}

/**
 * PUT /api/entries/:id
 * Allows partial updates
 */
export async function updateEntry(id, updates) {
  const res = await fetch(`${API_BASE}/entries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updates),
  });

  return res.json();
}

/**
 * DELETE /api/entries/:id
 */
export async function deleteEntry(id) {
  const res = await fetch(`${API_BASE}/entries/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
}