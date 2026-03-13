import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function RegisterScreen() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = (event) => {
        event.preventDefault();

        if (!formData.fullName || !formData.email || !formData.password) {
            setError("Please complete all fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        localStorage.setItem("token", "demo-token");
        localStorage.setItem("user", formData.fullName);
        navigate("/chat", { replace: true });
    };

    return (
        <AuthLayout
            title="Register"
            buttonLabel="Register"
            buttonType="submit"
            onSubmit={handleRegister}
            footer={
                <>
                    Already have an account?{" "}
                    <Link to="/login" className="text-accent-purple">
                        Login
                    </Link>
                </>
            }
        >
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="w-full mb-3 px-3 py-2 rounded-lg bg-midnight border border-midnight-border text-white outline-none"
                    />

                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full mb-3 px-3 py-2 rounded-lg bg-midnight border border-midnight-border text-white outline-none"
                    />

                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full mb-3 px-3 py-2 rounded-lg bg-midnight border border-midnight-border text-white outline-none"
                    />

                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="w-full mb-4 px-3 py-2 rounded-lg bg-midnight border border-midnight-border text-white outline-none"
                    />

                    {error ? (
                        <p className="mb-4 text-sm text-accent-red">{error}</p>
                    ) : null}
        </AuthLayout>
    );
}
