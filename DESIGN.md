# DDS — Daiso Design System

> **DDS 운영의 단일 Source of Truth(SoT).** 디자인 철학 · 토큰 · 컴포넌트 사용 · SCSS/BEM · QA 기준을 한 문서에 담는다.
> **운영 산출물**: `@daiso/design-system` — Vue 2.7 · Options API · 순수 JS · scoped SCSS · BEM. 컴포넌트 `Da{Name}.vue` / 루트 클래스 `da-{name}`.
> **토큰 모델**: 색/간격/radius/effect = 프로젝트가 확정한 **Code Variable namespace**를 `var()` 로 사용(SCSS 가 `:root` 로 출력), 타이포 = `@include typo-*` 믹스인. 실제 prefix 는 README·코드 기준(→ Token Mapping).
> **디자인 원천은 Figma.** 토큰·형태·색은 Figma 기준으로 정의하고, 바뀌면 토큰부터 갱신한다.
> **역할 경계**: DESIGN.md = 디자인 명세(무엇을·왜) · 구현 절차·AI 실행 = [SKILL.md](.claude/skills/dds-component/SKILL.md) · AI 작업 규칙 = [CLAUDE.md](CLAUDE.md) · 프로젝트 소개 = [README.md](README.md).

---

## TL;DR (핵심 Rule)

1. 상품이 UI보다 우선. UI가 상품보다 먼저 보이면 실패.
2. 가격은 가장 먼저 인지된다(크게·굵게·Daiso Font).
3. 정보 전달 > 심미. 사용자는 읽지 않고 훑는다.
4. Foundation(토큰) 우선. 임의 hex/px 금지.
5. 기존 Component 재사용 우선, 신규는 최후.
6. Variant는 디자인 리뷰 후에만.
7. 페이지 간 패턴 통일. 색은 위계 수단 아님.
8. Motion은 상태를 설명한다(장식 X).
9. Figma = Source of Truth. 구현보다 Figma 우선.
10. 320px에서도 레이아웃 유지.
11. 모르면 추측하지 않는다.

**판단 3질문:** ①상품이 먼저 보이는가 ②가격이 먼저 인지되는가 ③정보가 빠르게 읽히는가.

---

## 목차

> 위에서 아래로 읽는다. **작업 전 필독**만으로 대부분의 판단이 서고, 아래는 구현 중·후에 필요할 때 펼친다.

