export async function fetchMessages() {
    return [
        {
            id: 1,
            user: "Kojo",
            text: "How will you rate the course structure after the semester wraps up?",
            isSelf: false,
            time: Date.now() - 600000,
        },
        {
            id: 2,
            user: "Ama",
            text: "The discussions helped more than the assignments, especially when people challenged each other respectfully.",
            isSelf: false,
            time: Date.now() - 420000,
            replyTo: {
                user: "Kojo",
                text: "How will you rate the course structure after the semester wraps up?",
            },
        },
        {
            id: 3,
            user: "Christ",
            text: "The live examples worked well for me, but I would have liked a little more time for feedback on the major tasks.",
            isSelf: false,
            time: Date.now() - 180000,
        },
    ];
}

export async function sendMessage(messagePayload) {
    return {
        success: true,
        data: {
            ...messagePayload,
            pending: false,
            failed: false,
        },
    };
}
