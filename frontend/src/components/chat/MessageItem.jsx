import {
    formatMessageTime,
    isImageOnlyMessage,
} from "../../utils/chatHelpers";

export default function MessageItem({ message, onOpenThread }) {
    const isSelf = message.isSelf;
    const imageOnly = isImageOnlyMessage(message);
    const hasImage = Boolean(message.image);
    const hasText = Boolean(message.text);

    return (
        <div
            className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
            onClick={() => onOpenThread?.(message)}
        >
            <div
                className={`max-w-[85%] cursor-pointer rounded-xl transition hover:opacity-95 ${hasImage ? "p-1" : "px-3 py-2"
                    }`}
                style={{
                    backgroundColor: imageOnly
                        ? "transparent"
                        : isSelf
                            ? "#6C5CE7"
                            : "#1A1A1A",
                }}
            >
                {!isSelf && !hasImage && (
                    <p className="mb-1 text-xs text-gray-400">{message.user}</p>
                )}

                {message.replyTo && (
                    <div className="mb-2 rounded-lg border-l-2 border-white/30 bg-white/10 px-3 py-2 text-sm">
                        <p className="text-xs text-gray-300">{message.replyTo.user}</p>
                        <p className="truncate text-white/80">{message.replyTo.text}</p>
                    </div>
                )}

                {hasImage && (
                    <img
                        src={message.image}
                        alt="Sent attachment"
                        className="w-full rounded-xl object-cover max-h-80"
                    />
                )}

                {hasText && (
                    <p className={`${hasImage ? "mt-2" : ""} text-white`}>
                        {message.text}
                    </p>
                )}

                <p className="mt-1 text-[11px] text-white/50">
                    {formatMessageTime(message.time)}
                </p>
            </div>
        </div>
    );
}