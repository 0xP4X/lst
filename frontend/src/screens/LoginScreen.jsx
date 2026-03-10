import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function LoginScreen() {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("token", "demo-token");
        navigate("/chat", { replace: true });
    };

    return (
        <AuthLayout
            title="Login"
            buttonLabel="Login"
            onButtonClick={handleLogin}
            footer={
                <>
                    New to Let'sTalk?{" "}
                    <Link to="/register" className="text-accent-purple">
                        Create an account
                    </Link>
                </>
            }
        >
                <input
                    placeholder="Email"
                    className="w-full mb-3 px-3 py-2 rounded-lg bg-midnight border border-midnight-border text-white outline-none"
                />

                <input
                    placeholder="Password"
                    type="password"
                    className="w-full mb-4 px-3 py-2 rounded-lg bg-midnight border border-midnight-border text-white outline-none"
                />
        </AuthLayout>
    );
}
