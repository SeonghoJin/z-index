import { ZIndexOptions, ZIndexNode, InferZIndex } from './types';

export function createZindex<T extends readonly ZIndexNode[]>(
    nodes: T,
    options: ZIndexOptions = {}
): InferZIndex<T> {
    const base = options.base ?? 0;
    const result = {} as any;
    const names = new Set<string>();

    nodes.forEach((node) => {
        if (node.name === 'index') {
            throw new Error('Node name cannot be "index"');
        }

        if (names.has(node.name)) {
            throw new Error(`Duplicate node name: ${node.name}`);
        }
        names.add(node.name);

        if (node.dangerouslyFixedIndex !== undefined) {
            result[node.name] = { index: node.dangerouslyFixedIndex };
            return;
        }

        const value = base + (node.relative ?? 0);
        const nodeResult = { index: value };

        if (node.children) {
            const children = createZindex(node.children, { base: value + 1 });
            Object.assign(nodeResult, children);
        }

        result[node.name] = nodeResult;
    });

    return result;
} 