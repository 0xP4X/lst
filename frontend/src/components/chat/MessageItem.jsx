import MessageBubble from "./MessageBubble";

export default function MessageItem({ message, onOpenThread }) {
    return (
        <MessageBubble message={message} onOpenThread={onOpenThread} />
    );
}
