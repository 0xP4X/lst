import { useMemo, useState } from "react";
import ThreadTree from "./ThreadTree";
import {
    countReplies,
    createThreadRoot,
    findThreadNode,
} from "../../utils/threadHelpers";

export default function MiniThreadPanel({
    message,
    thread,
    onClose,
    onAddReply,
}) {
    const [replyText, setReplyText] = useState("");
    const [selectedNodeId, setSelectedNodeId] = useState(message?.id ?? null);

    const threadData = useMemo(() => {
        if (!message) {
            return [];
        }

        return thread?.length ? thread : [createThreadRoot(message)];
    }, [message, thread]);

    const totalReplies = useMemo(
        () => countReplies(threadData?.[0]?.replies || []),
        [threadData]
    );

    const selectedNode = useMemo(
        () =>
            findThreadNode(threadData, selectedNodeId) || threadData?.[0] || null,
        [selectedNodeId, threadData]
    );

    if (!message) return null;

    const handleSubmit = (event) => {
        event.preventDefault();

        const value = replyText.trim();
        if (!value || !selectedNode) return;

        onAddReply?.({
            rootMessageId: message.id,
            parentId: selectedNode.id,
            text: value,
        });
        setReplyText("");
    };

    return (
        <>
            <button
                type="button"
                onClick={onClose}
                aria-label="Close mini thread"
                className="fixed inset-0 z-30 bg-black/40 xl:hidden"
            />

            <div className="fixed right-0 top-0 z-40 flex h-full w-full max-w-[380px] flex-col border-l border-midnight-border bg-midnight shadow-[-24px_0_60px_rgba(0,0,0,0.35)] xl:static xl:z-auto xl:shadow-none">
            <div className="flex h-16 items-center justify-between border-b border-midnight-border px-4">
                <div>
                    <h2 className="text-md font-semibold text-accent-purple">
                        Mini Thread
                    </h2>
                    <p className="text-xs text-white/40">
                        {totalReplies} repl{totalReplies === 1 ? "y" : "ies"}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="rounded-md bg-midnight px-3 py-1 text-sm"
                >
                    Close
                </button>
            </div>

            <div className="border-b border-midnight-border px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                    Replying in thread
                </p>
                <p className="mt-2 text-sm text-gray-300">{message.user}</p>
                <p className="mt-1 line-clamp-3 text-sm text-white/70">
                    {message.text || "Shared an attachment"}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <ThreadTree
                    nodes={threadData}
                    selectedNodeId={selectedNodeId}
                    onSelectNode={(node) => setSelectedNodeId(node.id)}
                />
            </div>

            <div className="border-t border-midnight-border p-4">
                <div className="mb-3 rounded-lg border border-midnight-border bg-midnight-surface px-3 py-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                        Reply target
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                        {selectedNode?.user || message.user}
                    </p>
                    <p className="mt-1 truncate text-sm text-white/60">
                        {selectedNode?.text || "Shared an attachment"}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <textarea
                        value={replyText}
                        onChange={(event) => setReplyText(event.target.value)}
                        placeholder="Write a thread reply..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-midnight-border bg-midnight-surface px-3 py-2 text-sm text-white outline-none"
                    />

                    <button
                        type="submit"
                        className="mt-3 w-full rounded-lg bg-accent-purple py-2 text-white"
                    >
                        Send Reply
                    </button>
                </form>
            </div>
            </div>
        </>
    );
}
