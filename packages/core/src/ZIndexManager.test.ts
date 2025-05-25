import { createZindex } from './ZIndexManager';

describe('createZindex', () => {
    it('should create z-index values with base value', () => {
        const z = createZindex([
            { name: 'a', relative: 1 },
            { name: 'b', relative: 2 },
            { name: 'c', relative: 3 },
            { name: 'd', dangerouslyFixedIndex: -1 }
        ] as const, { base: 50 });

        expect(z.a.index).toBe(51);
        expect(z.b.index).toBe(52);
        expect(z.c.index).toBe(53);
        expect(z.d.index).toBe(-1);

        // 타입 체크
        const _a: number = z.a.index;
        const _b: number = z.b.index;
        const _c: number = z.c.index;
        const _d: number = z.d.index;
    });

    it('should handle nested children', () => {
        const z = createZindex([
            {
                name: 'a',
                children: [{ name: 'b' }, { name: 'ee' }]
            },
            { name: 'c', relative: 2, children: [{ name: 'd' }] },
            { name: 'd', dangerouslyFixedIndex: -1, children: [{ name: 'f' }] }
        ] as const, { base: 50 });
        expect(z.a.index).toBe(50);
        expect(z.a.b.index).toBe(51);
        expect(z.c.index).toBe(52);
        expect(z.d.index).toBe(-1);

        // 타입 체크
        const _a: number = z.a.index;
        const _ab: number = z.a.b.index;
        const _c: number = z.c.index;
        const _d: number = z.d.index;

        // 중첩된 구조의 타입 체크
        type A = typeof z.a;
        type AB = typeof z.a.b;
        type C = typeof z.c;
        type D = typeof z.d;
    });

    it('should throw error when using "index" as node name', () => {
        expect(() => {
            createZindex([
                {
                    name: 'index',
                    children: [{ name: 'b' }]
                }
            ] as const, { base: 50 });
        }).toThrow('Node name cannot be "index"');
    });

    it('should throw error when using duplicate node names', () => {
        expect(() => {
            createZindex([
                {
                    name: 'a',
                    children: [{ name: 'b' }]
                },
                {
                    name: 'a',
                    children: [{ name: 'c' }]
                }
            ] as const, { base: 50 });
        }).toThrow('Duplicate node name: a');
    });

    it('should handle deeply nested children', () => {
        const z = createZindex([
            {
                name: 'a',
                children: [{
                    name: 'b',
                    children: [{ name: 'c' }]
                }]
            }, { name: 'c', children: [{ name: 'e' }] }
        ] as const, { base: 50 });
        expect(z.a.index).toBe(50);
        expect(z.a.b.index).toBe(51);
        expect(z.a.b.c.index).toBe(52);
    });
}); 