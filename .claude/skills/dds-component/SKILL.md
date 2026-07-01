---
name: dds-component
description: >-
  Figma 디자인을 기준으로 DDS(Daiso Design System) 컴포넌트를 생성·유지보수할 때 사용한다.
  사용자가 Figma 링크·노드를 주며 "이거 컴포넌트로 만들어줘", "DDS 컴포넌트로 추가해줘", "디자인대로 만들어줘"
  라고 하거나, 버튼·인풋·카드·뱃지 같은 UI 요소를 디자인 기준으로 만들 때, figma.com URL(node-id 포함)이 등장할 때 쓴다.
---

# DDS Component — 구현 절차 (Skill)

이 문서는 **"AI 가 DDS 컴포넌트를 어떻게 구현하는가"** 만 다룬다(분석 → 판단 → 생성 → 검증).
디자인 철학·Foundation·Token·Component 규칙은 [DESIGN.md](../../../DESIGN.md), 프로젝트 스택·구현 관례는 [CLAUDE.md](../../../CLAUDE.md) · DESIGN.md(Development Rules)를 따르며 **여기서 다시 설명하지 않는다**.

## 원칙

- 기존 DDS **재사용 우선**.
- 신규 생성은 **마지막 선택**.
- 판단이 어려우면 **사용자에게 확인**(추정 금지).

## 재사용 검토 (신규 생성 전 필수)

위에서 해결되면 거기서 멈춘다.

1. 기존 ui 컴포넌트로 되는가? → 재사용.
2. 기존 module 조합으로 되는가? → 조합.
3. variant/prop 확장으로 되는가? → 확장(단, 상호작용 모델이 바뀌면 별도 컴포넌트 — DESIGN.md › Component Architecture › 배치 결정).
4. page/domain 1회성인가? → DDS 아님, app-domain 으로.
5. 두 곳 이상 재사용 근거가 있는가? → 없으면 보류.

> 위를 통과하지 못하면 신규 생성하지 않는다. 애매하면 사용자에게 확인한다.

## 절대 규칙

- **DESIGN.md 를 따른다**(토큰·형태·상태·인터랙션).
- **토큰에 없는 값은 구현하지 않는다.**
- **추정 구현하지 않는다.**
- **확인이 필요하면 질문한다.**

나머지 세부 기준은 DESIGN.md 를 참조한다.

## Workflow

1. **Figma 분석** — 아래 MCP 순서로 읽는다.
2. **기존 DDS 검색** — 같은/유사 컴포넌트·variant 가 있는지.
3. **재사용 여부 판단** — 위 "재사용 검토". 신규면 `ui/module/layout` 분류.
4. **DESIGN.md 확인** — 구현 직전 관련 명세(Foundation · Token Mapping · Component Usage · Design Rules)를 대조한다. 값·형태의 원천은 DESIGN.md.
5. **Component 구현** — 단일 컴포넌트 단위(페이지 전체 X). 작성 관례는 DESIGN.md › Development Rules · SCSS/BEM, 토큰은 DESIGN.md › Foundation · Token Mapping. 실제 패턴은 기존 `Da*` 소스를 연다.
6. **QA** — 아래 체크리스트.

### Figma MCP 사용 순서

1. `get_metadata` — 노드 구조(레이어·크기·auto-layout).
2. `get_variable_defs` — 바인딩된 디자인 변수. **토큰 매핑 1차 근거**(값 안 잡히면 DESIGN.md › Token Mapping › hex → semantic 역방향).
3. `get_screenshot` — 렌더 확인(정렬·간격 감각).
4. `get_design_context` — spec 참고용. **출력 코드는 붙여넣지 않는다.**

### 토큰

토큰 적용(색·간격·타이포·radius/shadow)은 DESIGN.md 의 **Foundation · Token Mapping** 을 따른다.
전역 토큰(`@daiso/design-system/style.css`) 로드가 선행돼야 한다(없으면 렌더가 깨진다).

## QA 체크리스트

- [ ] Figma 와 일치(정렬·간격·색·타이포).
- [ ] 토큰만 사용(raw 값 없음) · 없는 값은 미구현·확인.
- [ ] Build/lint 통과.
- [ ] **마지막 재확인**: 이 구현이 기존 Component·Variant 로 해결 가능하지 않았는가(신규였다면 근거가 충분한가).

## 안티패턴

- ❌ 추정 구현(미확인 상태·hover·variant·인터랙션 창작).
- ❌ 하드코딩(raw hex/px) — 토큰만.
- ❌ 기존 DDS 무시하고 새로 만들기.
- ❌ `get_design_context` 코드 그대로 복사.
- ❌ 확인 없이 신규 토큰 생성.

> 확인되지 않은 내용은 **구현보다 확인을 우선**한다.
