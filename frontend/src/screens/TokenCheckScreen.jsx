import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TokenCheckScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const timer = setTimeout(() => {
            navigate(token ? "/chat" : "/login", { replace: true });
        }, 250);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="app-shell flex min-h-screen items-center justify-center px-6 text-white">
            <div className="glass-panel flex w-full max-w-md flex-col items-center rounded-[32px] px-8 py-10 text-center">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-white/80" />
                <p className="mt-5 text-sm uppercase tracking-[0.28em] text-white/45">
                    Token Check
                </p>
                <p className="mt-2 text-sm text-white/64">
                    Verifying your session before opening the app.
                </p>
            </div>
        </div>
    );
}
