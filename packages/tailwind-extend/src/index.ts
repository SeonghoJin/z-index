export interface ZIndexConfigItem {
    name: string;
    children?: ZIndexConfigItem[];
}

export interface CreateZIndexOptions {
    config: ZIndexConfigItem[];
    base: number;
}

function buildZIndex(config: ZIndexConfigItem[], base: number, step = 1, result: Record<string, number> = {}, prefix = ''): Record<string, number> {
    config.forEach((item, idx) => {
        const key = prefix ? `${prefix}-${item.name}` : item.name;
        result[key] = base + idx * step;
        if (item.children) {
            buildZIndex(item.children, base + (idx + 1) * step * 10, step, result, key);
        }
    });
    return result;
}

export function createZIndex(options: CreateZIndexOptions): Record<string, number> {
    return buildZIndex(options.config, options.base);
} 