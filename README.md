# daiso-admin — DDS (Daiso Design System)

**다이소몰의 디자인 시스템을 만들고, 페이지로 조립해 검증하는 저장소.**

- **`design-system/`** — `@daiso/design-system`. Vue 2.7 컴포넌트 라이브러리(`Da*`).
- **`daiso-test/`** — 라이브러리를 import 해 페이지 단위로 조립·검증하는 Nuxt2 프로토타입.

---

## Source of Truth

모든 디자인·구현 의사결정은 **[DESIGN.md](DESIGN.md)** 를 기준으로 한다. 철학·토큰·컴포넌트 규칙·QA가 여기 있다.
디자인 원천은 **Figma**, 운영 토큰은 `design-system/src/styles/dds-tokens.css`(`--dds-*`).

## 읽는 순서

1. **[DESIGN.md](DESIGN.md)** — 디자인·구현 기준 (SoT).
2. **[CLAUDE.md](CLAUDE.md)** — AI 작업 규칙.
3. **[.claude/skills/dds-component/SKILL.md](.claude/skills/dds-component/SKILL.md)** — 컴포넌트 생성·유지보수 절차.

## 구조

단방향 의존: `Foundation Token → ui → module → layout → page`. page는 조립만.

```
design-system/   @daiso/design-system 라이브러리
  styles/dds-tokens.css        운영 토큰 (--dds-*)
  components/{ui,module,layout}/
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