**① 작업 전 필독 (무엇을·왜)**
- **Design Foundation** — Overview · Design Principles · Brand Expression · Visual Language · Information Hierarchy · Scope
- **Foundation** — 토큰 기준값(SoT). Color · Typography · Spacing · Radius · Effect · Layout — 모두 Purpose·Structure·Reference 동일 구조
- **Token Mapping** — Figma/hex → `--color-*` / 타이포 믹스인 · 운영 토큰 전달
- **Component Architecture** — 레이어 · 네이밍 · 배치 결정
- **Component Usage** — 컴포넌트별 사용 기준 (언제 / Do / Don't) · Component Selection
- **Design Rules (AI 참조)** — Interaction · Accessibility · UI States · Naming · Good/Bad (구현 절차·판단 흐름은 SKILL.md)

**② 구현 중 참조 (어떻게 쓰는가)**
- **Development Rules** — props/이벤트 API · Vue2/Nuxt2 운영 기준
- **SCSS / BEM** — scoped SCSS 작성 규칙
- **Responsive** — breakpoint · 모바일 우선

**③ 완료·Appendix (필요 시)**
- **QA Checklist** — 완료 기준
- **Do / Don't** — 권장·금지
- **Known Gaps** *(Appendix)* — Design Gaps + Implementation Gaps (Status·Priority). 대부분 작업에서 읽지 않아도 됨.

---

# Design Foundation

> DDS 가 **무엇을, 왜, 어떤 태도로** 설계하는가. 화면과 컴포넌트가 "DDS 다운가"를 판단하는 1차 기준이다.

## Overview

DDS(Daiso Design System)는 다이소 모바일 커머스 전반에서 **일관되고 예측 가능한 사용자 경험**을 제공하기 위한 단일 디자인 언어다.

- **대상 경험** — 생활용품 중심의 대량·다품목 쇼핑. 사용자는 짧은 시간에 많은 상품을 훑고, 비교하고, 판단한다.
- **설계 태도** — 현대적이되 중립적. UI 자체가 주목받기보다 **상품과 정보가 주목받도록** 뒤로 물러난다.
- **적용 범위** — 모든 전문관(카테고리)이 동일한 컴포넌트·패턴·시각 규칙을 공유한다. 전문관마다 다른 룩앤필을 만들지 않는다. **핵심: 상품이 주인공, UI는 무대.**

## Design Principles

판단이 갈릴 때 아래 순서로 우선한다(충돌 시 **명확성·상품 우선 > 심미**).

1. **명확성 > 장식 (Clarity over decoration)** — 모든 요소는 정보 전달·행동 유도라는 목적이 있어야 한다. 목적 없는 장식은 넣지 않고, 의미가 같으면 더 단순한 쪽을 택한다.
2. **상품 우선 (Product-first)** — 화면의 시각적 무게중심은 상품 이미지·가격·핵심 정보다. UI 크롬은 무채색·저채도로 절제하고, 색은 의미(상태·강조·행동)가 있을 때만 더한다.
3. **구조적 명료함 (Structural clarity)** — 직선·직사각형·정렬된 그리드로 정보를 구획한다. 유기적·곡선적 형태는 지양한다.
4. **일관성 (Consistency)** — 같은 의미는 어디서나 같은 형태로 표현한다. 새 패턴을 만들기 전에 기존 컴포넌트로 해결되는지 먼저 확인한다.
5. **효율 (Efficiency)** — 다품목 탐색에 맞게 스캔·비교가 빠른 레이아웃을 우선한다.

## Brand Expression

**절제된 무채색 위의 선명한 레드 포인트.** 브랜드는 화려함이 아니라 명료함·일관성으로 전달된다(무채색이 대부분, 레드는 최소).

- **메인 톤은 무채색** — 블랙 / 네이비 / 그레이 계열이 화면 면적의 대부분을 차지한다.
- **다이소 레드는 포인트 전용** — 레드는 **주요 행동(CTA)·강조·브랜드 식별** 신호로만. 넓은 면 채움·장식 배경 금지.
- **레드의 일관성** — 색값(`#D70011`)과 쓰임은 전 전문관 동일하며 변경 불가.

## Visual Language

> 종합: **직선적이고 각진, 조용한 표면.**

- **형태 (Form)** — 사각형 기반. 라운드는 장식이 아니라 **요소 구분**을 위한 최소한으로.
- **아이콘 (Iconography)** — **직선 우선.** 면(fill)보다 선(stroke) 중심, 작은 크기에서도 또렷하게.
- **레이아웃 (Layout)** — 그리드와 정렬 기준. 여백으로 그룹핑, 경계·구분선으로 영역 분리.
- **타이포그래피 (Typography)** — 정보 위계를 명확히. 제목·본문·캡션 역할 구분.
- **색 (Color)** — 무채색 표면 + 의미 기반 색.
- **이미지·전시 (Imagery)** — 상품 이미지가 시각 중심. 배경·프레임은 중립적.

## Information Hierarchy

> 원칙: **상품 → 가격 → 정보 순으로 읽힌다.**

- **우선순위** — 상품 이미지 → 가격 → 상품명 → 혜택/배지 → 배송 → 리뷰/평점.
- **위계 수단** — 크기·면적 > 타이포 tier > 여백 > 위치. 색은 위계 수단 아님(의미일 때만).
- **가격** — 크게+굵게·**Daiso Font 우선**, 정상가 작게·취소선.
- **강조 중첩 금지** — 카드 내 최강 요소는 하나(가격이면 나머지 down).
- **정보 과다** — 여백으로 묶기. 접으면 `DaAccordion`(단, 가격은 항상 노출).

## Scope

**포함 (In scope)**
- 전 전문관 공통의 **재사용 컴포넌트**(ui · layout)와 그 상호작용·상태 규칙.
- **Foundation 토큰**(색 · 타이포 · spacing · radius · effect)과 적용 규칙.
- 모바일 우선 커머스 경험.

**제외 (Out of scope)**
- **도메인/로직 조합 컴포넌트** (리뷰카드·주문섹션·랭킹헤더·도메인 배지 등) — DDS 가 아니라 **소비 앱(vue_mo/fo)** 에 둔다. 공통성이 충분히 확인되면 ui 로 승격을 검토한다.
- 특정 화면·캠페인 전용 **1회성 UI**, 토큰·컴포넌트 규칙을 벗어나는 **개별 마케팅 비주얼**.
- **다크 모드** — 현재 미정의.

> 원칙: **공통 primitive 면 DDS, 도메인·로직·1회성이면 앱** (배치 판단은 Component Architecture › 배치 결정).

---

# Foundation

> **SoT 흐름**: `Figma`(원천) → `DESIGN.md`(명세, 이 문서) → `Code`(`--color-*`·`@include typo-*`). 값이 어긋나면 **Figma → DESIGN.md** 기준, 코드가 맞춘다(차이는 Known Gaps).
> **Design Token ≠ Code Variable.** Foundation 은 Design Token(Figma 변수명, 예 `stroke/basic1`)을 정의하고, Code Variable(예 `--color-border-1`) 매핑은 Token Mapping 에 둔다. 이름이 다를 수 있다.
> 토큰 챕터(**Color · Typography · Spacing · Radius · Effect · Layout**)는 Figma Variable Collection 과 동일 계층이며 **Structure(계층) → Reference(값)** 순으로 읽는다.

## 원칙 · Token Priority

값 선택 순서(아래 ladder). semantic 우선, palette 는 정당한 근거만, literal 은 금지, 없는 값은 만들지 말고 멈춘다.

```
semantic(text·bg·stroke·dim)   ▶ 1순위 — 의미가 맞으면 항상 여기
     │ semantic 으로 못 덮을 때만
palette(brand·gray)            ▶ 2순위 — 정당한 근거만(예: Button primary bg = gray-800)
     │ 토큰 자체가 없을 때
literal(raw hex·px)            ▶ 금지 — 예외는 Known Gaps(1px hairline·화살표)뿐, 주석 필수
     │ 어디에도 안 맞으면
STOP → 확인                     ▶ 새 토큰 임의 생성 금지
```

> ⭕ 예시 syntax 는 각 토큰 Reference 끝의 `var()`/`@include` 표기 참조. 색은 용도별 속성(글자 `color` · 배경 `background-color` · 테두리 `border-color`).

## Color

무채색 표면 위, 상태·강조·행동의 의미가 있을 때만 색을 더한다.
**Structure** — Primitive(Brand·Gray, 직접 사용 지양) · Semantic 1순위(Text·Background·Border·Dim·Shadow) · Gradient(highlight·ai) · Service(beauty·fashion).

**Brand** — `palette/brand/*`

| Token | Hex |
|---|---|
| red (DAISO RED, 변경 불가) | `#D70011` |
| black | `#111111` |
| white | `#FFFFFF` |

**Gray** — `palette/gray/*`

| 200 | 300 | 400 | 500 | 600 | 700 | 800 |
|---|---|---|---|---|---|---|
| `#F7F8F9` | `#E9EBEE` | `#C5C8CE` | `#646F7C` | `#374553` | `#28323C` | `#161D24` |

**Text** — `text/*` → primary=gray-800 · secondary=gray-500 · disable·placeholder=gray-400 · white=white

**Background** — `background/*` → base-white·elevated=white · base-black=gray-800 · grouped=gray-200 · disabled=gray-300

**Border** — `stroke/*` → basic1=gray-200 · basic2=gray-300

**Dim** — `dim/black/{thick 90 · basic 60 · thin 30 · subtle 10}%` (base `#111`) · `dim/white/{thick 60 · basic 20 · thin 15}%` (base `#FFF`)

**Shadow** — `shadow/basic`=#111 15% · `shadow/thin`=#111 10%

**Gradient** — `gradient/highlight`= red `#D70011`→gray-800 `#161D24` · `gradient/ai`= `#59ACFF`→`#2000D7`

**Service** — beauty default/accent1 `#81D6D0`/`#30CC8D` · fashion default `#00946E`

> ⭕ `color: var(--color-text-primary)`  ❌ `color: #161D24`

## Typography

제목·본문·캡션의 정보 위계를 서체·크기로 구분한다. 한 텍스트 = Family + Weight + Type Scale 한 묶음(믹스인이 캡슐화).
**Structure** — Family: Pretendard(Body·Caption)·SUITE(Display·Heading)·Daiso(프로모션) / Weight: regular 400·medium 500·bold 700·extrabold 800 / Type Scale: display·heading·body·caption.

| Tier | family | Size / Line / Letter |
|---|---|---|
| display-1 / -2 | SUITE | 54/66/-2 · 42/54/-2 |
| heading-1..6 | SUITE | 42/52/-2 · 24/32/-2 · 20/28/-1 · 18/24/-1 · 16/22/-1 · 14/20/-1 |
| body-1..7 | Pretendard | 24/30/0 · 20/26/0 · 18/24/0 · **16/22/0(기본)** · 15/21/0 · 14/19/0 · 13/18/0 |
| caption-1..3 | Pretendard | 12/16/0 · 11/15/0 · 10/14/0 |

> tier → 믹스인은 Token Mapping › Typography.
> ⭕ `@include typo-body-5-bold`  ❌ `font: 700 15px/21px`

## Spacing

일관된 간격 체계로 그룹핑·리듬을 만들어 다품목 스캔을 돕는다. **Structure** — Scale(primitive, 비등간) · Semantic(용도별, mo/pc 2값) · Composition(scale 밖은 합성).

- **Scale** (13단계) — `2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 72` px (3·40 없음)
- **Semantic** (mo/pc) — `page-margin 20/20` · `scroll-end 48/48` · `title-bottom 16/32` · `section 48/72` · `tab 12/24` · `module-set 16/48`
- **Composition** — `calc(var(--spacing-32) + var(--spacing-4))` = 36

> ⭕ `gap: var(--spacing-16)`  ❌ `gap: 15px`

## Radius

라운드는 장식이 아니라 요소 구분을 위한 최소한. 단일 축 4단계(small→pill).

| small | medium | large | pill |
|---|---|---|---|
| 2 | 4 | 8 | 1000px |

> ⭕ `border-radius: var(--radius-small)`  ❌ `border-radius: 2px`

## Effect

shadow·blur 로 깊이·레이어를 표현(과한 효과 지양). Shadow: Level1·Level2 / Blur: default·thick.

| Token | 값 |
|---|---|
| shadow Level1 / Level2 | `--shadow-level-1` / `-2` |
| blur default / thick | 8 / 25px |

> ⭕ `box-shadow: var(--shadow-level-1)`  ❌ `box-shadow: 0 1px 4px rgba(0,0,0,.15)`

## Layout

모바일 우선 반응형 골격. breakpoint-pc(PC 분기점) · container-pc(콘텐츠 최대폭). Dark mode 토큰 미정의 → Known Gaps.

| breakpoint-pc | container-pc |
|---|---|
| 1024 | 1280px |

> ⭕ `max-width: var(--layout-container-pc)`  ❌ `max-width: 1280px`

---

# Token Mapping

> Figma 디자인을 컴포넌트로 옮길 때의 **결정적 변환표.** 1차 근거는 `get_variable_defs` 의 **변수명**.
> 토큰에 없는 값이 나오면 매핑하지 말고 멈춰서 확인한다. 정식 값은 Foundation.

## 색 — semantic 변수명 → `var(--color-*)`

| Figma 변수 | CSS 변수 |
|---|---|
| `text/primary` | `var(--color-text-primary)` |
| `text/secondary` | `var(--color-text-secondary)` |
| `text/disable` · `placeholder` | `var(--color-text-disabled)` |
| `text/white` | `var(--color-text-white)` |
| `background/base/white` · `black` | `var(--color-bg-base)` · `-base-dark` |
| `background/elevated` · `grouped` · `disabled` | `var(--color-bg-elevated)` · `-grouped` · `-disabled` |
| `stroke/basic1` · `basic2` | `var(--color-border-1)` · `-2` |
| `dim/black/{thick,basic,thin,subtle}` | `var(--color-dim-black-*)` |
| `dim/white/{thick,basic,thin}` | `var(--color-dim-white-*)` |

> 변수명이 Figma 스펙과 다른 것(stroke→border, base/black→base-dark, disable+placeholder→disabled 병합)과 코드 미구현(text/white·bg/disabled·dim subtle)은 **Known Gaps › Implementation Gaps** 참조.

## palette (직접 사용 지양)

`palette/brand/{red,black,white}` → `var(--color-brand-*)`, `palette/gray/{200..800}` → `var(--color-gray-*)`.

## hex → semantic 역방향 (변수 안 잡힐 때)

| hex | 우선 semantic | fallback palette |
|---|---|---|
| `#161D24` | `--color-text-primary` / `-bg-base-dark` | `-gray-800` |
| `#646F7C` | `--color-text-secondary` | `-gray-500` |
| `#C5C8CE` | `--color-text-disabled` | `-gray-400` |
| `#FFFFFF` | `--color-text-white` / `-bg-base` | `-brand-white` |
| `#F7F8F9` | `--color-bg-grouped` / `-border-1` | `-gray-200` |
| `#E9EBEE` | `--color-bg-disabled` / `-border-2` | `-gray-300` |
| `#D70011` | (브랜드) | `-brand-red` |

## Spacing — px → `var(--spacing-{n})`

scale 에 있는 값만. 없는 px 가 나오면 토큰 합성 또는 확인.

## Radius — `var(--radius-{small|medium|large|pill})`

## Typography — **SCSS 믹스인** (CSS 변수 아님, `var()` 아님)

```scss
@use '../../foundation/tokens/typography' as *;   // 컴포넌트 상단

.da-x__label { @include typo-body-5-bold; }        // Figma: Body/Body 5/Bold
.da-x__title { @include typo-heading-5-bold; }      // Figma: Heading/Heading 5/Bold
.da-x__cap   { @include typo-caption-1-regular; }   // Figma: Caption/Caption 1/Regular
```

- 믹스인명 규칙: `typo-{tier}-{weight}` (`tier` = display-1·heading-3·body-5·caption-1 …, `weight` = extrabold/bold/medium/regular).
- **family/weight 만 부분 override** 할 땐 SCSS 변수: `font-family: $font-family-daiso;`, `font-weight: $font-weight-bold;`.
- 프로모션·가격 강조: `@include typo-daiso($size, $weight)`.
- size 가 표에 없으면 끼워맞추지 말고 확인한다.

## Effect / Layout

| Figma | CSS |
|---|---|
| shadow/Level 1·2 | `box-shadow: var(--shadow-level-1 / -2);` |
| blur default(8)·thick(25) | `backdrop-filter: blur(var(--blur-default / -thick));` |
| breakpoint-pc 1024 · container-pc 1280 | `var(--layout-breakpoint-pc)` · `var(--layout-container-pc)` |
| gradient/highlight · ai | `background: var(--color-brand-gradient-highlight / -ai);` |

> shadow·blur·layout(breakpoint/container)·gradient 는 스펙이나 코드 미구현/명칭차이 → **Known Gaps › Implementation Gaps**.
> 값 상위 기준은 Figma + 이 문서(갱신 후 `_*.scss` 반영). 토큰 빌드 체인·전역 로드는 **README › 소비 앱 연동 · 토큰 빌드** 참조.

---

# Component Architecture

> 레이어 단방향: `Foundation Token → ui → layout → page`. (module/도메인은 DDS 밖 = 앱)

## 레이어

```
Foundation Token  src/foundation/tokens/_*.scss   색·타이포·spacing·radius·effect (Figma 1:1)
      ▼
ui (primitive)    src/components/ui/              DaIcon · DaButton · DaChip · DaButtonChip · DaDivider ·
      │                                           DaTab · DaTabGroup · DaChipsFilter · DaTextInput ·
      │                                           DaDropdown · DaAccordion · DaAccordionBulletList ·
      │                                           DaPopover · DaActionArea   (14)
      ▼
layout            src/components/layout/          DaTopNavigation   (1)
      ▼
page / module(도메인)  ── 소비 앱(vue_mo/fo) ──   조립 + 도메인·로직 컴포넌트(리뷰카드·주문섹션·랭킹헤더 등)
```

- **ui**: 단일 책임 primitive. 토큰만 참조(DaIcon 은 다수가 사용하는 예외 의존). **layout**: 페이지 골격(헤더 등), 슬롯 기반.
- **barrel**: `src/index.js` 가 전 컴포넌트를 **named export**(전역 install 플러그인 없음 — 트리셰이킹).

## 파일 규칙

- 레이어 폴더 안에 **flat**: `components/ui/Da{Name}.vue`, `components/layout/Da{Name}.vue`.
  per-component 하위 폴더·개별 `index.js` 두지 않는다(단일 barrel 로 충분).
- 컴포넌트당 단일 SFC: `<template>` → `<script>`(Options API) → `<style scoped lang="scss">`.
- 같은 레이어 형제 import 는 `./DaIcon.vue`, 레이어 간은 `../ui/DaIcon.vue`. 토큰 믹스인은 `../../foundation/tokens/typography`.

## 네이밍 규칙

| 대상 | 규칙 |
|---|---|
| 컴포넌트 | `Da` + PascalCase 파일 (`DaButton.vue`), `name: 'DaButton'` |
| 등록 | 소비 앱에서 **named import** 후 로컬 `components: { DaButton }`. 전역 자동등록 안 함. |
| props | camelCase, `type`/`default`/(열거형)`validator` |
| 이벤트 | `@click`/`@change` emit, v-model |

> CSS 클래스·상태 표현(BEM)은 **SCSS / BEM**, 토큰은 **Foundation** 참조.

## 배치 결정

- **콘텐츠는 슬롯 우선 + prop fallback.** 텍스트 라벨은 `<slot>{{ label }}</slot>` 패턴(소비처가 `<DaChip>텍스트</DaChip>` 로 씀). label/title 을 prop 전용으로 만들지 않는다.
- **컨테이너는 dual-mode.** DaTabGroup/DaChipsFilter 는 data prop(tabs/chips) 있으면 자동 렌더+상태관리, 없으면 default slot 조합.
- **DaButtonChip 은 DaChip 과 별도.** ButtonChip = 액션/필터 트리거(`click` emit), Chip = 선택 상태 표현(`aria-pressed` 토글).
- **공통 primitive 면 DDS, 도메인·로직이면 앱.** 화면 특화/도메인 컴포넌트는 design-system 밖에 둔다.
- **다중 export 소스는 1파일 1컴포넌트로 분리**: Chip→(DaChip/DaChipsFilter), Tab→(DaTab/DaTabGroup), Accordion→(DaAccordion/DaAccordionBulletList).

---

# Component Usage

> 각 컴포넌트를 **언제 쓰고 언제 쓰지 않는지**.

## DaButton
- **언제** — 사용자가 실행하는 행동(제출·확인·담기·이동). 주요 행동 `type="primary"`(한 화면에 하나, label 은 동사), 보조 `tertiary`. size 7종: 일반 large~tiny, 이벤트/기획전 xxlarge/xlarge.
- **안 쓸 때** — 선택 상태(→ DaChip) · 옵션 선택(→ DaDropdown) · 뷰 전환(→ DaTab) · 필터 pill(→ DaButtonChip).

## DaChip
- **언제** — on/off 토글 **선택 상태**(필터·태그). 선택 상태는 부모가(`selected`) 관리, 그룹은 DaChipsFilter.
- **안 쓸 때** — 즉시 실행 액션(→ DaButton·DaButtonChip) · 상태 없는 단순 라벨.

## DaDropdown
- **언제** — 정해진 옵션 집합에서 하나 선택(정렬·카테고리). 옵션이 많을 때.
- **안 쓸 때** — 옵션 2~4개로 상시 노출 가능(→ DaChip·DaTab) · 자유 입력(→ DaTextInput).

## DaAccordion
- **언제** — 보조·상세 정보 접기(FAQ·약관). 본문은 default slot, 제목은 `#title`/prop.
- **안 쓸 때** — 항상 봐야 하는 핵심 정보 숨김 · 뷰 전환(→ DaTab).

## DaTab
- **언제** — 같은 맥락 콘텐츠를 **상호 배타적**으로 전환. 그룹은 DaTabGroup.
- **안 쓸 때** — 순차 단계(스텝) · 필터(→ DaChipsFilter) · 페이지 내비게이션.

## Component Selection (헷갈리는 쌍 선택 기준)

| 갈림 | 선택 기준 |
|---|---|
| Button vs Chip | 즉시 **실행**(제출·이동)=Button / on·off **선택 상태** 유지=Chip |
| Chip vs ButtonChip | 상태 표현(`aria-pressed` 토글)=Chip / 액션·필터 **트리거**(`click` emit)=ButtonChip |
| Tab vs ChipsFilter | 상호배타 **뷰 전환**=Tab / 다중선택 가능 **필터**=ChipsFilter |
| Dropdown vs Chip | 옵션 많고 접힘 필요=Dropdown / 옵션 2~4개 상시 노출=Chip |
| Accordion vs Tab | 같은 화면 **접기/펼치기**(FAQ)=Accordion / 콘텐츠 **전환**=Tab |

---

# Design Rules (AI 참조)

> 아래는 AI가 정확히 재현해야 할 **디자인 명세**다.
> **구현 절차·판단 흐름(Decision Flow)·Discovery·Conflict Resolution·Never 가드레일** = [SKILL.md](.claude/skills/dds-component/SKILL.md).
> **문서 역할·SoT 우선순위·적용 범위** = [CLAUDE.md](CLAUDE.md). (같은 규칙을 두 문서에 두지 않는다.)
> 값·형태의 원천은 항상 **Figma + 이 문서**. 확인 안 되면 추정하지 말고 멈춘다.

## Interaction Rules

| 항목 | 원칙 |
|---|---|
| Transition | 바뀌는 속성만(opacity·color), 150–200ms. `all`·`!important` 금지. |
| Gesture | 모바일 탭 우선, `-webkit-tap-highlight-color: transparent`, `:active` 피드백(opacity). hover 는 pc 보조. |
| Animation | 장식 애니메이션 지양. 상태 전이 명료화 목적만. |
| Disabled | `disabled` + `pointer-events:none`, 색은 disabled 토큰. 클릭·포커스 불가. |
| Dialog / Bottom Sheet | dim(`dim/black`) 배경, body 스크롤 잠금, ESC·dim 탭 닫기, 포커스 트랩. |

> Loading 은 UI States, Focus 는 Accessibility 참조.

## Accessibility (최소 기준)

- **Keyboard** — 인터랙션 요소 Tab 이동 · Enter/Space 실행.
- **Focus** — `:focus-visible` 링 유지, 논리적 순서, 모달 포커스 트랩.
- **Touch Target** — 최소 44×44px(작은 아이콘은 패딩으로 확보).
- **Contrast** — 본문 대비 4.5:1 이상(disabled 예외).
- **aria / Screen Reader** — 토글 `aria-pressed` · 탭 `aria-selected` · 확장 `aria-expanded` · 아이콘 전용 버튼 `aria-label` · 장식 아이콘 `aria-hidden`.

## UI States (공통 상태 처리)

| 상태 | 처리 |
|---|---|
| Loading | 스켈레톤/스피너로 자리 유지, 액션 disabled. |
| Empty | 중립 안내 문구 + (있으면)다음 행동 유도. 빈 화면 방치 금지. |
| Error | 원인 + 회복 문구, 파괴적 표현 지양. |
| Retry | 재시도 액션 제공, 반복 실패 시 대체 경로 안내. |

> 상태별 색·타이포는 새로 만들지 않고 semantic 토큰 재사용.

## Naming Mapping (Figma → Token → Component → Code)

한 값이 4계층을 관통하는 예: `text/primary` → `var(--color-text-primary)` → DaButton label 색 → `color: var(--color-text-primary);` / `Body/Body 5/Bold` → `typo-body-5-bold` → `@include typo-body-5-bold;`. 전체 매핑은 **Token Mapping** 참조.

> Rule 별 Do·Don't 예시는 각 Foundation 토큰의 ⭕/❌(토큰·Spacing·타이포), Component Architecture 배치·네이밍(콘텐츠 slot·상태 prop+BEM), 위 Accessibility(aria), 문서 끝 **Do / Don't** 에 있다(중복 방지로 여기 재수록 안 함).

---

# Development Rules

## props / 이벤트 / slot API 관례

- props 는 camelCase, `type`·`default`·(열거형)`validator` 명시.
- **배열/객체 기본값은 factory 함수**: `default: () => []`.
- **콘텐츠는 slot, 상호작용은 emit/v-model.** 라벨/콘텐츠는 slot(+prop fallback), 클릭·변경은 `@click`/`@change`, 입력은 `model: { prop, event }` + controlled/uncontrolled 양립.
- **class/style 자동 병합**: 부모가 붙인 class/style 은 root 에 합쳐진다. 속성 상속 차단 필요시 `inheritAttrs: false`.
- **단일 SFC**, Options API. `<script setup>`·Composition API·TypeScript 금지. named export 등록(`src/index.js`), default `install` 등 혼합 export 금지.

> 소비 앱 연동(전역 `style.css` 로드 · `build.transpile` · SSR `mounted`/`beforeDestroy` lifecycle)은 **README › 소비 앱 연동 · 토큰 빌드** 참조.

---

# SCSS / BEM

> `<style scoped lang="scss">`. 블록 클래스 `da-{name}`, 토큰은 색/간격/radius = 확정 namespace 의 `var()` + 타이포 `@include typo-*` (prefix 는 Token Mapping·코드 기준).

## 작성 규칙

- 모든 컴포넌트 스타일은 `<style scoped lang="scss">` 안에. 전역 스타일 추가 금지.
- 타이포 믹스인 사용 시 상단에 `@use '../../foundation/tokens/typography' as *;`.
- 한 SFC = 한 block. block 클래스는 root 에. 중첩은 BEM(`&__el`, `&--mod`)만. **요소 selector 중첩 금지**(클래스로).
- raw 값·magic number 금지 → 토큰/합성(**Foundation › Token Priority · Spacing**). transition·`!important` 규칙은 **Design Rules › Interaction**.
- 자식 컴포넌트 내부 덮을 땐 `::v-deep`(최소 범위).

## BEM 네이밍

```
block            da-{component}          .da-button
element          da-{component}__{part}  .da-button__label
modifier         da-{component}--{mod}    .da-button--primary
```

- modifier 선언 순서: base → variant → size → **state(마지막)**. state 가 variant 색을 덮어야 하므로 뒤에.
- 다분기 상태(Chip selected×disabled 4경우)는 **modifier 조합 selector**(`&--selected#{&}--disabled`).
- 동적 클래스는 Vue `:class` 배열·객체 문법.

> 토큰 사용 원칙(semantic 우선 · palette 예외 · 색 용도별 속성 · 타이포 믹스인 캡슐화)은 **Foundation › 원칙 · Token Mapping** 참조.

---

# Responsive

**모바일 우선** — 기본은 모바일, 데스크톱은 확장. 768–1023 구간은 별도 tablet 분기 없이 모바일 반응형으로 확장. 값(`breakpoint-pc 1024` · `container-pc 1280` · semantic spacing mo/pc)은 **Foundation › Layout · Spacing** 참조.

---

# QA Checklist

컴포넌트 1건이 "완료"이려면:

- [ ] 색·spacing·radius·effect 가 **확정 namespace 의 `var()`**, 타이포가 **`@include typo-*`** (raw hex/px 0건, 단 주석단 hairline 예외).
- [ ] semantic 우선, palette 직접 사용은 정당한 곳만.
- [ ] scale 밖 값은 토큰 합성(calc), 새 토큰 생성 0건.
- [ ] 콘텐츠는 slot(+prop fallback), 상호작용은 emit/v-model.
- [ ] state(default/hover/focus/disabled/selected/error)별 토큰이 Figma 와 일치.
- [ ] a11y 속성(`role`·`aria-*`·`disabled`) 명세대로.
- [ ] 레이어 단방향(page/도메인 로직은 앱에). 단일 SFC, props 타입/기본값/validator.
- [ ] Tailwind / TypeScript / Composition API 미사용.
- [ ] `npm run build` 통과 + named export 등록(`src/index.js`).

---

# Do / Don't

기본 원칙(토큰 1:1 · semantic 우선 · 재사용 · slot/emit)은 **TL;DR · Foundation · Development Rules**, 검증은 **QA Checklist** 참조. 아래는 그 외 **금지 전용** 항목.

- DAISO RED(`#D70011`) 등 브랜드 컬러값 변경 금지.
- Tailwind/CVA/`cn()` 이식, `!important`, 전역 스타일, 별도 `.css` 토큰 파일 금지.

---

# Known Gaps *(Appendix)*

> 참조용 부록(토큰/구현 차이 확인 시에만). **스펙 기준 미해결 항목** — 차이는 코드가 맞출 몫이며 스펙에서 삭제하지 않는다.
> **Status**: Planned · Pending Verification(재확인) · In Progress. **Priority**: P1~P3. **종류**: Design Gaps(스펙 미정의) · Implementation Gaps(스펙有·코드 미구현/차이).

## Design Gaps — 스펙 미정의

| 항목 | 내용 | Status | Priority |
|---|---|---|---|
| 다크 모드 | 토큰 미정의로 비활성. 생기면 semantic 재바인딩으로 복구. | Planned | P3 |
| 투명도(alpha) 토큰 | alpha 변형 색을 단일 토큰으로 표현하는 규칙 부재(DaFlagReview 5/10% 는 brand-red 리터럴). | Planned | P2 |
| 1px hairline | spacing 최소 2px → divider·underline·1px 구분선·뱃지 gap 이 scale 밖. `spacing/1` 정식화 미정, 주석단 리터럴 허용. | Pending Verification | P3 |
| 효과 전용 off-scale | Popover 화살표(4.5/5px)·TopNavigation 56px·gradient alpha 는 리터럴 허용. | Planned | P3 |

## Implementation Gaps — 스펙 有 · 코드 미구현/차이

**코드 미구현 토큰** (스펙 有 · 코드 無)

| 스펙 토큰 | 현재 코드 | Status | Priority |
|---|---|---|---|
| `--radius-{small,medium,large,pill}` | 없음(DaButton `2px`·DaChip `100px` 리터럴) | Pending Verification | P1 |
| `--shadow-level-1 / -2` | 없음 | Planned | P2 |
| `--blur-default / -thick` | 없음 | Planned | P2 |
| `--layout-breakpoint-pc` · `--layout-container-pc` | 없음(`--device-width-*` 은 성격 다름) | Pending Verification | P2 |
| `--color-dim-black-subtle` (10%) | 없음 | Planned | P3 |
| `--color-text-white` | 없음(흰 글자 `--color-brand-white` 사용) | Planned | P2 |
| `--color-bg-disabled` | 없음 | Planned | P2 |
| `--color-service-fashion` | 없음(beauty 만) | Pending Verification | P3 |

**명칭 차이** (코드 有 · 스펙과 이름 다름 → 명칭 확정 필요)

| Figma/스펙 | 현재 코드 변수 | Status | Priority |
|---|---|---|---|
| `stroke/basic1` · `basic2` | `--color-border-1` · `-2` | Pending Verification | P2 |
| `background/base/black` | `--color-bg-base-dark` | Pending Verification | P3 |
| `text/disable` + `text/placeholder` | `--color-text-disabled`(병합) | Pending Verification | P2 |
| `gradient/highlight` · `ai` | `--color-brand-gradient-*` | Pending Verification | P3 |

**구조**

| 항목 | 내용 | Status | Priority |
|---|---|---|---|
| SCSS 파티션 | 코드 4종(color/typography/spacing/reset). radius/effect/layout/gradient 분리 시 추가. | Planned | P2 |
| Typography 믹스인 | 코드 `typo-daiso-num($size)` vs 스펙 표기 `typo-daiso($size,$weight)` 시그니처 상이. | Pending Verification | P3 |
| 컴포넌트 목록·폴더 | ui/layout·DaButtonChip 등 Architecture 기준과 코드(flat 12) 차이 별도 확인. | Pending Verification | P2 |
