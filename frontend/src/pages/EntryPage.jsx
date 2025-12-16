import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logout } from "../api/auth";

export default function EntryPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMe();
        setUser(data);
      } catch {
        navigate("/");
      }
    }
    fetchUser();
  }, [navigate]);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-light bg-light border-bottom px-3">
        <span className="navbar-text fw-bold">
          {user?.username || ""}
        </span>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="container mt-4">
        <h2>Your Entries</h2>
        <p className="text-muted">Entries will appear here.</p>
      </div>
    </>
  );
}