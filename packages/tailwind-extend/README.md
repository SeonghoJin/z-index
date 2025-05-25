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
npm install @z-index/tailwind-extend @z-index/core
```

## 사용 방법

1. `tailwind.config.js` 파일에 플러그인을 추가합니다:

```javascript
import { createZIndex } from '@z-index/tailwind-extend';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: createZIndex({
        config: [
          {
            name: 'modal',
            children: [
              { name: 'overlay' },
              { name: 'content' },
              { name: 'input' },
            ],
          },
          { name: 'tooltip' },
        ],
        base: 1000,
      }),
    },
  },
  plugins: [],
};
```

2. Tailwind CSS 클래스에서 사용:

```html
<!-- 모달 오버레이 -->
<div class="z-modal-overlay">
  <!-- 모달 컨텐츠 -->
  <div class="z-modal-content">
    <!-- 모달 입력 필드 -->
    <input class="z-modal-input" />
  </div>
</div>

<!-- 툴팁 -->
<div class="z-tooltip">툴팁 내용</div>
```

## API

### createZIndex(options)

Tailwind CSS의 z-index 테마를 확장하는 함수입니다.

#### 옵션

- `config`: z-index 구조를 정의하는 배열
  - `name`: z-index 이름
  - `children`: 하위 z-index 구조 (선택사항)
- `base`: 기본 z-index 값 (기본값: 0)

#### 반환값

Tailwind CSS의 z-index 테마에 추가할 객체를 반환합니다.

## 의존성

- `@z-index/core`: 핵심 기능 제공
- `tailwindcss`: ^3.0.0

## 라이선스

MIT
