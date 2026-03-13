import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBanner from "../assets/lets-talk-banner-speech-bubble-with-lets-talk-text-business-concept-3d-illustration-spiral-background-vector-line-icon-business_727385-3416.jpg";

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/token-check", { replace: true });
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="app-shell flex min-h-screen items-center justify-center px-6 text-white">
            <div className="glass-panel screen-noise flex w-full max-w-md flex-col items-center rounded-[40px] px-10 py-14 text-center">
                <img
                    src={logoBanner}
                    alt="Let's Talk logo"
                    className="mb-6 h-32 w-32 animate-[pulse_1.8s_ease-in-out_infinite] rounded-[28px] object-cover shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
                />
                <h1 className="text-3xl font-semibold tracking-tight">Let&apos;s Talk</h1>
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/64">
                    Loading your conversation space, topics, and thread activity.
                </p>
                <div className="mt-10 h-2 w-44 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-[linear-gradient(90deg,#1fd2ff,#bb4cff)]" />
                </div>
            </div>
        </div>
    );
}
