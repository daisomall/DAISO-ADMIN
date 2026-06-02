---
name: dds-component
description: >-
  Figma 디자인(노드/프레임/컴포넌트)을 기준으로 DDS(Daiso Design System) 컴포넌트를 생성·유지보수한다.
  사용자가 Figma 링크나 선택한 노드를 주고 "이거 컴포넌트로 만들어줘", "DDS 컴포넌트로 추가해줘",
  "디자인대로 만들어줘" 라고 하거나, 버튼·인풋·카드·뱃지 같은 UI 요소를 디자인 기준으로 만들 때 항상 이 스킬을 쓴다.
  Figma node-id 가 포함된 figma.com URL 이 등장할 때도 사용한다. 핵심은 토큰을 임의 값으로 하드코딩하지 않고
  DESIGN.md 의 토큰 어휘(CSS 변수 --dds-*)로만 표현하고, 결과물을 Vue 2 SFC(Options API · 순수 JS · scoped SCSS
  — TS·Tailwind 미사용)의 재사용 가능한 DDS 컴포넌트로 만드는 것이다. 신규 생성보다 기존 DDS 재사용을 우선한다.
---

# DDS Component — Figma 기준 DDS 컴포넌트 생성·유지보수 스킬

이 스킬은 **DDS(Daiso Design System)를 지속적으로 운영·확장**하기 위한 작업 규칙이다.
설계 기준(철학·토큰 값·아키텍처·SCSS/BEM)은 [DESIGN.md](../../../DESIGN.md) 가 단일 SoT 이고,
이 문서는 그 기준을 **어떻게 작업으로 옮기는가**(분석 → 판단 → 생성 → 검증)만 다룬다. DESIGN.md 의 내용을 반복하지 않는다.

## DDS 생성 원칙 (가장 먼저 읽을 것)

- **목표는 시스템을 만드는 것이다.** 화면(페이지)을 하드코딩하지 않는다. Figma 를 기준으로 **재사용 가능한 컴포넌트**를 쌓는다.
- **DDS 의 목적은 컴포넌트 수를 늘리는 게 아니라, 재사용 가능한 시스템을 유지하는 것이다.** 컴포넌트가 많아질수록 일관성은 깨지기 쉽다.
- **기존 DDS 재사용이 1순위.** 신규 컴포넌트 생성은 **마지막 선택지**다.
- **Figma = 디자인 원천(SoT).** 토큰에 없는 값을 임의로 만들지 않는다. 막히면 멈추고 묻는다.

## 신규 컴포넌트 생성 전 — 재사용 검토 절차 (필수)

새 DDS 컴포넌트를 만들기 전에 **반드시 아래 순서로** 확인한다. 위에서 해결되면 거기서 멈춘다.

1. **기존 ui 컴포넌트로 해결 가능한가?** — 같은/유사 primitive 가 이미 있으면 그것을 쓴다.
2. **기존 module 조합으로 해결 가능한가?** — ui 들을 조합한 기존 module 로 충족되는지 본다.
3. **기존 컴포넌트의 variant 확장으로 해결 가능한가?** — prop/variant 추가로 흡수되면 새 컴포넌트 대신 확장한다 (단, variant 가 상호작용 모델까지 바꾸면 별도 컴포넌트 — DESIGN.md › Component Architecture › 배치 결정 참고).
4. **page / domain 전용인가?** — 특정 화면·캠페인 전용 1회성이면 DDS 가 아니라 app-domain 으로 분리한다.
5. **실제 재사용 가능성이 있는가?** — 두 곳 이상에서 같은 형태로 쓰일 근거가 있는가.

> **위 조건을 만족하지 않으면 DDS 컴포넌트를 신규 생성하지 않는다.** (1~3 에서 해결되면 재사용/확장, 4 면 app-domain, 5 가 없으면 보류.) 판단이 애매하면 사용자에게 확인한다.

