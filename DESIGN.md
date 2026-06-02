# DDS — Daiso Design System

> **이 문서는 DDS 운영의 단일 Source of Truth(SoT) 다.** 디자인 철학 · 토큰 기준 · 컴포넌트 사용 ·
> SCSS/BEM 작성 · QA 기준을 한 문서에 담는다.
>
> **운영 산출물**: `@daiso/design-system` — Vue 2.7 · Options API · 순수 JS · scoped SCSS · BEM · `var(--dds-*)`.
> 컴포넌트 `Da{Name}.vue` / 루트 클래스 `da-{name}`.
>
> **디자인 원천은 Figma.** 모든 토큰·형태·색은 Figma 를 기준으로 정의하며, 디자인이 바뀌면 토큰부터 갱신한다.

---

## 목차

- **Design Foundation** — Overview · Design Principles · Brand Expression · Visual Language · Scope
- **Foundation** — 토큰 기준값(SoT) · 사용 원칙
- **Token Mapping** — Figma/hex → `--dds-*` · 운영 토큰 전달
- **Component Architecture** — 레이어 · 네이밍 · 배치 결정
- **Component Usage** — 컴포넌트별 사용 기준 (언제 / Do / Don't)
- **Development Rules** — props/이벤트 API · Vue2/Nuxt2 운영 기준
- **SCSS / BEM** — scoped SCSS 작성 규칙
- **Responsive** — breakpoint · 모바일 우선
- **QA Checklist** — 완료 기준
- **Do / Don't** — 권장·금지
- **Known Gaps** — 미해결 사항

---

# Design Foundation

> DDS 가 **무엇을, 왜, 어떤 태도로** 설계하는가. 화면과 컴포넌트가 "DDS 다운가"를 판단하는 1차 기준이다.

## Overview

DDS(Daiso Design System)는 다이소 모바일 커머스 전반에서 **일관되고 예측 가능한 사용자 경험**을 제공하기 위한 단일 디자인 언어다.

- **대상 경험** — 생활용품 중심의 대량·다품목 쇼핑. 사용자는 짧은 시간에 많은 상품을 훑고, 비교하고, 판단한다.
- **설계 태도** — 현대적이되 중립적. UI 자체가 주목받기보다 **상품과 정보가 주목받도록** 뒤로 물러난다.
- **적용 범위** — 모든 전문관(카테고리)이 동일한 컴포넌트·패턴·시각 규칙을 공유한다. 전문관마다 다른 룩앤필을 만들지 않는다.

> 핵심 한 줄: **상품이 주인공, UI는 무대.**

## Design Principles

판단이 갈릴 때 아래 순서로 우선한다.

1. **명확성 > 장식 (Clarity over decoration)** — 모든 요소는 정보 전달·행동 유도라는 목적이 있어야 한다. 목적 없는 장식(꾸밈용 면 채움·불필요한 그림자·장식 일러스트)은 넣지 않고, 의미가 같으면 더 단순한 쪽을 택한다.
2. **상품 우선 (Product-first)** — 화면의 시각적 무게중심은 상품 이미지·가격·핵심 정보다. UI 크롬(배경·테두리·버튼)은 무채색·저채도로 절제하고, 색은 의미(상태·강조·행동)가 있을 때만 더한다.
3. **구조적 명료함 (Structural clarity)** — 직선·직사각형·정렬된 그리드로 정보를 구획한다. 모서리와 경계를 분명히 해 영역을 읽기 쉽게 만들고, 유기적·곡선적 형태는 지양한다.
4. **일관성 (Consistency)** — 같은 의미는 어디서나 같은 형태로 표현한다. 전문관·페이지마다 버튼·칩·카드가 달라 보이면 안 되며, 새 패턴을 만들기 전에 기존 컴포넌트로 해결되는지 먼저 확인한다.
5. **효율 (Efficiency)** — 다품목 탐색에 맞게 스캔·비교가 빠른 레이아웃을 우선한다. 정보 밀도는 가독성을 해치지 않는 선에서 높게 유지한다.

> 충돌 시 우선순위: **명확성·상품 우선 > 심미.**

## Brand Expression

다이소의 브랜드는 **절제된 무채색 위의 선명한 레드 포인트**로 드러난다.

- **메인 톤은 무채색** — 블랙 / 네이비 / 그레이 계열이 화면 면적의 대부분을 차지한다. 표면·텍스트·구조가 여기서 나온다.
- **다이소 레드는 포인트 전용** — 레드는 **주요 행동(CTA)·강조·브랜드 식별**의 신호로만 쓴다. 넓은 면 채움이나 장식 배경으로 남용하지 않는다. 면적이 커지면 신호로서의 힘을 잃는다.
- **레드의 일관성** — 색값과 쓰임은 전 전문관에서 동일하며, 다이소 레드의 색값은 변경하지 않는다.
- **표현의 절제** — 브랜드는 화려함이 아니라 **명료함과 일관성**으로 전달된다. 마케팅성 비주얼이 필요한 영역도 시스템의 형태·색 규칙을 벗어나지 않는다.

> 원칙: **무채색이 대부분, 레드는 최소.** 레드가 눈에 띄는 이유는 그 외가 조용하기 때문이다.

## Visual Language

DDS 의 형태 어휘(formal vocabulary) — 형태·색·타이포가 따르는 의도.

- **형태 (Form)** — 사각형 기반. 모서리를 강조한 직사각형 구조가 기본이다. 라운드는 부드러움을 위한 장식이 아니라 **요소 구분**을 위한 최소한으로만 쓴다(과한 곡률·완전 원형은 한정 용도).
- **아이콘 (Iconography)** — **직선 우선.** 곡선보다 직선·기하학적 형태를 택하고, 일정한 굵기의 선으로 그린다. 면(fill)보다 선(stroke) 중심이며 디테일은 최소화해 작은 크기에서도 또렷하게 한다.
- **레이아웃 (Layout)** — 그리드와 정렬이 기준. 여백으로 정보를 그룹핑하고 경계·구분선으로 영역을 나눈다. 요소의 정렬을 맞춰 스캔 동선을 단순하게 한다.
- **타이포그래피 (Typography)** — 정보 위계를 명확히 한다. 제목·본문·캡션의 역할을 분명히 구분하고, 한 화면에서 위계가 흐려지지 않게 한다.
- **색 (Color)** — 무채색 표면 + 의미 기반 색. 색은 상태·강조·브랜드 신호를 전달할 때만 등장한다.
- **이미지·전시 (Imagery)** — 상품 이미지가 시각 중심이 되도록 배경·프레임은 중립적으로 둔다. UI 가 상품 이미지를 가리거나 색으로 경쟁하지 않는다.

> 종합: **직선적이고 각진, 조용한 표면.** 형태는 정보를 담는 그릇이지 그 자체가 주인공이 아니다.

## Scope

DDS 가 책임지는 범위와 경계.

**포함 (In scope)**
- 전 전문관 공통의 **재사용 컴포넌트**(ui · module · layout)와 그 상호작용·상태 규칙.
- **Foundation 토큰**(색 · 타이포 · spacing · radius · effect)과 적용 규칙.
- 모바일 우선 커머스 경험.

**제외 (Out of scope)**
- 특정 화면·캠페인 전용의 **1회성 도메인 UI**. 공통성이 생기면 재사용 컴포넌트로 승격해 편입한다.
- 토큰·컴포넌트 규칙을 벗어나는 **개별 마케팅 비주얼**(필요 시에도 형태·색 규칙은 준수).
- **다크 모드** — 현재 미정의.
- 네이티브 앱·외부 서드파티 화면 등 DDS 적용 대상이 아닌 표면.

> 원칙: **공통이면 DDS, 1회성이면 도메인.** 경계가 모호하면 일단 도메인에 두고, 반복되면 승격한다.

---

# Foundation

> DDS 토큰의 **기준값(Source of Truth)** 과 사용 원칙. Figma 변수명/hex → `--dds-*` 변환은 Token Mapping.

## 원칙

- **Figma = Single Source of Truth.** 토큰·spacing·typography·color 전부 Figma Variables 1:1. 디자인이 바뀌면 토큰부터 갱신한다.
- **임의 값 금지.** hex / px / rem 직접 사용 ❌. `p-[13px]`, `text-[15px]`, `rounded-[7px]` 같은 arbitrary value 금지. 토큰에 없는 값이 필요하면 만들지 말고 **멈춰서 확인**한다.
- **semantic 우선.** 컴포넌트는 의미 토큰(text/background/stroke/dim)을 쓴다. `palette` 직접 사용은 semantic 으로 덮을 수 없을 때만(소스가 그렇게 한 곳만 동일하게).
- semantic 컬러는 hex 가 아닌 **목적**(Text/Background/Border/Dim/Shadow)으로 정의. palette 는 raw primitive 이며 컴포넌트 직접 사용 지양.

## Color · Palette

| Token | Hex |
|---|---|
| `palette/brand/red` (DAISO RED, 변경 불가) | `#D70011` |
| `palette/brand/black` | `#111111` |
| `palette/brand/white` | `#FFFFFF` |
| `palette/gray/200` | `#F7F8F9` |
| `palette/gray/300` | `#E9EBEE` |
| `palette/gray/400` | `#C5C8CE` |
| `palette/gray/500` | `#646F7C` |
| `palette/gray/600` | `#374553` |
| `palette/gray/700` | `#28323C` |
| `palette/gray/800` | `#161D24` |

## Color · Semantic

| Token | 참조 |
|---|---|
| `text/primary` | gray-800 |
| `text/secondary` | gray-500 |
| `text/disable` · `text/placeholder` | gray-400 |
| `text/white` | white |
| `background/base/white` · `elevated` | white |
| `background/base/black` | gray-800 |
| `background/grouped` | gray-200 |
| `background/disabled` | gray-300 |
| `stroke/basic1` | gray-200 |
| `stroke/basic2` | gray-300 |

### Dim · Shadow (색 + 투명도)

| Token | Base | α |
|---|---|---|
| `dim/black/thick` | `#111111` | 90% |
| `dim/black/basic` | `#111111` | 60% |
| `dim/black/thin` | `#111111` | 30% |
| `dim/black/subtle` | `#111111` | 10% |
| `dim/white/thick` | `#FFFFFF` | 60% |
| `dim/white/basic` | `#FFFFFF` | 20% |
| `dim/white/thin` | `#FFFFFF` | 15% |
| `shadow/basic` | `#111111` | 15% |
| `shadow/thin` | `#111111` | 10% |

## Color · Gradient & Service

| Token | 값 |
|---|---|
| `gradient/highlight` | brand-red `#D70011` → gray-800 `#161D24` |
| `gradient/ai` | `#59ACFF` → `#2000D7` |
| service · beauty default / accent | `#81D6D0` / `#30CC8D` |
| service · fashion default | `#00946E` |

## Typography

3-family. **family + tier(size/line/letter) + weight** 를 함께 지정(한 묶음 누락 금지 — SCSS / BEM › 토큰 사용 원칙).

- family: **Pretendard**(본문 Body·Caption) · **SUITE**(Display·Heading) · **Daiso**(프로모션).
- weight: regular 400 / medium 500 / bold 700 / extrabold 800.

| Tier | family | Size / Line / Letter |
|---|---|---|
| display-1 / -2 | SUITE | 54/66/-2 · 42/54/-2 |
| heading-1..6 | SUITE | 42/52/-2 · 24/32/-2 · 20/28/-1 · 18/24/-1 · 16/22/-1 · 14/20/-1 |
| body-1..7 | Pretendard | 24/30/0 · 20/26/0 · 18/24/0 · **16/22/0(기본)** · 15/21/0 · 14/19/0 · 13/18/0 |
| caption-1..3 | Pretendard | 12/16/0 · 11/15/0 · 10/14/0 |

> tier → `--dds-*` 변수명은 Token Mapping › Typography.

## Spacing

primitive scale (13단계, 비등간): `2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 72` (px). (3·40 없음)

semantic spacing(mo/pc): `page-margin 20/20` · `scroll-end 48/48` · `title-bottom 16/32` · `section 48/72` · `tab 12/24` · `module-set 16/48`.

> scale 에 없는 값(36, 40, 120 …)은 끼워맞추지 말고 **토큰 합성**(`calc(var(--dds-spacing-32) + var(--dds-spacing-4))` = 36, `72+48`)으로 정확히 구성한다.

## Radius / Layout / Effect

| 구분 | Token | 값 |
|---|---|---|
| Radius | small / medium / large / pill | 2 / 4 / 8 / 1000px |
| Layout | breakpoint-pc / container-pc | 1024 / 1280px (768–1023 은 모바일 반응형 확장, tablet 분기 없음 — Responsive) |
| Effect | shadow Level1 / Level2 | drop-shadow / 2-stack (색 shadow/thin·basic) |
| Effect | blur default / thick | backdrop-blur 8 / 25px |

> Dark mode 토큰 미정의 → Known Gaps 참조.

---

# Token Mapping

> Figma 디자인을 컴포넌트로 옮길 때의 **결정적 변환표.** 1차 근거는 `get_variable_defs` 가 돌려준 **변수명**.
> 변수명이 있으면 추측 없이 매핑된다. 변수가 안 잡히고 raw hex 만 있으면 아래 *hex → semantic 역방향* 표를 쓴다.
> **토큰에 없는 값이 나오면 매핑하지 말고 멈춰서 확인한다(Design Principles · Do / Don't).** 정식 값은 Foundation.

## 색 — semantic 변수명 → `--dds-*`

CSS 속성은 용도에 맞게: 글자색 `color`, 배경 `background-color`, 테두리 `border-color`.

| Figma 변수 | CSS 변수 |
|---|---|
| `text/primary` | `var(--dds-color-text-primary)` |
| `text/secondary` | `var(--dds-color-text-secondary)` |
| `text/disable` | `var(--dds-color-text-disable)` |
| `text/placeholder` | `var(--dds-color-text-placeholder)` |
| `text/white` | `var(--dds-color-text-white)` |
| `background/base/white` | `var(--dds-color-bg-base-white)` |
| `background/base/black` | `var(--dds-color-bg-base-black)` |
| `background/elevated` | `var(--dds-color-bg-elevated)` |
| `background/grouped` | `var(--dds-color-bg-grouped)` |
| `background/disabled` | `var(--dds-color-bg-disabled)` |
| `stroke/basic1` | `var(--dds-color-stroke-basic1)` |
| `stroke/basic2` | `var(--dds-color-stroke-basic2)` |
| `dim/black/{thick,basic,thin,subtle}` | `var(--dds-color-dim-black-*)` |
| `dim/white/{thick,basic,thin}` | `var(--dds-color-dim-white-*)` |

## palette (직접 사용 지양 — semantic 으로 못 덮을 때만)

| Figma 변수 | CSS 변수 |
|---|---|
| `palette/brand/red` | `var(--dds-color-palette-brand-red)` |
| `palette/brand/black` | `var(--dds-color-palette-brand-black)` |
| `palette/brand/white` | `var(--dds-color-palette-brand-white)` |
| `palette/gray/{200..800}` | `var(--dds-color-palette-gray-200)` … `-800` |

## hex → semantic 역방향 (변수가 안 잡힐 때)

| hex | 우선 semantic | fallback palette |
|---|---|---|
| `#161D24` | `--dds-color-text-primary` / `--dds-color-bg-base-black` | `--dds-color-palette-gray-800` |
| `#646F7C` | `--dds-color-text-secondary` | `--dds-color-palette-gray-500` |
| `#C5C8CE` | `--dds-color-text-disable` / `-placeholder` | `--dds-color-palette-gray-400` |
| `#FFFFFF` | `--dds-color-text-white` / `--dds-color-bg-base-white` | `--dds-color-palette-brand-white` |
| `#F7F8F9` | `--dds-color-bg-grouped` / `--dds-color-stroke-basic1` | `--dds-color-palette-gray-200` |
| `#E9EBEE` | `--dds-color-bg-disabled` / `--dds-color-stroke-basic2` | `--dds-color-palette-gray-300` |
| `#374553` | — | `--dds-color-palette-gray-600` |
| `#28323C` | — | `--dds-color-palette-gray-700` |
| `#D70011` | (브랜드) | `--dds-color-palette-brand-red` |
| `#111111` | (브랜드) | `--dds-color-palette-brand-black` |

투명도 섞인 hex(예: `#11111199`)는 `--dds-color-dim-*` / shadow 변수로 본다.

## Spacing — px → `--dds-spacing-{n}`

scale(Foundation › Spacing)에 있는 값만. padding/margin/gap 동일. 예: `padding: var(--dds-spacing-16);`, `gap: var(--dds-spacing-4);`.
**scale 에 없는 px(13, 18, 40 …)** 가 나오면 끼워맞추지 말고 멈춰서 확인한다. (단, 고정 높이는 line-height 포함 합산이 scale 과 맞는지 확인 — 예: Large 버튼 pt14+line21+pb13=48 → `height: var(--dds-spacing-48)`.)

## Radius — `border-radius`

| Figma | CSS 변수 |
|---|---|
| 2px / Small | `var(--dds-radius-small)` |
| 4px / Medium | `var(--dds-radius-medium)` |
| 8px / Large | `var(--dds-radius-large)` |
| 1000px / Pill / fully rounded | `var(--dds-radius-pill)` |

## Typography — family + tier + weight (변수명)

한 텍스트 요소에 네 가지(+weight)를 함께 지정한다:

```scss
font-family:    var(--dds-font-family-pretendard);   /* SUITE: -suite, Daiso: -daiso */
font-size:      var(--dds-font-body-5-size);
line-height:    var(--dds-font-body-5-line);
letter-spacing: var(--dds-font-body-5-letter);
font-weight:    var(--dds-font-weight-bold);          /* 400 regular / 500 medium / 700 bold / 800 extrabold */
```

**family**: Pretendard→`-pretendard`, SUITE→`-suite`, Daiso→`-daiso`.
**tier prefix** (`*` = `-size` / `-line` / `-letter`):

| family | tier prefix | size/line/letter |
|---|---|---|
| SUITE | `--dds-font-display-1-*` / `-display-2-*` | 54/66/-2 · 42/54/-2 |
| SUITE | `--dds-font-heading-1-*` … `-6-*` | 42/52/-2 · 24/32/-2 · 20/28/-1 · 18/24/-1 · 16/22/-1 · 14/20/-1 |
| Pretendard | `--dds-font-body-1-*` … `-7-*` | 24/30/0 · 20/26/0 · 18/24/0 · 16/22/0(기본) · 15/21/0 · 14/19/0 · 13/18/0 |
| Pretendard | `--dds-font-caption-1-*` … `-3-*` | 12/16/0 · 11/15/0 · 10/14/0 |

> Figma 의 `Body/Body 5/Bold` = body-5 tier + Pretendard + weight bold. Heading/Display 는 SUITE, 본문은 Pretendard 가 family 단서. size 가 표에 없으면 끼워맞추지 말고 확인한다.

## Effect / Layout

| Figma | CSS |
|---|---|
| shadow/Level 1 · 2 | `box-shadow: var(--dds-shadow-level-1 / -2);` |
| blur/default(8) · thick(25) | `backdrop-filter: blur(var(--dds-blur-default / -thick));` |
| breakpoint-pc 1024 · container-pc 1280 | `var(--dds-breakpoint-pc)`(미디어쿼리) · `var(--dds-container-pc)`(max-width) |

## Gradient / Service

- `gradient/highlight` → `var(--dds-gradient-highlight)`, `gradient/ai` → `var(--dds-gradient-ai)` (이미 `linear-gradient(...)` 로 합성됨 → `background: var(--dds-gradient-ai);`).
- service 색(뷰티 `#81D6D0`/`#30CC8D`, 패션 `#00946E`) → `var(--dds-color-service-{beauty-default|beauty-accent1|fashion-default})`.

## 운영 토큰 전달 (`--dds-*`)

> 운영(Vue) 컴포넌트는 전부 `var(--dds-*)` 를 참조한다. 그 토큰 CSS 를 배포하는 것이 **0순위 선행작업**이다.

- **운영 기준(SoT)**: `design-system/src/styles/dds-tokens.css`. 변수명은 `--dds-*` 이며 전역 주입한다.
- **값의 상위 기준**: Figma 변수 + 이 문서(DESIGN.md › Foundation · Token Mapping). 토큰 값이 바뀌면 Figma / DESIGN.md 를 먼저 갱신한 뒤 `dds-tokens.css` 에 반영한다.
- **폰트**: `dds-tokens.css` 는 family 이름 + fallback 만 정의한다. 실제 웹폰트(`@font-face`)는 host 앱이 제공한다.

---

# Component Architecture

> 레이어 구조 · 네이밍 · 컴포넌트 배치 결정. 단방향: `Foundation Token → ui → module → layout → page`.

## 레이어

- **레이어 단방향.** 역방향 의존 금지. **page 는 조립만** — 새 primitive 생성 금지, 필요하면 module 로 승격. **재사용 우선**(기존 컴포넌트로 가능하면 신규 생성 금지).

```
Foundation Token  src/styles/dds-tokens.css   색·타이포·spacing·radius·effect (Figma 1:1, --dds-*)
      ▼
ui (primitive)    src/components/ui/          DaButton · DaChip · DaDropdown · DaTextInput · DaAccordion ·
      │                                       DaTab(Group) · DaPopover · DaActionArea · DaButtonChip ·
      │                                       DaDivider · DaIcon · DaChipsFilter · DaAccordionBulletList
      ▼
module (composed) src/components/module/      DaReviewCard · DaOrderSection · DaDeliveryBadge ·
      │                                       DaFlagReview · DaUserRankingHeader · DaReviewIncentiveBanner
      ▼
layout            src/components/layout/      DaTopNavigation
      ▼
page (daiso-test)                             조립·검증
```

- **ui**: 단일 책임 primitive. 토큰만 참조, 다른 ui 에 거의 의존하지 않음(DaIcon 예외 — 다수가 사용).
- **module**: ui 를 조합한 도메인 단위(예: DaReviewCard 는 DaIcon + DaDeliveryBadge 조합).
- **barrel**: `src/index.js` 가 전 컴포넌트를 `install()` 전역 등록 + named export.
- **파일 규칙**: 컴포넌트당 단일 SFC `Da{Name}/Da{Name}.vue` + `index.js`.

## 네이밍 규칙

| 대상 | 운영 (Vue2, **기준**) | 검증 repo (React, 참고) |
|---|---|---|
| 컴포넌트 | `Da` + PascalCase 파일 (`DaButton.vue`), 등록명 kebab `da-button` | PascalCase (`Button`, `ReviewCard`) |
| props | camelCase | camelCase |
| 상태 표현 | prop + BEM modifier 클래스 | variant/size/selected/disabled prop |
| CSS 클래스 | BEM: `da-button` / `da-button__label` / `da-button--primary` | Tailwind utility |
| 토큰 변수 | `--dds-color-*`, `--dds-spacing-*`, `--dds-radius-*` | `--color-*`, `--spacing-scale-*`, `--radius-*` (Tailwind theme) |
| 이벤트 | `@click`/`@change` emit, v-model | `onClick`/`onChange` 콜백 prop |

> 토큰 변수 **prefix 가 stack 마다 다르다.** this repo→운영 변환과 Figma→`--dds-*` 매핑은 Token Mapping.

## 배치 결정

- **DaButtonChip 은 DaChip 과 별도.** ButtonChip 은 Button 성격의 **액션/필터 트리거**(액션 emit), Chip 은 **선택 상태 표현**(`aria-pressed` 토글)으로 상호작용 모델이 다르다 → 무리하게 통합하지 않는다.
- **공통이면 DDS(ui/module), 1회성·도메인 의존이 크면 app-domain 으로 분리.** 화면 특화 컴포넌트(PromotionFilterBar · CategoryRail · OrderSection · UserRankingHeader 등)는 design-system 밖에 둔다. 공통성이 생기면 module 로 승격한다.
- **glyph**: 공통성이 높은 glyph 는 DaIcon 으로 편입, 도메인 전용 glyph 는 로컬 유지.
- **다중 export 소스는 1파일 1컴포넌트로 분리**: Chip→(DaChip/DaChipsFilter), Tab→(DaTab/DaTabGroup), Accordion→(DaAccordion/DaAccordionBulletList).

---

# Component Usage

> 각 컴포넌트를 **언제 쓰고 언제 쓰지 않는지** 의 기준. 같은 목적에 서로 다른 컴포넌트가 섞이지 않게 한다. (props/이벤트 API·스타일 작성은 Development Rules · SCSS / BEM.)

## DaButton

- **언제 사용** — 사용자가 명시적으로 실행하는 행동(제출·확인·담기·이동 등). 화면의 주요 행동은 `primary`, 보조 행동은 `tertiary`.
- **사용하지 않을 때** — 선택 상태 표현(→ DaChip) · 옵션 선택(→ DaDropdown) · 같은 화면 내 뷰 전환(→ DaTab) · 필터/탐색 트리거 pill(→ DaButtonChip).
- **Do** — 한 화면의 핵심 행동 하나에만 `primary` 를 둔다. label 은 행동을 나타내는 동사로 쓴다.
- **Don't** — `primary` 를 여러 개 나란히 두어 위계를 무너뜨리거나, 단순 페이지 이동에 버튼을 남용하거나, 토큰에 없는 레드 채움 버튼을 임의로 만들지 않는다.

## DaChip

- **언제 사용** — on/off 로 토글되는 **선택 상태**(필터·태그 선택)를 표현할 때. 여러 칩을 묶는 필터 그룹은 DaChipsFilter 로 관리한다.
- **사용하지 않을 때** — 즉시 실행되는 액션 트리거(→ DaButton·DaButtonChip) · 상태 없는 단순 라벨/뱃지 표시.
- **Do** — 선택 상태는 부모가 관리하고(`selected`), 그룹 선택은 DaChipsFilter 에 맡긴다.
- **Don't** — 칩 하나로 제출·내비게이션을 수행하거나, 실제 선택 의미 없이 강조 장식용으로만 쓰지 않는다.

## DaDropdown

- **언제 사용** — 정해진 옵션 집합에서 **하나**를 고를 때(정렬 기준·카테고리 등). 옵션이 많아 항상 펼쳐 두기 부담스러운 경우.
- **사용하지 않을 때** — 옵션이 2~4개라 항상 노출해도 될 때(→ DaChip·DaTab) · 자유 텍스트 입력(→ DaTextInput) · 행동 실행(→ DaButton).
- **Do** — `placeholder` 로 선택 전 상태를 안내하고, 옵션 라벨은 간결하게 둔다.
- **Don't** — 선택지가 매우 적은데 드롭다운 뒤로 숨기거나, 옵션 목록 안에 액션 버튼을 섞지 않는다.

## DaAccordion

- **언제 사용** — 보조·상세 정보를 접어 두었다가 필요할 때 펼치는 경우(FAQ·약관·상세 묶음).
- **사용하지 않을 때** — 사용자가 항상 봐야 하는 핵심 정보를 숨길 때 · 같은 화면 내 뷰 전환(→ DaTab).
- **Do** — 제목만으로 내용을 예측할 수 있게 쓰고, 기본은 접힌 상태로 두되 꼭 필요한 항목만 `defaultExpanded`.
- **Don't** — 필수 정보를 아코디언 뒤에 숨기거나, 아코디언을 과도하게 중첩하지 않는다.

## DaTab

- **언제 사용** — 같은 맥락의 콘텐츠를 한 화면에서 **상호 배타적**으로 전환할 때(상세/리뷰/문의 등). 그룹 관리는 DaTabGroup.
- **사용하지 않을 때** — 순차 진행 단계(스텝/위저드) · 필터(→ DaChipsFilter) · 다른 페이지로의 내비게이션 · 탭 수가 많아 가로 스크롤이 과한 경우.
- **Do** — DaTabGroup 으로 선택을 관리하고, 라벨은 짧게, `count` 는 의미 있을 때만 표기한다.
- **Don't** — 한 탭 묶음에 전혀 다른 맥락을 섞거나, 탭으로 다음/이전 진행 플로우를 구현하지 않는다.

---

# Development Rules

> 운영 컴포넌트를 **만드는** 기준 — props/이벤트 API 관례와 Vue2/Nuxt2 운영 규칙. 스타일 작성은 SCSS / BEM, 토큰은 Foundation · Token Mapping.

## props / 이벤트 / slot API 관례

- props 는 camelCase, `type` · `default` · (열거형은) `validator` 를 명시한다.
  예: `variant: { type: String, default: 'primary', validator: v => ['primary','tertiary'].includes(v) }`
- **배열/객체 기본값은 factory 함수**: `default: () => []`, `default: () => ({})`. 리터럴 직접 지정 금지(인스턴스 간 공유 버그).
- **Boolean prop 주의**: 부모가 안 넘기면 `undefined` 가 아니라 `false` 로 들어온다(Vue2 캐스팅). Boolean 을 controlled 로 쓸 땐 `value !== undefined` 판정이 깨질 수 있으니 동작을 검증하거나 controlled 여부를 별도로 받는다.
- **class/style 자동 병합**: 부모가 컴포넌트에 붙인 `class`/`style` 은 root 요소에 자동 합쳐진다 → `className` 류 prop 을 따로 두지 않는다. 일반 속성 상속까지 막으려면 `inheritAttrs: false`.
- **상호작용은 콜백 prop 대신 emit / v-model**: 클릭·변경은 `@click` / `@change` emit, 입력값은 `model: { prop, event }` + 내부 `data` fallback 으로 controlled/uncontrolled 를 양립시킨다. 이벤트명(kebab)·payload 는 SFC 상단 주석에 명시한다.
- **삽입 콘텐츠는 slot**: 기본 `<slot>`, 영역 지정은 named slot, 반복 데이터 안의 커스텀 렌더는 **scoped slot 하나**(`$scopedSlots`)로 부모가 item 별 렌더한다. 옵션마다 named slot 을 만들지 않는다.

## Vue2 / Nuxt2 운영 기준

- **토큰 CSS 주입(선행·0순위)**: `--dds-*` 스타일시트를 전역 주입한다(`nuxt.config.js` `css: ['~/assets/dds-tokens.css']`). 미주입 시 전 컴포넌트 unstyled. 생성 절차는 Token Mapping › 운영 토큰 전달.
- **전역 등록**: `plugins/dds.js` 에서 `Vue.component('da-icon', DaIcon)` … 후 `nuxt.config.js` `plugins` 에 등록, 또는 사용처 로컬 등록. 라이브러리 barrel `src/index.js` 가 `install()` 로 일괄 등록 + named export 한다.
- **SSR 안전성**: `window` / `document` 접근은 **`mounted()` 이후에만**(`created` / `data` / `computed` / 렌더에서 접근 금지 — 서버에서 깨진다). 외부 클릭 등 리스너는 `mounted` 에서 등록, `beforeDestroy` 에서 해제한다.
- **client-only**: 브라우저 전용 API(포털, `document.body` 부착 등)는 `<client-only>` 로 감싸거나 `process.client` 가드.
- **단일 SFC**: 컴포넌트당 `Da{Name}/Da{Name}.vue` + `index.js`, 작성 순서 `<template>` → `<script>`(Options API) → `<style scoped lang="scss">`.

---

# SCSS / BEM

> 운영 컴포넌트(.vue)의 `<style scoped lang="scss">` 작성 규칙. 블록 클래스는 `da-{name}`, 토큰 변수는 `var(--dds-*)` — **둘의 prefix(da- vs --dds-)를 혼동하지 말 것.** 토큰 값은 Foundation, 매핑은 Token Mapping.

## scoped SCSS 작성 규칙

- 모든 컴포넌트 스타일은 `<style scoped lang="scss">` 안에. 전역 스타일 추가 금지.
- 한 SFC = 한 **block**. block 클래스는 root 요소에 둔다.
- 중첩은 BEM 구조(`&__el`, `&--mod`)에만 사용. **요소 selector(`div`, `span`) 중첩 금지** — 클래스로.
- 자식 컴포넌트 내부를 꼭 덮어야 할 때만 **`::v-deep`** 사용(최소 범위). SCSS 환경에선 `>>>` 가 동작하지 않으니 `::v-deep` 로 통일.
- raw 값(hex/px/rem) 금지 → 전부 `var(--dds-*)` (Foundation · Token Mapping).
- magic number 금지. scale 밖 크기는 토큰 합성: `calc(var(--dds-spacing-32) + var(--dds-spacing-4))`.
- transition 은 바뀌는 속성만 명시(`transition: background-color .15s, color .15s`). `all` 지양.
- `!important` 금지(specificity 는 BEM 구조로 해결).

## BEM 네이밍

```
block            da-{component}          .da-button           (root)
element          da-{component}__{part}  .da-button__label
modifier         da-{component}--{mod}    .da-button--primary
element+modifier da-{c}__{el}--{mod}      .da-dropdown__option--disabled
```

- **block**: `da-` + 컴포넌트 kebab. 컴포넌트당 1개.
- **element**: `__` + 역할명. 부모-자식 구조가 아니라 **소속**을 뜻함 — `__icon__label` 같은 2단 중첩 금지(`__label` 로 평탄화).
- **modifier**: `--` + 상태/변형. variant(`--primary`), size(`--large`), state(`--disabled`/`--open`/`--error`/`--selected`).
- 클래스는 의미 기반. presentational 명(`--red`, `--mt-16`) 금지.

## template 의 `:class` 바인딩

동적 클래스 조립은 Vue 의 `:class` 배열·객체 문법으로 한다(외부 헬퍼 이식 금지).

```html
<button :class="['da-button',
                 `da-button--${variant}`,
                 `da-button--${size}`,
                 { 'da-button--disabled': disabled }]">
```

- variant/size 처럼 값이 동적이면 템플릿 리터럴, boolean 상태는 객체 문법.

## modifier 작성 방식

**선언 순서**: base → variant → size → **state(마지막)**. state(`--disabled` 등)가 variant 색을 덮어야 하므로 뒤에 둔다.

```scss
.da-button {
  /* base */
  &--primary  { background-color: var(--dds-color-palette-gray-800); }
  &--tertiary { background-color: var(--dds-color-palette-brand-white); }
  &--large    { height: var(--dds-spacing-48); }
  &--disabled {                                  // variant 뒤 → 덮어쓰기 성공
    background-color: var(--dds-color-bg-disabled);
    color: var(--dds-color-text-disable);
    cursor: not-allowed;
  }
}
```

**modifier 조합**: 다분기 상태(예: Chip 의 selected×disabled 4경우)는 **modifier 조합 selector** 로 푼다.

```scss
.da-chip {
  /* unselected (기본) */
  &--selected { background-color: var(--dds-color-palette-gray-700); color: var(--dds-color-text-white); }
  &--disabled { background-color: var(--dds-color-bg-disabled); color: var(--dds-color-text-disable); }
  &--selected.da-chip--disabled {                // 두 modifier 동시 → 별도 분기
    background-color: var(--dds-color-palette-gray-400);
    color: var(--dds-color-text-white);
  }
}
```

- modifier 는 boolean 상태마다 1개. 값형 변형(variant/size)은 값마다 1개.
- 부모 modifier 가 자식 element 에 영향: `.da-card--store-only & { ... }`(부모참조 `&`) 또는 `.da-card--store-only .da-card__thumb { }`.
- modifier 클래스는 base 와 **함께** 붙는다(단독 사용 금지): `class="da-chip da-chip--selected"`.

**상태 selector 매핑**:

| 상태 | SCSS |
|---|---|
| 포커스 영역 | `&:focus-within` |
| hover | `&:hover { background-color: ... }` |
| `disabled` prop | `&--disabled` modifier (+ 필요시 `&:disabled`) |
| 선택/펼침 등 동적 | modifier 클래스로 토글(`&--open`, `&--selected`) |

## 토큰 사용 원칙

- **semantic 우선.** palette 직접 사용은 정당한 곳만 동일하게(예: Button primary bg = gray-800).
- 토큰에 없는 값은 만들지 말고 **합성** 또는 **확인**(Foundation › Spacing).
- 색은 용도별 속성으로: 글자 `color`, 배경 `background-color`, 테두리 `border-color`.
- **Typography 5종 묶음**: family + size + line + letter + weight 를 함께 지정한다. 한 묶음 누락 금지(Token Mapping › Typography).

## 금지 (SCSS)

- raw hex / px / rem 직접 입력 (→ `var(--dds-*)`).
- `--spacing-scale-*` / `--color-palette-*` 등 **검증 repo prefix 미변환** 사용(Token Mapping 변환 필수).
- `@apply`, Tailwind utility class, CVA, `cn()` 이식.
- 요소 selector 중첩(`.block div span`), id selector, `!important`.
- 전역(non-scoped) 스타일 추가, `::v-deep` 남용.
- presentational 클래스명(`--red`, `--mb-8`), magic number.

---

# Responsive

- **모바일 우선.** 기본 레이아웃은 모바일 기준이며, 데스크톱은 확장으로 본다.
- **breakpoint**: `breakpoint-pc = 1024px`. 768–1023px 구간은 별도 tablet 분기 없이 모바일 레이아웃을 반응형으로 확장한다.
- **container**: `container-pc = 1280px` (콘텐츠 최대폭, `max-width`).
- 미디어쿼리·최대폭은 토큰으로: `var(--dds-breakpoint-pc)` / `var(--dds-container-pc)` (Token Mapping › Effect / Layout).
- semantic spacing 은 mo/pc 두 값을 가진다(예: `section 48/72`, `title-bottom 16/32`) — Foundation › Spacing.

---

# QA Checklist

컴포넌트 1건이 "완료"이려면:

- [ ] 색·spacing·radius·typography 가 **전부 토큰** (raw hex/px 0건).
- [ ] semantic 우선 사용, palette 직접 사용은 정당한 곳만.
- [ ] scale 밖 값은 토큰 합성(calc)으로 처리, 새 토큰 생성 0건.
- [ ] typography 는 family+size+line+letter+weight 5종 모두 지정.
- [ ] state(default/hover/focus/disabled/selected/error)별 토큰이 Figma 와 일치.
- [ ] a11y 속성(`role`, `aria-*`, `disabled`)이 명세대로.
- [ ] 레이어 단방향 준수(page 에 primitive 없음).
- [ ] BEM 블록 `da-*` / 토큰 변수 `--dds-*` prefix 혼동 없음.
- [ ] 단일 SFC, props 타입/기본값/validator 명시, 상호작용은 emit/v-model.
- [ ] Tailwind / TypeScript / Composition API 미사용.
- [ ] `npm run build` 통과.

---

# Do / Don't

**Do**
- Figma 토큰을 1:1 로 사용한다. 없는 값은 멈춰서 확인하거나 토큰 합성(calc)으로 만든다.
- semantic 토큰을 우선한다. 색은 의미(상태·강조·행동)가 있을 때만 쓴다.
- 기존 컴포넌트로 가능하면 재사용하고, 상태는 prop + BEM modifier 로 표현한다.

**Don't**
- arbitrary value (`text-[15px]`, `p-[13px]`, raw hex/px/rem) 사용.
- DDS 토큰에 없는 값을 임의 생성.
- palette 를 semantic 으로 대체 가능한데 직접 사용.
- page 에서 새 primitive 정의(→ module 승격).
- DAISO RED(`#D70011`) 등 브랜드 컬러값 변경.
- 미정의 dark token 추정 생성(→ Known Gaps).
- (코드) Tailwind/CVA/`cn()` 이식, `--dds-*` 미변환 prefix, `!important`, 전역 스타일 — SCSS / BEM › 금지.

---

# Known Gaps

> 아직 토큰·규칙이 확정되지 않은 영역. 해당 케이스를 만나면 임의 처리하지 말고 확인한다.

- **다크 모드** — 토큰 미정의로 현재 비활성. 토큰이 생기면 semantic 재바인딩으로 복구한다.
- **투명도(alpha) 토큰** — alpha 변형 색을 단일 `var(--dds-*)` 로 표현하는 규칙이 없다.
- **1px hairline** — spacing scale 최소가 2px 라 divider·탭 underline 의 `1px` 가 scale 밖이다. 예외 허용 규칙이 아직 명문화되지 않았다.
