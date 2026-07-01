# CLAUDE.md — AI Operating Manual

AI가 작업 전 반드시 읽는다. 작업 절차·판단 기준만 정의한다.

**문서 역할 (책임이 겹치지 않음)**

| 문서 | 역할 |
|---|---|
| Figma | Design Source of Truth — 토큰·형태·색의 원천 |
| [DESIGN.md](DESIGN.md) | Design Specification — 명세(무엇을·왜) |
| [SKILL.md](.claude/skills/dds-component/SKILL.md) | Implementation Procedure — 구현 절차(어떻게) |
| [README.md](README.md) | 프로젝트 소개 |
| Code | Current Implementation — 명세의 구현 결과 |

이 문서(CLAUDE.md)는 위를 반복하지 않고 **작업 규칙**만 정의한다.

## Scope
- 현재 단계: `daiso-test`에서 `Da*`를 조립해 페이지를 검증한다.
- 첫 대상: 마이페이지 > 리뷰 화면.
- **DESIGN.md 적용**: Foundation · DDS Component · Layout · Pattern. **비적용**: Business Logic · API · State Management · Nuxt Page Logic(→ 소비 앱 책임).

## Priority (기준 충돌 시)
1. **SoT 우선순위**: Figma ▶ DESIGN.md ▶ 기존 구현 코드 ▶ README·기타. **Code 는 SoT 가 아니다** — 상위와 다르면 코드가 틀린 것(→ DESIGN.md Known Gaps).
2. DESIGN.md > 개인 판단. 그 외 판단 우선순위는 DESIGN.md TL;DR을 따른다.

## Read First
- [DESIGN.md](DESIGN.md) — TL;DR + 관련 섹션.
- [SKILL.md](.claude/skills/dds-component/SKILL.md) — **아래 작업 시 필수 참조**: DDS Component 생성·수정 · Figma 기반 구현 · Foundation Token 변경.

## Workflow
1. Read DESIGN.md before implementation.
2. Decision Flow로 재사용 여부를 먼저 판단한다.
3. Reuse existing components before creating new ones.
4. 막히면 멈추고 확인한다.
5. 작업 후 QA Checklist + Do / Don't로 대조한다.

## Never
- Never improvise beyond DESIGN.md.
- Never implement patterns not defined in DESIGN.md.
- Stop and ask when a new token, component, or pattern is required.

## Before Done
- [ ] DESIGN.md QA Checklist 통과.
- [ ] DESIGN.md Do / Don't 위반 없음.
- [ ] `npm run build` 통과.
