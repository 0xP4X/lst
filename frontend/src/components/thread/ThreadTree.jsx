import ThreadNode from "./ThreadNode";
import { canRenderChildren } from "../../utils/threadHelpers";

export default function ThreadTree({
    nodes,
    depth = 0,
    ancestorHasNext = [],
    selectedNodeId = null,
    onSelectNode,
}) {
    if (!nodes || nodes.length === 0) return null;

    return (
        <>
            {nodes.map((node, index) => (
                <ThreadNode
                    key={node.id}
                    node={node}
                    depth={depth}
                    ancestorHasNext={ancestorHasNext}
                    isLast={index === nodes.length - 1}
                    isSelected={selectedNodeId === node.id}
                    onSelect={onSelectNode}
                >
                    {node.replies?.length > 0 && canRenderChildren(depth) && (
                        <ThreadTree
                            nodes={node.replies}
                            depth={depth + 1}
                            ancestorHasNext={[
                                ...ancestorHasNext,
                                index !== nodes.length - 1,
                            ]}
                            selectedNodeId={selectedNodeId}
                            onSelectNode={onSelectNode}
                        />
                    )}
                </ThreadNode>
            ))}
        </>
    );
}
