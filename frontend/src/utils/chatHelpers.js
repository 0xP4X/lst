export function formatMessageTime(time) {
    return new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function createMessage({
    user,
    text = "",
    isSelf = false,
    image = null,
    replyTo = null,
}) {
    const timestamp = Date.now();
    return {
        id: timestamp + Math.random(),
        clientId: `msg-${timestamp}-${Math.round(Math.random() * 1_000_000)}`,
        user,
        text,
        isSelf,
        image,
        replyTo,
        time: timestamp,
    };
}

export function isImageOnlyMessage(message) {
    return Boolean(message.image && !message.text);
}
