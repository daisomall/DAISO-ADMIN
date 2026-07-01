# DDS — Daiso Design System

> 다이소몰 디자인·개발 운영 SoT. 디자이너·퍼블리셔·개발자·AI 공통 참조.
> 원천=Figma. 산출물=`@daiso/design-system`(Vue 2.7·Options API·순수 JS·scoped SCSS·BEM·`var(--dds-*)`). 컴포넌트 `Da{Name}.vue` / 루트 `da-{name}`.

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

# Philosophy
- 디자인 시스템 = 같은 결정을 반복하지 않기(공통 어휘로 학습·결정·중복 감소).
- DDS는 **공통 Primitive만** 담당. 도메인 의미(장바구니·주문·리뷰)=Application 조립.
- **충돌 시:** 명확성·상품 우선 > 심미.
- **Brand:** 무채색 base, 레드(`#D70011`)=CTA·강조·식별 전용. 넓은 면·색값 변경 금지. *WHY: 면적↑=신호↓.*
- **Visual:** 사각형 · 직선 stroke 아이콘 · 그리드 정렬 · 타이포 위계 · 무채색+의미색.

---

# Context
- 다이소몰 = 생활용품 대량·다품목 커머스 → 정보 밀도 높음, 카드/리스트 동일 구조.
- 다품목 스캔·반복 노출 → 전 전문관 동일 룩, UI 크롬 무채색·저채도.
- **역할:** DDS=공통 Primitive(비즈니스 의미 X) / Application=도메인. 공통화되면 module 승격.
- **SoT:** 디자인=Figma · 토큰=`dds-tokens.css`. 구현이 Figma와 다르면 Figma 우선.

---

# Information Hierarchy
- **우선순위:** 상품 이미지 → 가격 → 상품명 → 혜택/배지 → 배송 → 리뷰/평점.
- **위계 수단:** 크기·면적 > 타이포 tier > 여백 > 위치. 색은 위계 수단 아님(의미일 때만).
- 가격: 크게+굵게·**Daiso Font 우선**, 정상가 작게·취소선.
- 강조 중첩 금지. 카드 내 최강 요소는 하나(가격이면 나머지 down).
- 정보 많으면 여백으로 묶기. 접으면 `DaAccordion`(가격은 노출).

---

# Architecture
- **흐름:** Figma → DDS(Token→ui→module→layout) → Application → Page. 의존 단방향, 아래는 위를 모름.
- **ui:** 단일책임 Primitive(토큰만 참조·DaIcon 예외) · **module:** ui 조합 도메인 단위 · **layout:** 화면 골격 · **page:** 조립만(신규 primitive 정의 금지→module 승격).
- **Primitive:** 비즈니스 의미 X·전 화면 재사용 · **Domain:** 의미 O·Primitive 조합·도메인 상태(품절/배송중).
- Primitive에 도메인 prop/로직 금지(`DaButton`에 addToCart X). Domain은 토큰 직접보다 Primitive 조합.
- 1회성 UI=Application. 공통=DDS. 모호하면 도메인 두고 반복 시 승격.
- 1파일 1컴포넌트. 화면특화(FilterBar/CategoryRail)=Application.

---

# Decision Flow (신규 UI)
```
[1] 기존 Component로 되는가?        → Yes: 사용
[2] 기존 Variant(기존 축 값)로?     → Yes: 값 추가
[3] 기존 Component 조합으로?         → Yes: module 조합
[4] 정말 신규 필요?                 → 디자인 리뷰·합의 후 추가
```
- 통과 기준: [1]의미·상호작용 일치 / [2]기존 축에 값만(새 축=신규) / [3]Primitive 조합 가능 / [4]반복 공통 패턴.
- **기본값=[1] 재사용.** *WHY: 신규는 유지·문서·테스트 비용 누적.*
- **신규 Component:** 다른 페이지 2회+ 반복 시만. 1회성=Application.
- **Variant:** 디자인 리뷰 이후에만.

---

