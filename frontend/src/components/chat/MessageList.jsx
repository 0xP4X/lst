import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, onOpenThread }) {
    const parentRef = useRef(null);
    const shouldStickToBottomRef = useRef(true);

    const rowVirtualizer = useVirtualizer({
        count: messages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 148,
        overscan: 8,
    });

    useEffect(() => {
        const el = parentRef.current;
        if (!el) return;

        if (shouldStickToBottomRef.current) {
            requestAnimationFrame(() => {
                rowVirtualizer.scrollToIndex(messages.length - 1, {
                    align: "end",
                });
            });
        }
    }, [messages, rowVirtualizer]);

    const handleScroll = () => {
        const el = parentRef.current;
        if (!el) return;

        shouldStickToBottomRef.current =
            el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    };

    return (
        <div
            ref={parentRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-4 sm:px-6"
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
                            <div className="pb-4">
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
