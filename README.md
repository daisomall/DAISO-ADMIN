# daiso-admin — DDS (Daiso Design System)

**다이소몰의 디자인 시스템을 만들고, 페이지로 조립해 검증하는 저장소.**

- **`design-system/`** — `@daiso/design-system`. Vue 2.7 컴포넌트 라이브러리(`Da*`).
- **`daiso-test/`** — 라이브러리를 import 해 페이지 단위로 조립·검증하는 Nuxt2 프로토타입.

## 기술 스택

- **design-system** — Vue 2.7 · Options API · 순수 JS(TypeScript 미사용) · scoped SCSS · BEM.
- **daiso-test** — Nuxt 2 (webpack4).

## Documentation Flow

문서는 아래 순서로 읽는다. 위에서 아래로 갈수록 추상(무엇을·왜) → 구체(어떻게)로 좁혀진다.

```
README.md    ← 여기. 프로젝트 소개·구조·실행
   ↓
CLAUDE.md    AI 작업 규칙 (우선순위 · 문서 지도 · Workflow)
   ↓
DESIGN.md    Design Specification — 공식 SoT (무엇을 · 왜)
   ↓
SKILL.md     Implementation Procedure — 구현 절차 (어떻게)
```

- **[CLAUDE.md](CLAUDE.md)** — AI 작업 규칙.
- **[DESIGN.md](DESIGN.md)** — 디자인·구현의 단일 기준(Source of Truth).
- **[.claude/skills/dds-component/SKILL.md](.claude/skills/dds-component/SKILL.md)** — 컴포넌트 생성·유지보수 절차.

## 구조

```
design-system/   @daiso/design-system 라이브러리
  src/foundation/tokens/       토큰 (색 var(--color-*)·간격 var(--spacing-*)·타이포 @include typo-*)
  src/components/Da*.vue
daiso-test/      페이지 조립·검증 앱 (pages/mypage/review …)
```

## 실행

```bash
# 컴포넌트 쇼룸
cd design-system && npm install && npm run dev      # http://localhost:5180

# 페이지 조립·검증 (Nuxt2)
cd daiso-test && npm install
NODE_OPTIONS=--openssl-legacy-provider npm run dev
```

> Node 24 + Nuxt2(webpack4) 조합에서는 `--openssl-legacy-provider` 플래그가 필요하다.

## 소비 앱 연동 · 토큰 빌드

라이브러리를 소비하는 앱(daiso-test 등)에서의 운영 설정.

- **토큰 빌드 체인**: 토큰 SoT 는 `src/foundation/tokens/_*.scss`(color/typography/spacing/reset, 별도 `.css` 토큰 파일 없음). 색/간격 SCSS 가 `:root { --color-*: … }` 출력 → `src/foundation/styles.scss` 취합 → `src/index.js` import → 빌드 시 `dist/style.css`. 타이포 믹스인은 `:root` 출력이 아니라 컴포넌트가 `@use '../../foundation/tokens/typography' as *;` 로 직접 사용.
- **전역 토큰 로드(선행·0순위)**: 소비 앱이 `@daiso/design-system/style.css` 를 전역 1회 로드. 미로드 시 전 컴포넌트 unstyled.
- **소비**: named import 후 로컬 등록(`components: { DaChip }`). Nuxt `build.transpile` 에 `@daiso/design-system` 포함.
- **SSR 안전성**: `window`/`document` 접근은 `mounted()` 이후. 리스너는 `mounted` 등록 / `beforeDestroy` 해제.
- **폰트**: 라이브러리는 family+fallback 만 정의, `@font-face` 는 host 앱 제공.
