"use client";

import * as React from "react";
import { Icon } from "@/app/components/ui/Icon";

/**
 * Accordion — DDS expandable panel
 *
 * Figma reference: Foundation › Components › Accordion (Expand=False/True)
 *
 * 2 states
 * - collapsed : title row + chevron-down
 * - expanded  : title row + chevron-up + detail panel (bg-grouped)
 *
 * Props
 * - title           : 헤더 텍스트
 * - expanded        : controlled expand state
 * - defaultExpanded : uncontrolled initial expand state (default false)
 * - onChange        : toggle 콜백
 * - disabled        : 토글 비활성화
 * - children        : detail panel 내용 (arbitrary ReactNode)
 *
 * DDS Token
 * - Spacing : px-20 py-12 (header), px-20 pt-20 pb-24 (detail), gap-12 (header)
 * - Type    : text-heading-5 + font-display + font-bold (title, SUITE 16/22/-1)
 *             text-body-7 + font-regular (detail body, 13/18)
 * - Color   : semantic-text-primary (title), semantic-text-secondary (body),
 *             semantic-background-base-white (container),
 *             semantic-background-grouped (detail bg),
 *             semantic-text-disable (disabled)
 * - Icon    : Icon name=chevron-{down|up} size=20
 *
 * 공통 spec 매핑
 * - title (= label) ✓
 * - disabled ✓
 * - icon : chevron 자동 (expanded state 로 결정)
 * - variant : 미적용 (state 는 expanded prop 으로 파생)
 *
 * a11y
 * - <button aria-expanded aria-controls={panelId}>
 * - panel <div role="region">
 * - useId() 로 button↔panel 연결
 */

export type AccordionProps = {
  title: string;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (expanded: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export function Accordion({
  title,
  expanded,
  defaultExpanded = false,
  onChange,
  disabled = false,
  children,
  className,
}: AccordionProps) {
  const isControlled = expanded !== undefined;
  const [internal, setInternal] = React.useState(defaultExpanded);
  const isOpen = isControlled ? expanded : internal;
  const panelId = React.useId();

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const titleColorClass = disabled
    ? "text-semantic-text-disable"
    : "text-semantic-text-primary";

  return (
    <div
      className={[
        "flex w-full flex-col bg-semantic-background-base-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleToggle}
        className={[
          "flex w-full items-center gap-12 px-20 py-12 font-sans transition-colors",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        <span
          className={[
            "flex-1 text-left font-display text-heading-5 font-bold",
            titleColorClass,
          ].join(" ")}
        >
          {title}
        </span>
        <Icon
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          className={titleColorClass}
        />
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="region"
          className="bg-semantic-background-grouped px-20 pt-20 pb-24"
        >
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * AccordionBulletList — Figma 의 bullet list 패턴 헬퍼
 *
 * Accordion detail content 에서 사용되는 반복 패턴을 캡슐화.
 * Body 7 Regular (13/18) + text-secondary + 3×3 dot bullet (Figma `imgDot`
 * vector 1:1).
 *
 * Bullet 구현 디테일
 * - Figma `imgDot` 자산 = 3×3 px filled circle. `•` 유니코드 문자 대신 inline
 *   SVG 로 정확한 크기/색 보장 (font glyph 의존성 제거 + 디자인 fidelity).
 * - SVG height = body-7 line-height (18) → row 내 vertical-center 자동 정렬.
 * - color: currentColor 상속 → li 의 text-secondary 가 SVG + text 양쪽 적용.
 *
 * Multi-line item 지원
 * - items 는 React.ReactNode[] — 각 item 이 string ("\n" 으로 break) 또는
 *   JSX (`<br />` 등) 어떤 형태든 허용.
 * - text container 에 `whitespace-pre-line` 부여 → string 내 `\n` 을
 *   line break 로 honor. body-7 line-height (18) 로 line 간격 일관.
 * - hanging indent: `flex items-start` + bullet `shrink-0` + text `flex-1` →
 *   wrap/줄바꿈 시 text 가 bullet 좌측으로 떨어지지 않음.
 */
export function AccordionBulletList({
  items,
  className,
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  return (
    // li 에 color 부여 → bullet + text 양쪽 상속.
    <ul
      className={[
        "flex flex-col gap-8 text-semantic-text-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-8">
          {/* 3×3 dot — body-7 line-height (18) 컨테이너 내 수직 center 정렬 */}
          <svg
            aria-hidden
            width={3}
            height={18}
            viewBox="0 0 3 18"
            className="shrink-0"
          >
            <circle cx={1.5} cy={9} r={1.5} fill="currentColor" />
          </svg>
          {/* whitespace-pre-line — items 의 string `\n` 을 line break 로 honor */}
          <div className="flex-1 whitespace-pre-line text-body-7 font-regular">
            {item}
          </div>
        </li>
      ))}
    </ul>
  );
}
