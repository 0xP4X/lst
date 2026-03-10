export default function AuthLayout({
    title,
    children,
    footer,
    onSubmit,
    buttonLabel,
    buttonType = "button",
    onButtonClick,
}) {
    return (
        <div className="h-screen flex items-center justify-center bg-midnight">
            <div className="w-[360px] bg-midnight-surface border border-midnight-border rounded-xl p-6">
                <h1 className="text-xl text-accent-purple font-semibold mb-6">
                    {title}
                </h1>

                <form onSubmit={onSubmit}>
                    {children}

                    <button
                        type={buttonType}
                        onClick={onButtonClick}
                        className="w-full bg-accent-purple py-2 rounded-lg text-white"
                    >
                        {buttonLabel}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-white/60">
                    {footer}
                </p>
            </div>
        </div>
    );
}
