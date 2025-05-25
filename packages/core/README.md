# @z-index/core

z-index 값을 체계적으로 관리하기 위한 핵심 기능을 제공하는 패키지입니다.

## 장점

1. **계층적 구조**

   - 모달, 툴팁 등 UI 컴포넌트의 계층 구조를 명확하게 표현
   - 부모-자식 관계를 통한 직관적인 구조화
   - 자동으로 순차적인 z-index 값 할당

2. **타입 안전성**

   - TypeScript로 완벽한 타입 체크
   - IDE에서 자동완성 지원
   - 잘못된 값 사용 방지

3. **유연한 설정**
   - 기본값 커스터마이징 가능
   - 필요한 만큼 계층 추가 가능
   - 기존 z-index 값과의 충돌 방지

## 설치

```bash
npm install @z-index/core
```

## 사용 방법

```typescript
import { createZIndex } from '@z-index/core';

const zIndex = createZIndex({
  config: [
    {
      name: 'modal',
      children: [{ name: 'overlay' }, { name: 'content' }, { name: 'input' }],
    },
    { name: 'tooltip' },
  ],
  base: 1000,
});

// z-index 값 사용
console.log(zIndex.modal.overlay); // 1000
console.log(zIndex.modal.content); // 1001
console.log(zIndex.modal.input); // 1002
console.log(zIndex.tooltip); // 1003
```

## API

### createZIndex(options)

z-index 값을 생성하는 함수입니다.

#### 옵션

- `config`: z-index 구조를 정의하는 배열
  - `name`: z-index 이름
  - `children`: 하위 z-index 구조 (선택사항)
- `base`: 기본 z-index 값 (기본값: 0)

#### 반환값

생성된 z-index 객체를 반환합니다. 각 z-index 값은 자동으로 증가하는 숫자로 할당됩니다.

## 라이선스

MIT
