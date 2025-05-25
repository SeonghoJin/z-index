export interface ZIndexOptions {
    base?: number;
}

export interface ZIndexNode {
    name: string;
    relative?: number;
    dangerouslyFixedIndex?: number;
    children?: readonly ZIndexNode[];
}

type ZIndexNodeResult<T extends ZIndexNode> = {
    index: number;
} & (T extends { children: infer C extends readonly ZIndexNode[] }
    ? { [K in C[number]['name']]: ZIndexNodeResult<Extract<C[number], { name: K }>> }
    : {});

export type ZIndexResult<T extends readonly ZIndexNode[]> = {
    [K in T[number]['name']]: ZIndexNodeResult<Extract<T[number], { name: K }>>
};

export type InferZIndex<T extends readonly ZIndexNode[]> = ZIndexResult<T>;
