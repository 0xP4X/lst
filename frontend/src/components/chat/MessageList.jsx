import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, onOpenThread }) {
    const parentRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: messages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 120,
        overscan: 8,
    });

    useEffect(() => {
        const el = parentRef.current;
        if (!el) return;

        const isNearBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < 120;

        if (isNearBottom) {
            requestAnimationFrame(() => {
                el.scrollTop = el.scrollHeight;
            });
        }
    }, [messages]);

    return (
        <div
            ref={parentRef}
            className="flex-1 overflow-y-auto px-6 py-4"
        >
            <div
                className="relative w-full"
                style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const message = messages[virtualRow.index];

                    return (
                        <div
                            key={message.id}
                            ref={rowVirtualizer.measureElement}
                            data-index={virtualRow.index}
                            className="absolute left-0 top-0 w-full"
                            style={{
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            <div className="pb-3">
                                <MessageItem
                                    message={message}
                                    onOpenThread={onOpenThread}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}