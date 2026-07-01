# CLAUDE.md — AI Operating Manual

AI가 작업을 시작하기 전에 반드시 읽는 문서. 작업 순서와 판단 원칙만 정의한다.
프로젝트 소개는 [README.md](README.md), 디자인 기준은 [DESIGN.md](DESIGN.md)를 따른다.

## Scope
- 현재 단계: `daiso-test`에서 `Da*` 컴포넌트를 조립해 페이지를 검증한다.
- 첫 구현 대상: 마이페이지 > 리뷰 화면.
- 라이브러리(`@daiso/design-system`) 컴포넌트 구축은 완료 상태.

## Priority
1. DESIGN.md 원칙 > 개인 판단.
2. 기존 컴포넌트 재사용 > 신규 생성.
3. Foundation 토큰 > 임의 값.
4. Figma > 구현 편의.

## Read First
- [DESIGN.md](DESIGN.md) — 디자인·구현의 단일 SoT. TL;DR + 관련 섹션을 먼저 읽는다.
- [.claude/skills/dds-component/SKILL.md](.claude/skills/dds-component/SKILL.md) — Figma 기준 컴포넌트 생성·유지보수 절차.

## Workflow
1. Read DESIGN.md before implementation.
2. Decision Flow로 재사용 여부를 먼저 판단한다.
3. Reuse existing components before creating new ones.
4. Use only `var(--dds-*)` tokens.
5. 작업 후 QA Checklist + Anti-Patterns로 대조한다.

## Implementation Rules
- 모든 구현 규칙(스택·네이밍·토큰·SCSS/BEM)은 DESIGN.md를 따른다. 이 문서에서 반복하지 않는다.

## Never
- Never implement patterns that are not defined in DESIGN.md.
- Never create new tokens, colors, radius, or components on your own.
- Never use raw hex/px, Tailwind, TypeScript, React, or Composition API.
- Stop and ask if a new token or component is required.

## Before Done
- [ ] DESIGN.md QA Checklist 통과.
- [ ] Anti-Patterns 위반 없음.
- [ ] 신규 토큰·컴포넌트·패턴 미생성.
- [ ] `npm run build` 통과.
