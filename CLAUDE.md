# CLAUDE.md — AI Operating Manual

AI가 작업 전 반드시 읽는다. 작업 절차·판단 기준만 정의한다.
프로젝트 소개=[README.md](README.md), 디자인·구현 규칙=[DESIGN.md](DESIGN.md). 이 문서는 둘을 반복하지 않고 참조만 한다.

## Scope
- 현재 단계: `daiso-test`에서 `Da*`를 조립해 페이지를 검증한다.
- 첫 대상: 마이페이지 > 리뷰 화면.

## Priority
1. DESIGN.md > 개인 판단.
2. 그 외 판단 우선순위는 DESIGN.md TL;DR을 따른다.

## Read First
- [DESIGN.md](DESIGN.md) — TL;DR + 관련 섹션.
- [.claude/skills/dds-component/SKILL.md](.claude/skills/dds-component/SKILL.md) — 컴포넌트 생성·유지보수 절차.

## Workflow
1. Read DESIGN.md before implementation.
2. Decision Flow로 재사용 여부를 먼저 판단한다.
3. Reuse existing components before creating new ones.
4. 막히면 멈추고 확인한다.
5. 작업 후 QA Checklist + Anti-Patterns로 대조한다.

## Never
- Never improvise beyond DESIGN.md.
- Never implement patterns not defined in DESIGN.md.
- Stop and ask when a new token, component, or pattern is required.

## Before Done
- [ ] DESIGN.md QA Checklist 통과.
- [ ] Anti-Patterns 위반 없음.
- [ ] `npm run build` 통과.