# Foundation (디자인 기준)
**Rules**
- Figma 1:1. 임의값(hex/px/rem·arbitrary) 금지 → `var(--dds-*)`.
- semantic 우선. palette는 semantic이 못 덮을 때만.
- Radius=2·4·8(small/medium/large)만. pill(1000)=완전 원형 전용.
- 그림자=필요할 때만(기본 무그림자).
- scale 밖 값(36/40/120)=calc 합성, 신규 생성 금지.
- Typography=family+tier(size/line/letter)+weight 함께 지정(누락 금지).

**Reference (토큰 값)**

**Color · Palette**

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| `palette/brand/red`(불변) | `#D70011` | | `gray/400` | `#C5C8CE` |
| `palette/brand/black` | `#111111` | | `gray/500` | `#646F7C` |
| `palette/brand/white` | `#FFFFFF` | | `gray/600` | `#374553` |
| `gray/200` | `#F7F8F9` | | `gray/700` | `#28323C` |
| `gray/300` | `#E9EBEE` | | `gray/800` | `#161D24` |

**Color · Semantic**

| Token | 참조 | | Token | 참조 |
|---|---|---|---|---|
| `text/primary` | gray-800 | | `bg/base/white`·`elevated` | white |
| `text/secondary` | gray-500 | | `bg/base/black` | gray-800 |
| `text/disable`·`placeholder` | gray-400 | | `bg/grouped` | gray-200 |
| `text/white` | white | | `bg/disabled` | gray-300 |
| `stroke/basic1` | gray-200 | | `stroke/basic2` | gray-300 |

**Dim · Shadow** (`#111111`/`#FFFFFF` + α): dim-black thick90/basic60/thin30/subtle10 · dim-white thick60/basic20/thin15 · shadow basic15/thin10.
**Gradient · Service:** `gradient/highlight`=red→gray-800 · `gradient/ai`=`#59ACFF`→`#2000D7` · service beauty `#81D6D0`/`#30CC8D` · fashion `#00946E`.

**Typography** — family: Pretendard(본문/caption)·SUITE(display/heading)·**Daiso(promo·가격)**. weight 400/500/700/800.

| Tier | family | Size/Line/Letter |
|---|---|---|
| display-1/-2 | SUITE | 54/66/-2 · 42/54/-2 |
| heading-1..6 | SUITE | 42/52/-2 · 24/32/-2 · 20/28/-1 · 18/24/-1 · 16/22/-1 · 14/20/-1 |
| body-1..7 | Pretendard | 24/30/0 · 20/26/0 · 18/24/0 · **16/22/0(기본)** · 15/21/0 · 14/19/0 · 13/18/0 |
| caption-1..3 | Pretendard | 12/16/0 · 11/15/0 · 10/14/0 |

**Spacing** — scale(13단계·비등간): `2·4·6·8·10·12·16·20·24·32·48·64·72`px (3·40 없음). semantic(mo/pc): page-margin 20/20 · scroll-end 48/48 · title-bottom 16/32 · section 48/72 · tab 12/24 · module-set 16/48.
**Radius / Effect · Layout** — 2/4/8→small/medium/large · 1000→pill. shadow Level1/2 · blur default/thick 8/25px. breakpoint-pc 1024 · container-pc 1280. (dark mode 미정의→부록 D)

---

# Token Mapping (Figma → `--dds-*`)
**Summary:** 근거 우선순위 ①`get_variable_defs` 변수명 ②raw hex면 역방향 표. 토큰 밖 값=매핑 중단·확인. 속성: 글자 `color`/배경 `background-color`/테두리 `border-color`.

**Detail**
**semantic 변수명** → `var(--dds-color-*)`: `text/{primary,secondary,disable,placeholder,white}`→`text-*` · `background/{base/white,base/black,elevated,grouped,disabled}`→`bg-*` · `stroke/{basic1,basic2}`→`stroke-*` · `dim/{black,white}/*`→`dim-*-*`.
**palette**(지양) → `var(--dds-color-palette-{brand-red|brand-black|brand-white|gray-200..800})`.