## 스택 전제 (반드시 지킬 것)

- **Nuxt 2 / Vue 2.** `<script setup>` 은 Vue 3 전용이라 **사용 불가**. `<script>` 에 **Options API** 로 쓴다.
- **순수 JavaScript. TypeScript 안 쓴다.** `lang="ts"`, `.types.ts`, `defineProps<T>()`, 타입 애노테이션 금지.
  props 타입은 Vue 의 `props: { ... }` 런타임 정의(`type`/`default`/`validator`)로 표현한다.
- **Tailwind 안 쓴다. CVA 안 쓴다.** utility class(`bg-*`, `text-body-5`, `h-48`)도, `cva()` 도 쓰지 않는다.
  스타일은 **`<style scoped lang="scss">`** 에 작성하고 값은 **DDS CSS 변수 `var(--dds-*)`** 로 참조한다.

## 절대 규칙 (이걸 어기면 디자인 시스템이 무너진다)

1. **하드코딩 금지.** `padding: 13px`, `font-size: 15px`, `border-radius: 7px`, `color: #646f7c` 처럼
   raw 값을 직접 쓰지 않는다. 모든 시각 속성은 `var(--dds-*)` 로만 표현한다.
2. **semantic 토큰 우선.** 색은 `palette` 직접 사용 지양. 목적 기반 semantic 변수를 쓴다
   (예: 본문색 `#646F7C` 는 `--dds-color-palette-gray-500` 이 아니라 `--dds-color-text-secondary`).
3. **Figma 값이 토큰에 없으면 멈추고 묻는다.** 임의로 가장 가까운 값을 끼워넣지 말 것. 디자이너 측
   누락이거나 새 토큰이 필요한 신호다. 사용자에게 어떤 토큰을 쓸지 확인한다.
4. **Figma 우선 — 추정 구현 금지.** Figma 에 정의되지 않은 내용을 추정해서 구현하지 않는다.
   토큰·상태·인터랙션·variant·레이아웃 규칙 중 **명확히 확인되지 않은 것은 구현하지 않고 사용자에게 확인**한다.
   DDS 의 목적은 디자인을 해석하거나 재창조하는 것이 아니라, **정의된 디자인 원칙과 규칙을 일관된 시스템으로 구현하는 것**이다.
   "아마 이럴 것이다" · "비슷하니까 이렇게 하자" 식의 추정 구현을 금지한다.
5. **기존 컴포넌트 먼저 재사용.** 위 "재사용 검토 절차" 를 통과하지 못하면 신규 생성하지 않는다.

## 토큰 전달 / 공유

- 토큰 값의 source of truth 는 [DESIGN.md](../../../DESIGN.md)(**Foundation** 기준값 · **Token Mapping** 변환 규칙)다.
- 운영(Vue) 컴포넌트는 토큰을 **CSS 변수(`--dds-*`)** 로 참조한다. 이 변수를 정의한 전역 스타일시트
  **`dds-tokens.css`** 를 앱 진입점에서 1회 import 해야 한다. 컴포넌트 scoped SCSS 는 `var(--dds-*)` 만 쓴다.
  - 레퍼런스 토큰 파일: [design-system/src/styles/dds-tokens.css](../../../design-system/src/styles/dds-tokens.css).
    대상 프로젝트에 이 파일(또는 동등 토큰)이 없으면 **먼저 이식하도록 안내**한다. 없으면 `var(--dds-*)` 가 비어 렌더가 깨진다.
- Figma 변수명 → `--dds-*` 변수 변환 규칙은 [DESIGN.md](../../../DESIGN.md) 의 **Token Mapping** 섹션을 참조한다.
  (토큰 정식 값은 **Foundation**, SCSS/BEM 작성 규칙은 **SCSS / BEM** 섹션.)

## 워크플로

### 1. 디자인 읽기 (Figma 분석)

Figma URL 이나 선택된 노드에서 node-id 를 얻고 (URL `?node-id=1-2` → `1:2`), 다음을 수집한다:

