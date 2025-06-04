import { createZindex } from './ZIndexManager';

describe('createZindex', () => {
    it('should create z-index values with base value', () => {
        const z = createZindex([
            { name: 'a', relative: 1 },
            { name: 'b', relative: 2 },
            { name: 'c', relative: 3 },
            { name: 'd', dangerouslyFixedIndex: -1 }
        ] as const, { base: 50 });

        console.log(z);

        expect(z.a.index).toBe(51);
        expect(z.b.index).toBe(53);
        expect(z.c.index).toBe(56);
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
                children: [{ name: 'b', relative: 2 }, { name: 'ee' }, { name: 'fff', dangerouslyFixedIndex: -1 }]
            },
            { name: 'c', relative: 2, children: [{ name: 'd' }] },
            { name: 'd', dangerouslyFixedIndex: -1, children: [{ name: 'f' }] },
            { name: 'e', children: [{ name: 'f' }] },
            { name: 'f', children: [{ name: 'g' }] },
            { name: 'g', dangerouslyFixedIndex: 100 },
            {
                name: 'h', children: [{
                    name: 'i',
                    dangerouslyFixedIndex: 1000,
                }, {
                    name: 'j'
                }]
            }
        ] as const, { base: 50 });
        console.log(z);

        expect(z.a.index).toBe(51);
        expect(z.a.b.index).toBe(53);
        expect(z.a.ee.index).toBe(54);
        expect(z.a.fff.index).toBe(-1);

        expect(z.c.index).toBe(53);

        expect(z.d.index).toBe(-1);
        expect(z.d.f.index).toBe(0);

        expect(z.e.index).toBe(54);
        expect(z.e.f.index).toBe(55);

        expect(z.f.index).toBe(55);
        expect(z.f.g.index).toBe(56);

        expect(z.g.index).toBe(100);

        expect(z.h.index).toBe(56);
        expect(z.h.i.index).toBe(1000);
        expect(z.h.j.index).toBe(57);



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

    it('should handle nested children - 2', () => {
        const z = createZindex([{
            name: 'a',
            children: [{
                name: 'b',
                children: [{ name: 'c' }]
            }]
        }]);

        expect(z.a.index).toBe(1);
        expect(z.a.b.index).toBe(2);
        expect(z.a.b.c.index).toBe(3);
    })

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
        expect(z.a.index).toBe(51);
        expect(z.a.b.index).toBe(52);
        expect(z.a.b.c.index).toBe(53);
    });
}); 