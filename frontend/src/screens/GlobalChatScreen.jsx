import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import MiniThreadPanel from "../components/thread/MiniThreadPanel";
import { connectSocket, disconnectSocket } from "../services/socketService";
import { createMessage } from "../utils/chatHelpers";
import { fetchMessages, sendMessage } from "../services/messageService";
import {
    addReplyToThread,
    createThreadRoot,
} from "../utils/threadHelpers";

export default function GlobalChatScreen() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [selectedThreadMessage, setSelectedThreadMessage] = useState(null);
    const [threadsByMessageId, setThreadsByMessageId] = useState({});

    useEffect(() => {
        async function loadMessages() {
            try {
                const initialMessages = await fetchMessages();
                setMessages(initialMessages);
            } catch (error) {
                console.error("Failed to load messages:", error);
            }
        }

        loadMessages();

        const socket = connectSocket();

        socket.on("connect", () => {
            console.log("Connected to socket server:", socket.id);
        });

        socket.on("connect_error", (error) => {
            console.error("Socket connection failed:", error.message);
        });

        socket.on("message", (incomingMessage) => {
            setMessages((prev) => [...prev, incomingMessage]);
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
            socket.off("message");
            disconnectSocket();
        };
    }, []);

    const openThread = (message) => {
        setSelectedThreadMessage(message);
        setThreadsByMessageId((prev) => {
            if (prev[message.id]) {
                return prev;
            }

            return {
                ...prev,
                [message.id]: [createThreadRoot(message)],
            };
        });
    };

    const handleSendMessage = async ({ text, image }) => {
        const newMessage = createMessage({
            user: "You",
            text,
            image: image?.previewUrl || null,
            isSelf: true,
        });

        setMessages((prev) => [...prev, newMessage]);

        try {
            await sendMessage(newMessage);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const simulateIncomingMessage = () => {
        const incomingMessage = createMessage({
            user: "System Test",
            text: "This is a simulated incoming message.",
            isSelf: false,
        });

        setMessages((prev) => [...prev, incomingMessage]);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    const handleAddThreadReply = ({ rootMessageId, parentId, text }) => {
        const reply = createMessage({
            user: "You",
            text,
            isSelf: true,
            replyTo: {
                user: selectedThreadMessage?.user || "Unknown",
                text: selectedThreadMessage?.text || "",
            },
        });

        setThreadsByMessageId((prev) => {
            const existingThread = prev[rootMessageId] || [];

            return {
                ...prev,
                [rootMessageId]: addReplyToThread(existingThread, parentId, {
                    ...reply,
                    replies: [],
                }),
            };
        });
    };

    return (
        <div className="h-screen flex bg-midnight text-white">
            <div className="flex-1 flex flex-col">
                <div className="h-16 flex items-center justify-between px-6 border-b border-midnight-border">
                    <h1 className="text-lg font-semibold text-accent-purple">
                        Global Chat
                    </h1>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={simulateIncomingMessage}
                            className="bg-midnight-surface border border-midnight-border px-3 py-2 rounded-lg text-sm"
                        >
                            Simulate Incoming
                        </button>

                        <button
                            onClick={handleLogout}
                            className="bg-midnight-surface border border-midnight-border px-3 py-2 rounded-lg text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <MessageList
                    messages={messages}
                    onOpenThread={openThread}
                />

                <MessageInput onSend={handleSendMessage} />
            </div>

            <MiniThreadPanel
                message={selectedThreadMessage}
                thread={
                    selectedThreadMessage
                        ? threadsByMessageId[selectedThreadMessage.id]
                        : null
                }
                onAddReply={handleAddThreadReply}
                onClose={() => setSelectedThreadMessage(null)}
            />
        </div>
    );
}
