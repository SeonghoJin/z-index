# @z-index/tailwind-extend

Tailwind CSS에서 z-index 값을 체계적으로 관리할 수 있게 해주는 플러그인입니다.

## 장점

1. **Tailwind CSS 통합**

   - Tailwind의 기존 워크플로우 유지
   - 클래스 기반 사용으로 일관성 유지
   - 기존 Tailwind 설정과 완벽한 호환

2. **직관적인 클래스명**

   - 의미 있는 클래스명 사용 (예: `z-modal-overlay`)
   - HTML에서 바로 z-index 구조 파악 가능
   - 자동완성으로 쉽게 사용 가능

3. **유지보수 용이성**
   - 중앙에서 z-index 값 관리
   - 값 변경 시 자동으로 모든 곳에 적용
   - 충돌 가능성 최소화

## 설치

```bash
pnpm add @z-index/tailwind-extend @z-index/core
```

## 사용 방법

### Tailwind CSS v4 이상

Tailwind CSS v4부터는 CSS 파일에서 `@config` 지시문을 사용하여 설정을 로드해야 합니다.

```css
/* app.css */
@config "./tailwind.config.js";
```

```typescript
// tailwind.config.js
import { extendZIndex } from '@z-index/tailwind-extend';

const zIndexConfig = extendZIndex({
  config: [
    { name: 'modal', children: [{ name: 'backdrop' }, { name: 'content' }] },
    { name: 'tooltip' },
    { name: 'dropdown', dangerouslyFixedIndex: 1000 },
  ],
  base: 50,
});

export default {
  theme: {
    extend: {
      zIndex: zIndexConfig,
    },
  },
};
```

### Tailwind CSS v3 이하

```typescript
// tailwind.config.js
import { extendZIndex } from '@z-index/tailwind-extend';

const zIndexConfig = extendZIndex({
  config: [
    { name: 'modal', children: [{ name: 'backdrop' }, { name: 'content' }] },
    { name: 'tooltip' },
    { name: 'dropdown', dangerouslyFixedIndex: 1000 },
  ],
  base: 50,
});

export default {
  theme: {
    extend: {
      zIndex: zIndexConfig,
    },
  },
};
```

## 사용 예시

```html
<div class="z-modal">모달</div>
<div class="z-modal-backdrop">모달 배경</div>
<div class="z-tooltip">툴팁</div>
<div class="z-dropdown">드롭다운</div>
```

## API

### extendZIndex

```typescript
function extendZIndex(options: {
  config: ZIndexConfig[];
  base?: number;
}): Record<string, number>;
```

#### 옵션

- `config`: z-index 설정 배열
  - `name`: z-index 이름
  - `children`: 하위 z-index 설정 배열 (선택사항)
  - `dangerouslyFixedIndex`: 고정된 z-index 값 (선택사항)
- `base`: 기본 z-index 값 (기본값: 0)

## 의존성

- `@z-index/core`: 핵심 기능 제공
- `tailwindcss`: ^3.0.0

## 라이선스

MIT
