import { useNavigate } from "react-router-dom";

export default function Signup() {
    // initialize the useNavigate
    const navigate = useNavigate();

    const registerUser = async (event) => {
        // prevent the default response on the form submission
        event.preventDefault();

        // captures the data from the form and stores it as key value pair in an object
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        if (data.password !== data.retypePassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password
        }

        try {
            const userRes = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            const userDataResponse = await userRes.json();
            const loginRes = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email, password: data.password }),
            });
            const loginData = await loginRes.json();
            localStorage.setItem("user", JSON.stringify(loginData.user));
            localStorage.setItem("token", loginData.token);

            if (!userRes.ok || !loginRes.ok) {
                alert("Failed to save data.");
                return;
            }
            window.dispatchEvent(new Event("userLogin"));
            alert("Registration successful!");
            navigate("/");
        } catch (error) {
            console.error("Message:", error);
            alert("Registration Failed");
        }
    };
    return (
        <>
            <h2>Signup</h2>
            <div className="leftMessage">Welcome to my Signup Page</div>
            <div className="homeGrid">
                <form onSubmit={registerUser}>
                    <fieldset>
                        <legend>Personal Information</legend>

                        <label className="block" htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" required></input>

                        <label className="block" htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required></input>

                        <label className="block" htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="sample.@gmail.com" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" required></input>

                        <label className="block" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="enter your password"required></input>
                        <input className="block" type="password" id="retypePassword" name="retypePassword" placeholder="retype your password" required></input>
                    </fieldset>

                    <fieldset>
                        <legend>Submission</legend>
                        <input type="submit" value="Register"></input>
                        <input type="reset" value="Reset Registration Form"></input>
                    </fieldset>
                </form>
            </div>
        </>
    )
}