# z-index

z-index 값을 체계적으로 관리하기 위한 TypeScript 패키지 모음입니다.

## 왜 만들었나요?

웹 애플리케이션을 개발할 때 z-index 값 관리가 어려운 문제를 해결하기 위해 만들었습니다.

### 기존의 문제점

1. **일관성 없는 z-index 값**

   - 개발자마다 다른 값을 사용
   - 임의의 큰 숫자 사용 (예: 9999, 10000)
   - 값의 의미를 알 수 없음

2. **유지보수의 어려움**

   - z-index 값이 여러 파일에 분산
   - 값 변경 시 모든 파일을 수정해야 함
   - 충돌 가능성 높음

3. **타입 안전성 부족**
   - 잘못된 값 사용 가능
   - 자동완성 지원 없음
   - 런타임 에러 발생 가능

### 해결 방법

1. **중앙 집중식 관리**

   - 모든 z-index 값을 한 곳에서 관리
   - 계층 구조로 명확한 관계 표현
   - 자동으로 값 할당

2. **타입 안전성**

   - TypeScript로 타입 체크
   - IDE 자동완성 지원
   - 컴파일 타임 에러 검출

3. **Tailwind CSS 통합**
   - Tailwind CSS와 완벽한 통합
   - 클래스 기반 사용
   - 기존 Tailwind 워크플로우 유지

## 패키지

### @z-index/core

z-index 값을 체계적으로 관리하기 위한 핵심 기능을 제공하는 패키지입니다.

```bash
pnpm add @z-index/core
```

```typescript
import { createZindex } from '@z-index/core';

const z = createZindex(
  [
    { name: 'a', relative: 1 },
    { name: 'b', relative: 2 },
    { name: 'c', relative: 3 },
    { name: 'd', dangerouslyFixedIndex: -1 },
  ] as const,
  { base: 50 }
);

console.log(z.a.index); // 51
console.log(z.b.index); // 53
console.log(z.c.index); // 56
console.log(z.d.index); // -1
```

[자세한 문서 보기](./packages/core/README.md)

### @z-index/tailwind-extend

Tailwind CSS에서 z-index 값을 체계적으로 관리할 수 있게 해주는 플러그인입니다.

```bash
pnpm add @z-index/tailwind-extend @z-index/core
```

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

## 개발

### 설치

```bash
pnpm install
```

### 빌드

```bash
pnpm build
```

### 테스트

```bash
pnpm test
```

## 라이선스

MIT
