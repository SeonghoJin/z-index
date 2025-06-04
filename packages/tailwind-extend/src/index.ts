import { createZindex, ZIndexNode, ZIndexOptions } from '@z-index/core';


/**
 * Tailwind CSS의 extend에 z-index 값을 추가하는 함수
 * @example
 * ```js
 * // tailwind.config.js
 * import { extendZIndex } from '@z-index/tailwind-extend';
 * 
 * export default {
 *   theme: {
 *     extend: {
 *       zIndex: extendZIndex({
 *         config: [
 *           {
 *             name: 'modal',
 *             children: [
 *               { name: 'hi' },
 *               { name: 'as' }
 *             ]
 *           }
 *         ],
 *         base: 1000
 *       })
 *     }
 *   }
 * }
 * ```
 */
export function extendZIndex(options: { config: readonly ZIndexNode[], base?: number }): Record<string, string> {
    const zIndexValues = createZindex(options.config, { base: options.base });

    function flatten(obj: any, prefix = ''): Record<string, string> {
        let res: Record<string, string> = {};
        for (const key in obj) {
            if (key === 'index') continue;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const className = prefix ? `${prefix}-${key}` : key;
                if ('index' in obj[key]) {
                    res[className] = String(obj[key].index);
                }
                const children = { ...obj[key] };
                delete children.index;
                Object.assign(res, flatten(children, className));
            }
        }
        return res;
    }

    return flatten(zIndexValues);
} 