import { useNavigate } from "react-router-dom";

export default function Signin() {
    // initialize the useNavigate
    const navigate = useNavigate();

    const submitData = async (event) => {
        // prevent the default response on the form submission
        event.preventDefault();

        // captures the data from the form and stores it as key value pair in an object
        const formData = new FormData(event.target);

        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            });

            if (response.ok) {
            alert("Form submitted successfully!");

            // Navigate to homepage
            navigate("/");

            } else {
                const err = await response.json();
                console.error("message:", error);
                alert("Check your email and password.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Unable to reach the server.");
        }
    }

    return (
        <>
            <h2>Signin</h2>
            <div className="leftMessage">Welcome to my Sign In Page</div>
            <div className="homeGrid">
                <form onSubmit={submitData}>
                    <fieldset>
                        <label className="block" htmlFor="email">email</label>
                        <input type="email" id="email" name="email" required></input>

                        <label className="block" htmlFor="password">password</label>
                        <input type="password" id="password" name="password" required></input>
                    </fieldset>

                    <fieldset>
                        <input type="submit" value="Sign In"></input>
                    </fieldset>
                </form>
            </div>
        </>
    )
}