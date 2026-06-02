# DDS — 작업 방향 (이 repo 의 정체성)

이 repo(`daiso-admin`)는 **DDS(Daiso Design System) + 페이지 조립 검증 저장소**다. 역할을 둘로 분리한다.
- **`design-system/`** — `@daiso/design-system`(Vue 2.7 컴포넌트 **라이브러리**).
- **`daiso-test/`** — Nuxt2/Vue2 **페이지 조립·검증 테스트 앱**(개발자 전달용 프로토타입). 라이브러리를 import 해 페이지 단위로 조립·검증한다.

디자인 원천은 **Figma**, 운영 토큰 SoT 는 `design-system/src/styles/dds-tokens.css` 다.

## 최종 타깃 (2개)

1. **`@daiso/design-system`** — Vue 2.7 컴포넌트 라이브러리 (`design-system/`)
   - `Da{Name}.vue` / 루트 클래스 `da-{name}`
   - JavaScript(Options API) · scoped SCSS · BEM · `var(--dds-*)` 토큰
   - **Tailwind / TypeScript / React 금지**
2. **`daiso-test`** — Nuxt2/Vue2 페이지 조립·검증 테스트 앱 (`daiso-test/`). design-system 을 import 해 페이지 단위로 조립·검증하는 개발자 전달용 프로토타입.

## 현재 스코프

**`@daiso/design-system` 컴포넌트 구축 완료.** 현재는 `daiso-test` 에서 `Da*` 조립·페이지 검증 단계.
첫 구현 대상: 마이페이지 > 리뷰 화면.

## 기준 문서

- **DESIGN.md** — DDS 운영의 단일 SoT (디자인 원칙·토큰 값·Token Mapping·컴포넌트 사용·SCSS/BEM·QA)
- **.claude/skills/dds-component/SKILL.md** — Figma 기준 DDS 컴포넌트 생성·유지보수 스킬

## 네이밍

- design-system 컴포넌트: `Da*` / `da-*` (`design-system/`)
