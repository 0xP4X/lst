import ThreadTree from "../components/thread/ThreadTree";

const threadData = [
    {
        id: 1,
        user: "Kojo",
        text: "This is the main thread message.",
        replies: [
            {
                id: 2,
                user: "Ama",
                text: "This is a first-level reply.",
                replies: [
                    {
                        id: 3,
                        user: "Yaw",
                        text: "This is a second-level reply.",
                        replies: [
                            {
                                id: 4,
                                user: "Esi",
                                text: "This is a third-level reply.",
                                replies: [
                                    {
                                        id: 5,
                                        user: "Kofi",
                                        text: "This is a fourth-level reply.",
                                        replies: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 6,
                user: "Abena",
                text: "Another first-level reply.",
                replies: [],
            },
        ],
    },
];

export default function MiniThreadScreen() {
    return (
        <div className="min-h-screen bg-midnight text-white p-6">
            <h1 className="text-xl font-semibold text-accent-purple mb-6">
                Mini Thread Screen
            </h1>

            <ThreadTree nodes={threadData} />
        </div>
    );
}