- `mcp__figma-desktop__get_metadata` — 노드 구조(레이어 트리, 크기, auto-layout). 큰 노드는 결과가
  파일로 떨어지니 `jq -r '.[].text'` 로 구조를 훑는다.
- `mcp__figma-desktop__get_variable_defs` — 이 노드가 바인딩한 디자인 변수(색/spacing/typography).
  **토큰 매핑의 1차 근거.** 변수가 박혀 있으면 추측 없이 그대로 매핑된다.
- `mcp__figma-desktop__get_screenshot` — 실제 렌더 모습. 레이아웃·정렬·간격 감각을 잡는다.
- `mcp__figma-desktop__get_design_context` — spec(padding/gap/색/typography/radius) 참고용. **여기서 나온 코드는 붙여넣지 않는다**(아래 안티패턴).

variable_defs 에 값이 안 잡히면(raw hex 만 있으면) [DESIGN.md](../../../DESIGN.md) 의
**Token Mapping › hex → semantic 역방향** 표로 변환한다.

### 2. 분류와 배치 (재사용 검토 먼저)

먼저 위 **"재사용 검토 절차"** 를 수행한다. 신규 생성으로 결론 나면 분류한다:
`ui/`(primitive) · `module/`(조합) · `layout/`(골격). 대상에 기존 구조가 있으면 그걸 우선한다.
**단일 컴포넌트가 이 스킬의 범위다 — 페이지 전체를 한 번에 짜지 않는다.**

> **새 컴포넌트 생성보다 기존 DDS 컴포넌트의 재사용 또는 확장을 우선한다.** 동일한 역할의 컴포넌트가
> 이미 존재한다면, 신규 생성 전에 **variant 또는 조합**으로 해결할 수 있는지 먼저 검토한다.

> Nuxt 2 는 `components/` 자동 import 가 켜져 있을 수 있다(`nuxt.config.js` `components: true`). 그러면 배럴 export 가
> 불필요할 수 있으니 대상 관례를 따른다. Vue 2 는 컴포넌트 이름이 **multi-word** 여야 한다
> (eslint `vue/multi-word-component-names`). DDS 는 `DaButton` 으로 짓고 템플릿에선 `<da-button>` (da prefix 소문자).

### 3. 생성 (Vue 2 SFC + Options API + scoped SCSS)

```
ui/DaButton/
├── DaButton.vue   # <script> Options API + <template> + <style scoped lang="scss">
└── index.js       # export { default as DaButton } from "./DaButton.vue"  (자동 import 면 생략 가능)
```

스타일을 별도 파일로 빼지 않는다 — SFC 의 `<style scoped>` 안에 둔다(컴포넌트 응집).

작성 규약 (상세 기준은 DESIGN.md 에 위임):

- **컴포넌트/클래스 네이밍** — `Da{Name}.vue` / 등록명 `<da-{name}>` / 루트 BEM 블록 `da-{name}`. (DESIGN.md › Component Architecture › 네이밍 규칙)
- **props / 이벤트 / slot API** — props 런타임 정의(`type`/`default`/`validator`), 상호작용은 `$emit`/v-model, 삽입 콘텐츠는 slot. (DESIGN.md › Development Rules)
- **상태 표현** — variant/size/state 는 **BEM modifier class**(`da-button--primary`)로, `computed`/`:class` 바인딩이 클래스 배열을 돌려준다. 상태(disabled 등) 스타일은 variant 블록 **뒤**에 두어 source order 로 우선시킨다. (DESIGN.md › SCSS / BEM)
- **토큰** — 모든 시각 속성은 `var(--dds-*)`. (DESIGN.md › Foundation · Token Mapping)

