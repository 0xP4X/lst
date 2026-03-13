import { formatMessageTime } from "../../utils/chatHelpers";
import { getIndentation } from "../../utils/threadHelpers";

export default function ThreadNode({
    node,
    depth,
    children,
    isSelected = false,
    onSelect,
}) {
    const indent = getIndentation(depth);
    const replyCount = node.replies?.length || 0;

    return (
        <div className="relative">
            {depth > 0 && (
                <>
                    <div
                        className="absolute"
                        style={{
                            left: indent - 12,
                            top: 0,
                            bottom: 24,
                            width: "2px",
                            backgroundColor: "#333333",
                        }}
                    />

                    <div
                        className="absolute"
                        style={{
                            left: indent - 12,
                            top: 24,
                            width: "12px",
                            height: "2px",
                            backgroundColor: "#333333",
                        }}
                    />
                </>
            )}

            <div
                className={`mb-3 rounded-xl border p-4 transition ${isSelected
                    ? "border-accent-purple bg-white/6"
                    : "border-midnight-border bg-midnight-surface"
                    } ${onSelect ? "cursor-pointer hover:border-white/25" : ""}`}
                style={{ marginLeft: indent }}
                onClick={() => onSelect?.(node)}
            >
                <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                        <p className="text-sm text-gray-300">{node.user}</p>
                        <p className="text-xs text-white/40">
                            {node.time ? formatMessageTime(node.time) : "Now"}
                        </p>
                    </div>

                    {replyCount > 0 && (
                        <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-white/50">
                            {replyCount} repl{replyCount === 1 ? "y" : "ies"}
                        </span>
                    )}
                </div>

                {node.image && (
                    <img
                        src={node.image}
                        alt="Thread attachment"
                        className="mb-3 max-h-56 w-full rounded-xl object-cover"
                    />
                )}

                {node.text ? (
                    <p className="text-sm leading-6 text-white">{node.text}</p>
                ) : (
                    <p className="text-sm italic text-white/45">
                        Shared an attachment
                    </p>
                )}
            </div>

            <div className="space-y-3">{children}</div>
        </div>
    );
}
