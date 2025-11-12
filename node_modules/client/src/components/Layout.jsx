import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import { useState, useEffect } from "react";

export default function Layout() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const handleLogout = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        try {
            // Call backend signout route
            const response = await fetch(`/api/signout/${user._id}`, {
            method: "GET",
            credentials: "include", // if using cookies/sessions
            });

            if (response.ok) {
            console.log("User signed out on server");
            } else {
            const err = await response.json();
            console.error("Error signing out:", err);
            }
        } catch (error) {
            console.error("Network error:", error);
        }

        // Clear localStorage and state on frontend
        localStorage.removeItem("user");
        setUser(null);
    };

    return(
        <>
            <h1>My Portfolio</h1>
            <div className="logoContainer">
                <div>
                    <img className="imageLogo" src={logo} alt="Logo" />
                </div>
                <nav>
                    <Link to="/">Home</Link> {" "}
                    <Link to="/about">About</Link> {" "}
                    <Link to="/contact">Contact</Link> {" "}
                    <Link to="/education">Education</Link> {" "}
                    <Link to="/projects">Projects</Link> {" "}
                    <Link to="/services">Services</Link>
                </nav>
            </div>
            <div className="signup">
                {user ? (
                    <>
                        <button onClick={handleLogout}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <nav>
                            <Link to="/signup">Register</Link>
                            <Link to="/signin">Sign In</Link>
                        </nav>
                    </>
                )}
            </div>
        </>
    );
}