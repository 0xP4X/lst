import ThreadNode from "./ThreadNode";
import { canRenderChildren } from "../../utils/threadHelpers";

export default function ThreadTree({
    nodes,
    depth = 0,
    selectedNodeId = null,
    onSelectNode,
}) {
    if (!nodes || nodes.length === 0) return null;

    return (
        <>
            {nodes.map((node) => (
                <ThreadNode
                    key={node.id}
                    node={node}
                    depth={depth}
                    isSelected={selectedNodeId === node.id}
                    onSelect={onSelectNode}
                >
                    {node.replies?.length > 0 && canRenderChildren(depth) && (
                        <ThreadTree
                            nodes={node.replies}
                            depth={depth + 1}
                            selectedNodeId={selectedNodeId}
                            onSelectNode={onSelectNode}
                        />
                    )}
                </ThreadNode>
            ))}
        </>
    );
}
