import { formatMessageTime, isImageOnlyMessage } from "../../utils/chatHelpers";

export default function MessageBubble({ message, onOpenThread }) {
    const isSelf = message.isSelf;
    const imageOnly = isImageOnlyMessage(message);
    const hasImage = Boolean(message.image);
    const hasText = Boolean(message.text);

    return (
        <div className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] cursor-pointer rounded-[24px] border border-white/8 transition hover:border-white/20 ${
                    hasImage ? "p-2" : "px-4 py-4"
                }`}
                onClick={() => onOpenThread?.(message)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpenThread?.(message);
                    }
                }}
                role="button"
                tabIndex={0}
                style={{
                    backgroundColor: imageOnly
                        ? "transparent"
                        : isSelf
                            ? "#6C5CE7"
                            : "#1A1A1A",
                    boxShadow: imageOnly
                        ? "none"
                        : "0 12px 30px rgba(0, 0, 0, 0.18)",
                }}
            >
                <div className="mb-3 flex items-start gap-3">
                    <div className="gradient-card flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
                        {message.user.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-lg font-semibold text-white">{message.user}</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-white/38">
                                    {isSelf ? "You" : "Participant"}
                                </p>
                            </div>
                            <p className="text-[11px] text-white/46">
                                {formatMessageTime(message.time)}
                            </p>
                        </div>
                    </div>
                </div>

                {message.replyTo ? (
                    <div className="mb-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-sm">
                        <p className="text-xs uppercase tracking-[0.14em] text-white/48">
                            Replying to {message.replyTo.user}
                        </p>
                        <p className="mt-1 truncate text-white/78">
                            {message.replyTo.text || "Shared an attachment"}
                        </p>
                    </div>
                ) : null}

                {hasImage ? (
                    <img
                        src={message.image}
                        alt="Sent attachment"
                        className="max-h-80 w-full rounded-xl object-cover"
                    />
                ) : null}

                {hasText ? (
                    <p className={`${hasImage ? "mt-3" : ""} text-sm leading-7 text-white`}>
                        {message.text}
                    </p>
                ) : null}
            </div>
        </div>
    );
}
