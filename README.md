# daiso-admin — DDS (Daiso Design System)

## 프로젝트 목적

**DDS(Daiso Design System) + 페이지 조립 검증 저장소**다. 역할을 둘로 분리한다.

- **`design-system/`** — `@daiso/design-system`. Vue 2.7 컴포넌트 **라이브러리**.
- **`daiso-test/`** — Nuxt2/Vue2 **페이지 조립·검증 테스트 앱**. 라이브러리를 import 해 페이지 단위로
  조립하고 검증하는 **개발자 전달용 프로토타입**.

- 디자인 원천: **Figma**
- 운영 토큰 SoT: `design-system/src/styles/dds-tokens.css` (`--dds-*`)
- 컴포넌트 규약: `Da{Name}.vue` / 루트 클래스 `da-{name}` / 토큰 `var(--dds-*)`
- 스택: Vue 2.7 · Options API · 순수 JS · scoped SCSS · BEM **(Tailwind / TypeScript / React / Composition API 금지)**

## DDS 구조

```
Foundation Token  design-system/src/styles/dds-tokens.css   색·타이포·spacing·radius·effect (--dds-*)
      ▼
ui (primitive)    design-system/src/components/ui/          단일 책임 컴포넌트
      ▼
module (composed) design-system/src/components/module/      ui 조합 도메인 단위
      ▼
layout            design-system/src/components/layout/       페이지 셸
      ▼
page (daiso-test)                                           조립·검증
```

단방향 의존(`Foundation → ui → module → layout → page`). 역방향 금지, page 는 조립만.

## 문서

| 문서 | 역할 |
|---|---|
| **[DESIGN.md](DESIGN.md)** | 운영의 단일 SoT — 설계 원칙 · 토큰 값 · Token Mapping · 컴포넌트 사용 기준 · SCSS/BEM 규칙 · QA |
| **[.claude/skills/dds-component/SKILL.md](.claude/skills/dds-component/SKILL.md)** | Figma 기준 DDS 컴포넌트 생성·유지보수 스킬 (Claude 작업 절차·규칙) |
| **[CLAUDE.md](CLAUDE.md)** | 진입점 — repo 정체성·작업 방향·기준 문서 안내 |

## design-system 구조

```
design-system/
  package.json                 # @daiso/design-system, Vue 2.7 peer
  vite.config.js               # 라이브러리 빌드 + playground dev 하네스
  src/
    index.js                   # barrel — 전 컴포넌트 install() 전역 등록 + named export
    styles/dds-tokens.css      # --dds-* 운영 토큰 (SoT)
    components/
      ui/        # 14 primitive — DaButton · DaChip · DaChipsFilter · DaDropdown · DaTextInput ·
                 #   DaAccordion · DaAccordionBulletList · DaTab · DaTabGroup · DaPopover ·
                 #   DaActionArea · DaButtonChip · DaDivider · DaIcon
      module/    # 6 composed — DaReviewCard · DaOrderSection · DaDeliveryBadge ·
                 #   DaFlagReview · DaUserRankingHeader · DaReviewIncentiveBanner
      layout/    # 1 shell — DaTopNavigation
  playground/                  # dev 전용 Showroom (배포물에 미포함)
```

각 컴포넌트는 `Da{Name}/Da{Name}.vue` + `index.js` 단위.

## playground 실행

`design-system/` 에서 dev 하네스(Showroom)를 띄워 실제 `Da*` 컴포넌트를 확인한다.

```bash
cd design-system
npm install
npm run dev      # vite dev 서버 (playground, http://localhost:5180)
npm run build    # 라이브러리 빌드
```

> playground 는 **DDS 컴포넌트 쇼룸**(라이브러리 단위 확인)이고, 페이지 단위 조립·검증은 아래 `daiso-test` 에서 한다.

## daiso-test 구조 / 실행

`@daiso/design-system` 을 import 해 페이지를 조립·검증하는 Nuxt2/Vue2 앱.

```
daiso-test/
  package.json            # nuxt ^2.17 · vue 2.7 · sass · @daiso/design-system (file:../design-system)
  nuxt.config.js          # css[]: dds-tokens.css + fonts.css · plugins 등록 · transpile
  plugins/design-system.js   # Vue.use(DDS barrel) — Da* 전역 등록
  assets/
    css/fonts.css         # @font-face (host 제공 — dds-tokens 는 family 이름만 정의)
    fonts/                # Pretendard · SUITE · Daiso
  components/             # 페이지 전용 조립 컴포넌트(비-DDS)
  static/                # 페이지 목업 정적 자산
  pages/                 # 페이지 단위 검증 (예: mypage/review)
```

```bash
cd daiso-test
npm install
NODE_OPTIONS=--openssl-legacy-provider npm run dev        # dev 서버
NODE_OPTIONS=--openssl-legacy-provider npm run generate   # 정적 빌드(검증)
```

> Node 24 + Nuxt2(webpack4) 조합에서는 `--openssl-legacy-provider` 플래그가 필요하다.
