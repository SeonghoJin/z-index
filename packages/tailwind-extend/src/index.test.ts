import { extendZIndex } from './index';

describe('extendZIndex', () => {
    it('should create z-index values for Tailwind CSS', () => {
        const result = extendZIndex({
            config: [
                { name: 'modal', children: [{ name: 'backdrop' }, { name: 'content' }] },
                { name: 'tooltip' },
                { name: 'dropdown', dangerouslyFixedIndex: 1000 }
            ],
            base: 50
        });

        expect(result).toEqual({
            'modal': '51',
            'modal-backdrop': '52',
            'modal-content': '53',
            'tooltip': '52',
            'dropdown': '1000'
        });
    });

    it('should handle deeply nested z-index values', () => {
        const result = extendZIndex({
            config: [
                {
                    name: 'modal',
                    children: [
                        {
                            name: 'header',
                            children: [{ name: 'close' }]
                        }
                    ]
                }
            ],
            base: 1000
        });

        expect(result).toEqual({
            'modal': '1001',
            'modal-header': '1002',
            'modal-header-close': '1003'
        });
    });

    it('should handle fixed z-index values', () => {
        const result = extendZIndex({
            config: [
                { name: 'modal', dangerouslyFixedIndex: -1 },
                { name: 'tooltip', dangerouslyFixedIndex: 1000 }
            ]
        });

        expect(result).toEqual({
            'modal': '-1',
            'tooltip': '1000'
        });
    });
}); 