**hex → semantic 역방향**

| hex | semantic | palette |
|---|---|---|
| `#161D24` | text-primary / bg-base-black | gray-800 |
| `#646F7C` | text-secondary | gray-500 |
| `#C5C8CE` | text-disable/-placeholder | gray-400 |
| `#FFFFFF` | text-white / bg-base-white | brand-white |
| `#F7F8F9` | bg-grouped / stroke-basic1 | gray-200 |
| `#E9EBEE` | bg-disabled / stroke-basic2 | gray-300 |
| `#374553`/`#28323C` | — | gray-600 / gray-700 |
| `#D70011`/`#111111` | (브랜드) | brand-red / brand-black |

투명도 hex(`#11111199`)=`dim-*`/shadow. **Spacing:** scale 값만 px→`var(--dds-spacing-{n})`, 밖이면 확인(고정높이는 line-height 합산: pt14+line21+pb13=48→spacing-48). **Radius:** 2/4/8/1000→small/medium/large/pill.
**Typography 5묶음:** `font-family:var(--dds-font-family-{pretendard|suite|daiso})` + `--dds-font-{tier}-{size|line|letter}` + `--dds-font-weight-{regular|medium|bold|extrabold}`. 단서: Heading/Display=SUITE, 본문=Pretendard, 가격=Daiso.
**Effect/Gradient:** `box-shadow:var(--dds-shadow-level-1/-2)` · `blur(var(--dds-blur-default/-thick))` · `var(--dds-breakpoint-pc/-container-pc)` · `var(--dds-gradient-highlight/-ai)`(합성됨) · `var(--dds-color-service-*)`.
**운영:** SoT=`dds-tokens.css`(전역 주입). 갱신순서 Figma→DESIGN.md→tokens.css. 웹폰트(@font-face)는 host 앱.

---

# Layout
- **간격=관계.** 가까우면 한 묶음, 멀면 분리. 큰 구획=큰 간격.
- 영역 구분은 여백 먼저. Divider는 여백으로 안 될 때만. 그림자도 elevation 필요할 때만.
- **Spacing Hierarchy(4단위):** Section(48/72) > Module(16/48·title-bottom 16/32) > Component(8·12·16) > Element(2·4·6·8).
- **Grid:** 카드/리스트 열 정렬, gutter=scale, 폭=컨테이너 비율(고정 px 아님).
- **Alignment:** 묶음 내 기준선 정렬(기본 좌측·숫자 우측). 카드 간 같은 역할=같은 세로선.
- **Baseline:** line-height 리듬 일치. 가격+"원"=baseline 정렬. 아이콘=텍스트 중심.
- **Container:** page-margin 20 · container-pc 1280 max-width(초과 시 중앙). 최소 320px 유지.

---

# Interaction & Motion
- **원칙:** 모션=상태 변화·제스처 설명(장식 X) · 빠르고 자연(작은 80~200ms·큰 ≤300ms) · 방향=의미 일치.
- `transition`=바뀌는 속성만(`all` 금지). 등장 ease-out / 퇴장 ease-in. 상태 변화 없으면 모션 없음.
- **페이지 전환:** 진입=앞으로, 뒤로가기=반대. 같은 깊이 탭=방향성 없이 교체.
- **Swipe:** 손가락 1:1 추종, 임계점 전 복귀 가능. *WHY: 통제감.*
- **Bottom Sheet:** 아래→위, 뒤 dim, dim 탭/아래 스와이프로 닫힘. 맥락 유지 보조작업.
- **Dialog:** 중앙 페이드+스케일(0.96→1), dim 차단, 명시적 행동으로만 닫힘. 결정 요구 시.
- **Toast:** 비차단·자동 소멸(알림 전용). **Popover:** 트리거 근처·바깥 클릭 닫힘.
- **Loading:** 긴 작업만 스켈레톤(자리 유지·튐 방지), 짧으면 생략.
- Reduced Motion 존중(기능 유지).

---

