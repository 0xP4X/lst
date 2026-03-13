import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

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

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSend();
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const dataUrl = await readFileAsDataUrl(file);

        setSelectedImage({
            file,
            previewUrl: dataUrl,
            name: file.name,
            mimeType: file.type,
        });
    };

    const removeSelectedImage = () => {
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="sticky bottom-0 z-10 border-t border-white/10 bg-[linear-gradient(180deg,rgba(9,23,31,0),rgba(9,23,31,0.88)_18%,rgba(9,23,31,0.96)_100%)] px-4 pb-4 pt-3 sm:px-6">
            {showEmojiPicker ? (
                <div className="absolute bottom-[88px] left-4 z-20 overflow-hidden rounded-2xl border border-white/10 shadow-lg sm:left-6">
                    <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
            ) : null}

            {selectedImage ? (
                <div className="mb-3 rounded-[24px] border border-white/10 bg-[#10242d]/92 p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="truncate text-sm text-white/80">{selectedImage.name}</p>
                        <button
                            type="button"
                            onClick={removeSelectedImage}
                            className="text-sm text-red-300 hover:text-red-200"
                        >
                            Remove
                        </button>
                    </div>

                    <img
                        src={selectedImage.previewUrl}
                        alt="Preview"
                        className="max-h-40 rounded-xl object-cover"
                    />
                </div>
            ) : null}

            <div className="glass-soft flex h-14 items-center gap-2 rounded-full border border-white/10 px-3 shadow-lg">
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm text-white/70 hover:bg-white/10 hover:text-white"
                    title="Open emoji picker"
                >
                    :)
                </button>

                <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Share your take..."
                    className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
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
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5ce069,#3fa142)] text-white hover:opacity-90"
                    title="Send message"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}
