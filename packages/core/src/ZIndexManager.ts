import { ZIndexOptions, ZIndexNode, InferZIndex } from './types';


export function createZindex<T extends readonly ZIndexNode[]>(
    nodes: T,
    options: ZIndexOptions = {}
): InferZIndex<T> {
    const result = {} as any;
    const names = new Set<string>();
    let idx = undefined

    nodes.forEach((node) => {
        if (node.name === 'index') {
            throw new Error('Node name cannot be "index"');
        }

        if (names.has(node.name)) {
            throw new Error(`Duplicate node name: ${node.name}`);
        }
        names.add(node.name);

        const nodeResult: any = {};


        nodeResult.index = (() => {
            if (node.dangerouslyFixedIndex) {
                return node.dangerouslyFixedIndex;
            };

            if (idx === undefined) {
                return idx ??= (options.base ?? 0) + (node.relative ?? 1);
            }

            return (node.relative ?? 1) + idx;
        })();

        if (node.children) {
            Object.assign(nodeResult, createZindex(node.children, { base: nodeResult.index }));
        }
        result[node.name] = nodeResult;
        idx = node.dangerouslyFixedIndex ? idx : nodeResult.index;
    });

    return result;
} 