# Accessibility
- **Touch:** 탭 타깃 ≥44×44px(작은 아이콘은 패딩), 인접 타깃 간격 확보.
- **Contrast:** 본문 ≥4.5:1, 큰 글자/아이콘 ≥3:1. 색만으로 의미 전달 금지(색+텍스트/아이콘).
- **Keyboard/Focus:** 전 인터랙티브 키보드 도달, `outline:none`만 금지→`:focus-visible`, 포커스 순서=읽기 순서, 모달=포커스 트랩.
- **Semantics:** 역할 맞는 요소/aria(`<button>`·`aria-pressed/selected`·`disabled`), 아이콘 버튼 `aria-label`, 상품 이미지 `alt`(장식 `alt=""`).
- **Reduced Motion:** `prefers-reduced-motion`서 큰 모션→페이드/즉시, 정보 유지.

---

# Component Guideline
형식 통일: **Purpose / Do / Don't / A11y / Ref(혼동 시 대체)**. 같은 목적에 다른 컴포넌트 혼용 금지.

| Component | Purpose | Do | Don't | A11y | Ref |
|---|---|---|---|---|---|
| **DaButton** | 명시적 행동 | primary 화면당 1개·동사 라벨, 보조=tertiary | primary 남발·이동 남용·임의 레드 채움 | `<button>`·aria-label·disabled | 선택→DaChip·뷰전환→DaTab·필터→DaButtonChip |
| **DaChip** | on/off 선택 상태 | 선택은 부모(`selected`)·그룹은 DaChipsFilter | 제출/내비·장식용 | `aria-pressed` | 즉시 액션→DaButtonChip |
| **DaButtonChip** | 액션/필터 트리거(emit) | 트리거 후 emit | 선택 토글 | `aria-haspopup/expanded` | DaChip과 통합 금지(모델 다름) |
| **DaDropdown** | 옵션 단일 선택 | placeholder 안내·간결 라벨 | 2~4개 숨김·옵션 내 액션 | `role=listbox`·방향키 | 자유입력→DaTextInput·실행→DaButton |
| **DaTextInput** | 자유 텍스트 | 라벨 항상 제공·에러 `--error` | placeholder를 라벨 대용 | `<label>`·`aria-invalid/describedby` | 옵션선택→DaDropdown |
| **DaTab/DaTabGroup** | 상호배타 뷰 전환 | TabGroup이 선택 관리·짧은 라벨·`count` 의미 있을 때 | 다른 맥락 혼합·스텝·과다 스크롤 | `role=tablist/tab/tabpanel`·`aria-selected` | 필터→DaChipsFilter |
| **DaAccordion/BulletList** | 보조·상세 접기 | 예측 가능 제목·기본 접힘 | 핵심(가격) 숨김·과중첩 | `aria-expanded/controls` | 뷰전환→DaTab |
| **DaPopover** | 트리거 근처 임시 정보 | 바깥 클릭 닫힘 | 차단형 핵심 플로우 | `aria-haspopup`·ESC | 차단 필요→Dialog/Sheet |
| **DaDivider** | 영역 구분(최후) | 여백으로 안 될 때만·`stroke/basic1·2` | 남발 | — | 1px=부록 D |
| **DaIcon** | 공통 glyph(stroke·직선) | 도메인 전용은 로컬 정의 | 임의 채움 아이콘 | 의미=`aria-label`·장식=`aria-hidden` | — |
| **module** (DaReviewCard·DaOrderSection·DaDeliveryBadge…) | Primitive 조합 도메인 단위 | 위계(Information Hierarchy) 준수·Primitive 조합 | 새 색/간격 직접·Primitive에 도메인 로직 | 구성 Primitive 상속 | Architecture |

---

