export const MAX_THREAD_DEPTH = 4;
export const INDENT_PER_LEVEL = 24;

export function getIndentation(depth) {
    return Math.min(depth, MAX_THREAD_DEPTH) * INDENT_PER_LEVEL;
}

export function getConnectorOffset(depth) {
    return getIndentation(depth) - INDENT_PER_LEVEL / 2;
}

export function canRenderChildren(depth) {
    return depth < MAX_THREAD_DEPTH;
}

export function createThreadRoot(message) {
    return {
        id: message.id,
        user: message.user,
        text: message.text,
        image: message.image || null,
        time: message.time,
        isSelf: message.isSelf,
        replies: [],
    };
}

export function countReplies(nodes = []) {
    return nodes.reduce((total, node) => {
        const childReplies = countReplies(node.replies || []);
        return total + 1 + childReplies;
    }, 0);
}

export function findThreadNode(nodes = [], targetId) {
    for (const node of nodes) {
        if (node.id === targetId) {
            return node;
        }

        const childMatch = findThreadNode(node.replies || [], targetId);
        if (childMatch) {
            return childMatch;
        }
    }

    return null;
}

export function addReplyToThread(nodes = [], parentId, reply) {
    return nodes.map((node) => {
        if (node.id === parentId) {
            return {
                ...node,
                replies: [...(node.replies || []), reply],
            };
        }

        return {
            ...node,
            replies: addReplyToThread(node.replies || [], parentId, reply),
        };
    });
}
