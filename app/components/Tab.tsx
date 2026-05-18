"use client";

import * as React from "react";

/**
 * Tab + TabGroup — DDS navigation components
 *
 * Figma reference: Foundation › Components › Tab
 *
 * 2개 컴포넌트 export
 * - Tab      : 단일 탭 (parent 가 selected state 제어)
 * - TabGroup : 다중 탭 컨테이너 (selected state 자동 관리)
 *
 * Tab states (selected / unselected)
 * - Selected   : font-bold + text-primary + 2px active-line (gray-800)
 * - Unselected : font-medium + text-secondary + 1px hairline (basic2)
 * - Disabled   : dim text + dim badge (Figma 미정의, 일반 UI 패턴)
 *
 * Count badge (optional)
 * - Selected   : bg-gray-800 + white text
 * - Unselected : bg-gray-400 + white text
 * - Shape      : pill, min-w-20 (Figma 22 와 2px deviation — DDS scale 외)
 * - Text       : text-caption-2 font-bold (11/15)
 *
 * DDS Token
 * - Spacing : h-48 (tab), gap-8 (label↔count), px-4, h-2 (active), h-px (default)
 * - Type    : text-body-5 (label) / text-caption-2 (count)
 * - Color   : palette-gray-800 / -400, semantic-text-primary / -secondary /
 *             -white / -disable, semantic-stroke-basic2
 * - Radius  : rounded-pill (count badge)
 *
 * 공통 spec 차이
 * - Tab : label, disabled 적용. icon/variant 미적용 (Figma 미정의).
 *         selected 는 별도 prop (TabGroup 에서 자동 관리됨).
 * - 22px badge → 20px 채택 (DDS scale 22 부재).
 *
 * a11y
 * - Tab     : <button role="tab"> + aria-selected
 * - TabGroup: <div role="tablist">
 */

// ──────────────────────────────────────────────────────────────
// Tab (single)
// ──────────────────────────────────────────────────────────────

export type TabProps = {
  label: string;
  /** count badge 표시 (number | string). undefined 면 badge 미노출 */
  count?: number | string;
  /** 선택 상태 (parent 또는 TabGroup 이 제어) */
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function Tab({
  label,
  count,
  selected = false,
  disabled = false,
  onClick,
  className,
}: TabProps) {
  const labelClass = disabled
    ? "text-body-5 font-medium text-semantic-text-disable"
    : selected
      ? "text-body-5 font-bold text-semantic-text-primary"
      : "text-body-5 font-medium text-semantic-text-secondary";

  const badgeBgClass = disabled
    ? "bg-semantic-text-disable"
    : selected
      ? "bg-palette-gray-800"
      : "bg-palette-gray-400";

  const lineClass = selected
    ? "h-2 bg-palette-gray-800"
    : "h-px bg-semantic-stroke-basic2";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={onClick}
      className={[
        "relative inline-flex h-48 items-center justify-center px-4 font-sans transition-colors",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="flex items-center justify-center gap-8">
        <span className={labelClass}>{label}</span>
        {count !== undefined && count !== null && count !== "" && (
          <span
            className={[
              "inline-flex h-20 min-w-20 items-center justify-center rounded-pill px-4",
              "text-caption-2 font-bold text-semantic-text-white",
              badgeBgClass,
            ].join(" ")}
          >
            {count}
          </span>
        )}
      </span>
      <span
        aria-hidden
        className={["absolute right-0 bottom-0 left-0", lineClass].join(" ")}
      />
    </button>
  );
}

// ──────────────────────────────────────────────────────────────
// TabGroup (multiple, manages selection)
// ──────────────────────────────────────────────────────────────

export type TabItem = {
  label: string;
  count?: number | string;
  disabled?: boolean;
};

export type TabGroupProps = {
  tabs: TabItem[];
  /** uncontrolled 초기 선택 인덱스 */
  defaultSelectedIndex?: number;
  /** controlled 선택 인덱스 */
  selectedIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
};

export function TabGroup({
  tabs,
  defaultSelectedIndex = 0,
  selectedIndex,
  onChange,
  className,
}: TabGroupProps) {
  const isControlled = selectedIndex !== undefined;
  const [internalIndex, setInternalIndex] =
    React.useState(defaultSelectedIndex);
  const currentIndex = isControlled ? selectedIndex : internalIndex;

  const handleSelect = (index: number) => {
    if (!isControlled) setInternalIndex(index);
    onChange?.(index);
  };

  return (
    <div
      role="tablist"
      className={["flex h-48 w-full bg-semantic-background-base-white", className]
        .filter(Boolean)
        .join(" ")}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          count={tab.count}
          disabled={tab.disabled}
          selected={index === currentIndex}
          onClick={() => handleSelect(index)}
          className="flex-1"
        />
      ))}
    </div>
  );
}