# Anti-Patterns
| 어긋남 | WHY | 올바름 |
|---|---|---|
| 요청 즉시 신규 생성 | 유사 중복 증가 | Decision Flow 재사용 먼저 |
| 토큰 밖 spacing 생성 | 체계 붕괴 | calc 합성/확인 |
| hex·px·rem 직접 | 일괄변경 불가 | `var(--dds-*)` |
| arbitrary value(`p-[13px]`) | 체계 우회 | 토큰 변수 |
| Radius 2·4·8 외 사용 | 형태 일관성 붕괴 | 2·4·8(+pill) |
| Primitive에 도메인 의미 | 재사용성 상실 | module/App 조합 |
| 색으로 위계 | 의미 신호 약화 | 크기·굵기·여백 |
| 레드 넓은 면 채움 | 주목 효과 상실 | 행동·강조만 |
| Divider·그림자 남발 | 시각 소음 | 여백 먼저 |
| 핵심(가격) 접기 | 결정 정보 누락 | 항상 노출 |
| 의미 없는 모션 | 대기감 | 상태·제스처만 |
| `outline:none`만 | 키보드 위치 상실 | `:focus-visible` |
| DaChip↔DaButtonChip 통합 | 모델 모호 | 분리 |
| 페이지마다 다른 패턴 | 학습 비용↑ | 기존 패턴 재사용 |
| Figma 무시·코드 기준 | 기준 분열 | Figma 우선 |

---

# Good / Bad Examples
- **버튼 위계:** ✅ 담기=primary, 바로구매=tertiary / ❌ 셋 다 primary(강조=무강조). →Philosophy·Component Guideline
- **가격 강조:** ✅ Daiso Font 크게·굵게 + 정상가 작게·취소선 / ❌ 배경+테두리+굵게 중첩(레드 면적↑). →Information Hierarchy
- **간격 토큰:** ✅ `calc(var(--dds-spacing-32)+var(--dds-spacing-4))` /36/ ❌ `padding:36px`. →Foundation·Token Mapping
- **색:** ✅ `var(--dds-color-text-secondary)` / ❌ `#646F7C`(의미 소실). →Foundation·Token Mapping
- **컴포넌트 선택:** ✅ 필터토글=DaChip(`aria-pressed`)·정렬열기=DaButtonChip / ❌ 전부 DaButton. →Architecture·Component Guideline
- **정렬:** ✅ 카드마다 상품명·가격 시작점 동일 세로선 / ❌ 들쭉날쭉(스캔 지연). →Layout

---

# QA Checklist (디자인 리뷰 그대로 사용)
- [ ] **판단 3질문:** 상품이 먼저 보이는가 · 가격이 먼저 인지되는가 · 정보가 빠르게 읽히는가.
- [ ] Decision Flow 거침 · 기존 패턴 재사용 · 새 Rule(토큰/색/radius/축) 미생성 · Primitive/Domain 미혼용 · 1회성=Application.
- [ ] Figma 일치(색·간격·타이포·형태·state별) · 임의값 미충전.
- [ ] 전부 토큰(raw hex/px 0) · semantic 우선 · scale 밖=calc · typography 5묶음 · Radius 2·4·8 · 가격=Daiso Font.
- [ ] 위계=크기/굵기/여백 · 4단위 spacing(mo/pc) · 정렬 · 레드 포인트만 · 320px 유지 · Divider/그림자 남발 없음.
- [ ] 모션=상태·제스처·방향 일치 · touch 44px·대비·focus · aria·Reduced Motion.
- [ ] 같은 의미 동일 형태 · 페이지 간 패턴 일관 · Anti-Patterns 위반 없음.

---

# Governance
- **변경 흐름:** Figma → DESIGN.md → dds-tokens.css → 컴포넌트. 구현 선반영 금지(Foundation·Figma 우선).
- **신규 Component:** 다른 페이지 2회+ 반복 시만 검토. 1회성=Application, 반복=module 승격. Component Guideline 형식 작성.
- **Variant:** 디자인 리뷰 이후 추가. **토큰:** Figma 변수 정의 후 추가(코드가 발명 X), 값 변경은 영향 범위 확인.
- **미정의 영역**(dark/alpha/1px)=부록 D 보류. 임의 처리 금지.
- **보류 상황:** scale 밖 값·재사용/Variant/조합 불가·새 색/컴포넌트/패턴·Figma 충돌 → 막힌 점·후보·필요 결정 정리해 합의.

