import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

function ImageIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M3.4 20.4L22 12 3.4 3.6 3.3 10l13.2 2-13.2 2z" />
        </svg>
    );
}

function EmojiIcon() {
    return <span className="text-lg leading-none">😊</span>;
}

export default function MessageInput({ onSend }) {
    const [input, setInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleSend = () => {
        if (!input.trim() && !selectedImage) return;

        onSend({
            text: input.trim(),
            image: selectedImage,
        });

        setInput("");
        setSelectedImage(null);
        setShowEmojiPicker(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleEmojiClick = (emojiData) => {
        setInput((prev) => prev + emojiData.emoji);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    const handleImageButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedImage({
            file,
            previewUrl: URL.createObjectURL(file),
            name: file.name,
        });
    };

    const removeSelectedImage = () => {
        if (selectedImage?.previewUrl) {
            URL.revokeObjectURL(selectedImage.previewUrl);
        }
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="relative px-4 pb-4 pt-3">
            {showEmojiPicker && (
                <div className="absolute bottom-[72px] left-4 z-20 overflow-hidden rounded-xl border border-midnight-border shadow-lg">
                    <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
            )}

            {selectedImage && (
                <div className="mb-3 rounded-xl border border-midnight-border bg-midnight-surface p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="truncate text-sm text-white/80">{selectedImage.name}</p>
                        <button
                            type="button"
                            onClick={removeSelectedImage}
                            className="text-sm text-red-400 hover:text-red-300"
                        >
                            Remove
                        </button>
                    </div>

                    <img
                        src={selectedImage.previewUrl}
                        alt="Preview"
                        className="max-h-40 rounded-lg object-cover"
                    />
                </div>
            )}

            <div className="flex h-14 items-center gap-2 rounded-2xl border border-midnight-border bg-midnight-surface px-3 shadow-lg">
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                >
                    <EmojiIcon />
                </button>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                />

                <button
                    type="button"
                    onClick={handleImageButtonClick}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                    title="Attach image"
                >
                    <ImageIcon />
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={handleSend}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple text-white hover:opacity-90"
                    title="Send message"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}