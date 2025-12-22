import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/auth";

export default function Login(){
    const [mode, setMode] = useState("login"); // "login" | "signup"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [checkingAuth, setCheckingAuth] = useState(true);

    const navigate = useNavigate();

    const checkLoggedIn = async () => {
            try{
                const res = await fetch("/api/auth/me", {
                    credentials: "include",
                });

                if (res.ok) {
                    navigate("/entries");
                    return;
            }
            }
            catch{
            // not logged in
            }
            finally{
            setCheckingAuth(false);
            }
        };
    
    useEffect(() => {
        checkLoggedIn();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            let data;

            if(mode === "login"){
                data = await login({ email, password });
            }
            else{
                data = await register({ email, password, username });
            }

            if(data.message){
                setError(data.message);
                return;
            }

            // Success → go to entries
            navigate("/entries");
        }
        catch (err){
            setError("Network error");
            console.error(err);
        }
        finally{
            checkLoggedIn();
        }
    };

    if (checkingAuth) {
        return null;
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
            <h1>{mode === "login" ? "Login" : "Sign Up"}</h1>

            <form onSubmit={handleSubmit} className="auth-form">
                {mode === "signup" && (
                <input
                    type="text"
                    placeholder="Username (optional)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                )}

                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                <button type="submit">
                {mode === "login" ? "Login" : "Create Account"}
                </button>
            </form>

            {error && <p className="auth-error">{error}</p>}

            <p className="auth-toggle">
                {mode === "login" ? (
                <>
                    Don’t have an account?{" "}
                    <button type="button" onClick={() => setMode("signup")}>
                    Sign up
                    </button>
                </>
                ) : (
                <>
                    Already have an account?{" "}
                    <button type="button" onClick={() => setMode("login")}>
                    Log in
                    </button>
                </>
                )}
            </p>
            </div>
        </div>
    );
}