---

# AI Agent Rules
> 에이전트를 직접 대상으로 삼는 유일한 절. 나머지 규칙은 모든 작업에 공통.
- **항상:** Decision Flow 재사용 먼저 · `var(--dds-*)`만 · semantic 우선 · Figma 기준 · 위계(Information Hierarchy·Layout) · 접근성(Accessibility).
- **금지:** 새 토큰/색(brand 불변)/Variant 축/radius·spacing 생성 · Primitive·Domain 혼용 · page 신규 primitive · 미정의 영역 추측.
- **보류:** Governance 상황 → 임의 진행 X, 막힌 점·후보·결정 정리 후 확인. *WHY: 오값 전파 비용 > 멈춤 비용.*
- **작업 후:** QA Checklist + Anti-Patterns 대조.

---

# 부록 (구현 참조)

## A. SCSS / BEM
- scoped만(전역 금지), 1 SFC=1 block(root). 중첩은 BEM(`&__el`/`&--mod`)만, 요소 selector 중첩 금지.
- 자식 침투는 `::v-deep` 최소(>>> 금지). raw값 금지→`var(--dds-*)`/합성. `transition` 변경 속성만. `!important` 금지.
- **BEM:** block `da-{c}` / element `da-{c}__{part}`(소속·2단 금지→평탄화) / modifier `da-{c}--{mod}`(variant·size·state, presentational명 금지). modifier는 base와 함께.
- **`:class`:** 값형=템플릿리터럴, boolean=객체. 선언순서 base→variant→size→state(끝). 다분기=조합 selector(`&--selected.da-chip--disabled`).
- **상태:** focus=`:focus-within/-visible` · hover=`:hover` · disabled=`--disabled`(+`:disabled`) · 동적=modifier 토글.
- 금지: raw hex/px/rem · 미변환 prefix(`--spacing-scale-*`) · `@apply`/Tailwind/CVA/`cn()` · 요소·id selector·`!important` · 전역·`::v-deep` 남용 · presentational명·magic number.

## B. Vue2 / Nuxt2
- props camelCase + `type`/`default`/`validator`. 배열·객체 default=factory(`()=>[]`). Boolean=미전달 시 false 캐스팅.
- 부모 class/style 자동 병합(`className` prop X, 차단=`inheritAttrs:false`). 상호작용=emit/v-model(콜백 X), 이벤트명·payload 상단 주석.
- 삽입=slot(기본/named/scoped 1개). SSR: `window/document`는 `mounted` 이후, 리스너 `mounted` 등록/`beforeDestroy` 해제. 브라우저 API=`<client-only>`/`process.client`.
- 단일 SFC: `<template>`→`<script>`(Options)→`<style scoped lang="scss">`. 토큰 CSS 전역 주입 선행. barrel `src/index.js`=`install()`+named export.
- 네이밍: `DaButton.vue`/등록 `da-button` · props camelCase · BEM 클래스 · `--dds-*` 토큰 · emit/v-model. 빌드 `npm run build` 통과. Tailwind/TS/Composition API 금지.

## C. Responsive
- 모바일 우선. 최소 320px 유지. breakpoint-pc=1024(768–1023은 tablet 분기 없이 모바일 반응형 확장). container-pc=1280 max-width.
- 미디어쿼리·최대폭=`var(--dds-breakpoint-pc/-container-pc)`. semantic spacing은 mo/pc 2값(section 48/72, title-bottom 16/32).

## D. Known Gaps (만나면 확인, 임의 처리 금지)
- **Dark mode** — 토큰 미정의·비활성. 생기면 semantic 재바인딩.
- **Alpha 토큰** — alpha 변형색 단일 `var(--dds-*)` 규칙 없음.
- **1px hairline** — scale 최소 2px라 divider/탭 underline 1px가 scale 밖. 예외 규칙 미명문화.
