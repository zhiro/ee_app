import React, { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./Banner.css"

const Banner = ({ children }) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const navigate = useNavigate();
        const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Has token:", token);
        setIsLoggedIn(token !== null);
    }, [navigate]);

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    const getLinkClass = (path) => {
        return location.pathname === path ? "text active" : "text";
    };


    return (
        <div className="Banner">
            <div className="top-banner">
                <div className="left-side">
                <div className={getLinkClass("/")}>
                    <Link to="/">Home</Link>
                </div>
                    <div className={getLinkClass("/metering")}>
                        <Link to="/metering">My Metering Points</Link>
                    </div>
                    <div className={getLinkClass("/consumption")}>
                        <Link to="/consumption">My Consumption</Link>
                    </div>
                </div>


                <div className="right-side">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogoutClick}
                            className="text">
                            LOG OUT
                        </button>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="text">
                            LOG IN
                        </button>
                    )}
                </div>
            </div>

            <div className="child">
                {children}
            </div>
        </div>
    );
};

export default Banner;
