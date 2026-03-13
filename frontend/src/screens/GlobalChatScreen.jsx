import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import MiniThreadPanel from "../components/thread/MiniThreadPanel";
import {
    connectSocket,
    disconnectSocket,
    emitNewMessage,
} from "../services/socketService";
import { fetchMessages, sendMessage } from "../services/messageService";
import { createMessage } from "../utils/chatHelpers";
import { addReplyToThread, createThreadRoot } from "../utils/threadHelpers";
import logoBanner from "../assets/lets-talk-banner-speech-bubble-with-lets-talk-text-business-concept-3d-illustration-spiral-background-vector-line-icon-business_727385-3416.jpg";
import searchImage from "../assets/search.png";

export default function GlobalChatScreen() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [selectedThreadMessage, setSelectedThreadMessage] = useState(null);
    const [threadsByMessageId, setThreadsByMessageId] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const currentUser = localStorage.getItem("user") || "You";

    const upsertMessage = (incomingMessage) => {
        setMessages((prev) => {
            const optimisticIndex = prev.findIndex(
                (message) =>
                    (incomingMessage.clientId &&
                        message.clientId === incomingMessage.clientId) ||
                    message.id === incomingMessage.id
            );

            if (optimisticIndex >= 0) {
                const next = [...prev];
                next[optimisticIndex] = {
                    ...next[optimisticIndex],
                    ...incomingMessage,
                    pending: false,
                };
                return next;
            }

            return [...prev, incomingMessage];
        });
    };

    useEffect(() => {
        async function loadMessages() {
            try {
                setMessages(await fetchMessages());
            } catch (error) {
                console.error("Failed to load messages:", error);
            }
        }

        loadMessages();

        const socket = connectSocket();
        const handleIncomingMessage = (incomingMessage) => {
            upsertMessage(incomingMessage);
        };

        socket.on("message", handleIncomingMessage);
        socket.on("new-message", handleIncomingMessage);

        return () => {
            socket.off("message", handleIncomingMessage);
            socket.off("new-message", handleIncomingMessage);
            disconnectSocket();
        };
    }, []);

    const openThread = (message) => {
        setSelectedThreadMessage(message);
        setThreadsByMessageId((prev) => ({
            ...prev,
            [message.id]: prev[message.id] || [createThreadRoot(message)],
        }));
    };

    const handleSendMessage = async ({ text, image }) => {
        const newMessage = createMessage({
            user: currentUser,
            text,
            image: image?.previewUrl || null,
            isSelf: true,
        });

        setMessages((prev) => [...prev, { ...newMessage, pending: true }]);
        emitNewMessage(newMessage);

        try {
            const response = await sendMessage(newMessage);
            if (response?.data) {
                upsertMessage({
                    ...response.data,
                    clientId: newMessage.clientId,
                });
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            setMessages((prev) =>
                prev.map((message) =>
                    message.id === newMessage.id
                        ? { ...message, pending: false, failed: true }
                        : message
                )
            );
        }
    };

    const handleAddThreadReply = ({ rootMessageId, parentId, text }) => {
        const reply = createMessage({ user: currentUser, text, isSelf: true });
        setThreadsByMessageId((prev) => ({
            ...prev,
            [rootMessageId]: addReplyToThread(prev[rootMessageId] || [], parentId, {
                ...reply,
                replies: [],
            }),
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    const visibleMessages = messages.filter((message) => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        if (!normalizedSearch) {
            return true;
        }

        const replyText = message.replyTo?.text || "";
        return [message.user, message.text, replyText]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedSearch));
    });

    return (
        <div className="app-shell min-h-screen text-white">
            <div className="mx-auto flex min-h-screen w-full max-w-[1500px] gap-0 px-3 py-3 sm:px-5 lg:px-6">
                <div className="flex min-w-0 flex-1 flex-col">
                    <header className="glass-soft mb-4 flex h-[78px] items-center justify-between rounded-[28px] px-4 sm:px-6">
                        <div className="flex min-w-0 items-center gap-4">
                            <img
                                src={logoBanner}
                                alt="Let's Talk logo"
                                className="h-12 w-12 rounded-2xl object-cover"
                            />
                            <div className="min-w-0">
                                <p className="text-xs uppercase tracking-[0.28em] text-white/48">
                                    Today&apos;s topic
                                </p>
                                <div className="mt-1 flex items-center gap-3">
                                    <h1 className="truncate text-xl font-semibold italic sm:text-2xl">
                                        Global Chat
                                    </h1>
                                    <span className="lime-glow rounded-full bg-[#21492d] px-3 py-1 text-xs font-semibold text-[#7df06a]">
                                        live
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden items-center gap-3 md:flex">
                            <button
                                onClick={handleLogout}
                                className="rounded-2xl bg-[#3d2026] px-4 py-2 text-sm font-semibold text-[#ff9bac]"
                            >
                                Logout
                            </button>
                        </div>
                    </header>

                    <div className="min-h-0 flex-1">
                        <section className="glass-panel screen-noise flex min-h-0 flex-col overflow-hidden rounded-[28px]">
                        <div className="grid gap-4 border-b border-white/10 p-4 lg:grid-cols-[minmax(0,1fr)_164px] lg:p-6">
                            <div>
                                <h2 className="max-w-4xl text-3xl font-semibold leading-tight sm:text-[2.15rem]">
                                    How will you rate Dr. Linder at the end of the semester
                                </h2>
                                <p className="mt-2 max-w-4xl text-sm italic text-white/72 sm:text-base">
                                    Drop your honest take. Share an experience, a story or a perspective.
                                </p>
                                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/72">
                                    <span className="lime-glow rounded-full bg-[#21492d] px-3 py-2 text-[#7df06a]">
                                        24:14:08 left
                                    </span>
                                    <span>3.8K opinions</span>
                                    <span>6.8K participants</span>
                                </div>
                            </div>

                            <img
                                src={logoBanner}
                                alt="Let's Talk topic art"
                                className="h-40 w-full rounded-[24px] object-cover"
                            />
                        </div>

                        <div className="border-b border-white/10 p-4">
                            <div className="flex flex-wrap gap-2">
                                <label className="min-w-[220px] flex-1 rounded-full bg-[#163742] px-4 py-2 text-sm text-white/45">
                                    <div className="flex items-center gap-3">
                                        <img src={searchImage} alt="" className="h-4 w-4 object-contain" />
                                        <input
                                            value={searchTerm}
                                            onChange={(event) => setSearchTerm(event.target.value)}
                                            placeholder="Search messages or people"
                                            className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className="mt-4 rounded-2xl bg-[#173843] px-4 py-3 text-sm leading-6 text-white/72">
                                Welcome to Let&apos;s Talk. Every topic runs for 27 hours. Replies are public, threaded, and reportable.
                            </div>
                        </div>

                        <MessageList
                            messages={visibleMessages}
                            onOpenThread={openThread}
                        />
                        <MessageInput onSend={handleSendMessage} />
                        </section>
                    </div>
                </div>

                <MiniThreadPanel
                    key={selectedThreadMessage?.id || "thread-panel"}
                    message={selectedThreadMessage}
                    thread={selectedThreadMessage ? threadsByMessageId[selectedThreadMessage.id] : null}
                    onAddReply={handleAddThreadReply}
                    onClose={() => setSelectedThreadMessage(null)}
                />
            </div>
        </div>
    );
}
