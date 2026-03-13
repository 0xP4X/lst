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
        <div className="app-shell min-h-screen px-4 py-6 text-white sm:px-6">
            <div className="glass-panel screen-noise mx-auto max-w-4xl rounded-[28px] p-6">
                <h1 className="mb-6 text-xl font-semibold text-accent-purple">
                Mini Thread Screen
                </h1>

                <ThreadTree nodes={threadData} />
            </div>
        </div>
    );
}
