import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                alert(data.message || "Invalid credentials!");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred while logging in.");
        }
    };

    const handleForgotClick = async () => {
        alert("1234");
    }

    const handleSignupClick = async () => {
        alert("User:test Pw:1234");
    }


    return (
        <div className="container">
            <div className="header">
                <div className="title">Log In</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input-group">
                    <label className="input-label">Username</label>
                    <input type="text" placeholder="Username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-group">
                    <label className="input-label">Password</label>
                    <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="forgot-password" onClick={handleForgotClick}>Forgot?</div>
                </div>
            <button
                onClick={handleLoginClick}
                className="bg-green-500 text-white px-6 py-3 rounded-full text-xl hover:bg-green-600 transition duration-300 ease-in-out"
            >LOG IN
            </button>
                <div className="signup-text">Don't have an account? <span className="signup-link" onClick={handleSignupClick}>Sign up</span></div>
            </div>
        </div>
    );
}

export default Login;