> **구현 정답은 DESIGN.md + 실제 DDS 컴포넌트 소스를 기준으로 삼는다.** 패턴이 필요하면 `design-system/src/components/ui/DaButton/DaButton.vue` 등 **실재하는 컴포넌트**를 직접 열어 참고한다. (이 문서에 코드 예시를 박아두면 실제 구현과 드리프트하므로 두지 않는다.)

### 4. 토큰 변환 (핵심)

[DESIGN.md](../../../DESIGN.md) 의 **Token Mapping** 규칙으로 Figma 속성을 CSS 변수로 바꾼다. 요약:

- 색: semantic 변수명 → `color` / `background-color` / `border-color` 에 `var(--dds-color-*)`.
- spacing/gap/padding: px → `var(--dds-spacing-{n})` (scale 에 있는 값만).
- radius: `border-radius: var(--dds-radius-{small|medium|large|pill})`.
- typography: `font-family: var(--dds-font-family-*)` + size/line/letter 3개 변수 + `font-weight: var(--dds-font-weight-*)`.
- shadow/blur: `box-shadow: var(--dds-shadow-level-{1|2})`, `backdrop-filter: blur(var(--dds-blur-{default|thick}))`.

매핑이 막히면 규칙 3(멈추고 묻기)을 따른다.

### 5. 검증

- 대상 프로젝트 lint(`npm run lint`, eslint `plugin:vue/recommended`)로 통과 확인. TS 가 없으니 타입체크 단계는 없다.
- `dds-tokens.css` 가 전역 로드되는지 확인 — 안 되면 `var(--dds-*)` 가 비어 스타일이 무너진다.
- 데모 페이지(`pages/`)나 Storybook 에 붙여 렌더 확인하거나, 사용자에게 확인 경로를 안내한다.
- screenshot 과 시각적으로 대조: 정렬·간격·색·타이포가 시안과 일치하는지 본다.
- **재사용 검토를 거쳤는지 다시 확인** — 기존 컴포넌트/variant 로 흡수 가능한 것을 신규로 만들지 않았는가.

## 안티패턴 (하지 말 것)

- ❌ **재사용 검토 없이 새 컴포넌트부터 만들기** — 기존 ui/module/variant 로 해결되는지 먼저 본다.
- ❌ Tailwind utility(`class="bg-... text-body-5 h-48"`) 나 CVA(`cva()`) 사용 — 대상엔 Tailwind 가 없다.
- ❌ Vue 3 문법: `<script setup>`, `defineProps`/`defineEmits`, `lang="ts"`, Composition API import.
- ❌ TypeScript: 타입 애노테이션, `.types.ts`, 제네릭 props. props 타입은 런타임 `props: {}` 로만.
- ❌ raw 값 하드코딩(`#161d24`, `15px`, `8px`) — 항상 `var(--dds-*)`.
- ❌ `get_design_context` 가 뱉은 코드를 그대로 붙여넣기 — spec(수치·색·타이포)만 읽고 Vue2 SFC + SCSS 로 작성한다.
- ❌ 토큰에 없는 색/간격을 "비슷하니까" 끼워넣기 — 규칙 3 위반.
- ❌ `dds-tokens.css` 가 대상에 없는데 컴포넌트부터 만들기 — 토큰 이식 먼저.
- ❌ Vue 2 단어 1개 컴포넌트명(`Button.vue`). multi-word `Da{Name}`(`DaButton`)로.
- ❌ DESIGN.md 의 토큰 값·BEM 규칙을 이 문서에 복제 — 참조만 하고 SoT 는 DESIGN.md 에 둔다.

**디자인 추정 구현 금지**

- ❌ Figma 에 없는 상태를 임의로 추가
- ❌ 정의되지 않은 hover/pressed 상태 생성
- ❌ variant 추정 생성
- ❌ 토큰이 없는 값을 근사치로 대체
- ❌ 디자인과 다른 인터랙션 추가
- ❌ 기존 DDS 패턴과 다르게 해석

> 확인되지 않은 내용은 **구현보다 확인을 우선**한다.
