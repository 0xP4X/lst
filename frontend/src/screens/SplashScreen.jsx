import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = localStorage.getItem("token");

            if (token) {
                navigate("/chat", { replace: true });
            } else {
                navigate("/login", { replace: true });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="h-screen flex items-center justify-center bg-midnight">
            <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-accent-purple flex items-center justify-center animate-pulse">
                    <span className="text-3xl font-bold text-white">LT</span>
                </div>

                <p className="text-white/70 text-sm">Loading Let'sTalk...</p>
            </div>
        </div>
    );
}