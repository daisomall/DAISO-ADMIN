"use client";

import * as React from "react";

/**
 * Chip + ChipsFilter — DDS filter chip components
 *
 * Figma reference: Foundation › Components › Chips/Filter
 *
 * 2개 컴포넌트 export
 * - Chip         : 단일 chip (parent 가 selected state 제어)
 * - ChipsFilter  : 다중 chip composition (single / multiple 선택 모드)
 *
 * Chip 2 states
 * - Selected   : bg-palette-gray-700 + white text + Body 6 Bold + no border
 *                (NOTE: gray-700 사용. Tab/Button selected 의 gray-800 과 다름.
 *                 Figma 명시값 그대로.)
 * - Unselected : bg-palette-brand-white + basic2 border + text-primary +
 *                Body 6 Regular
 * - Disabled   : dim bg + dim text (Figma 미정의, UI 패턴 적용)
 *
 * DDS Token
 * - Height  : 36px 고정 — calc(var(--spacing-scale-32) + var(--spacing-scale-4))
 *             모든 variant 에서 동일 (selected/unselected/disabled 무관)
 * - Spacing : px-12 (horizontal), gap-8 (ChipsFilter chip 간격)
 * - Radius  : rounded-pill
 * - Type    : text-body-6 (14/19)
 * - Color   : palette-gray-700 (selected bg), palette-brand-white (unselected bg),
 *             semantic-stroke-basic2 (border), semantic-text-primary / -white /
 *             -disable, semantic-background-disabled
 *
 * 공통 spec 매핑
 * - label : ✓
 * - disabled : ✓
 * - selected : ✓ (parent 제어, ChipsFilter 자동 관리)
 * - icon/variant : 미적용 (Figma 미정의)
 *
 * a11y
 * - Chip         : <button aria-pressed> (toggle button 패턴)
 * - ChipsFilter  : <div role="group">
 *
 * Height 처리
 * - Figma chip height 36px → DDS spacing scale 에 36 없음. 32 + 4 합성으로
 *   정확히 36px 구성 (DDS 토큰만 사용, 새 값 0건).
 * - 고정 height + flex items-center 로 텍스트/아이콘 수직 중앙 정렬.
 *   향후 size variant 가 추가되어도 height 는 영향받지 않음.
 */

// ──────────────────────────────────────────────────────────────
// Chip (single)
// ──────────────────────────────────────────────────────────────

export type ChipProps = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function Chip({
  label,
  selected = false,
  disabled = false,
  onClick,
  className,
}: ChipProps) {
  const visualClass = disabled
    ? selected
      ? // selected + disabled : dimmed dark
        "bg-palette-gray-400 text-semantic-text-white font-bold cursor-not-allowed"
      : // unselected + disabled
        "bg-semantic-background-disabled border border-semantic-stroke-basic2 text-semantic-text-disable cursor-not-allowed"
    : selected
      ? "bg-palette-gray-700 text-semantic-text-white font-bold"
      : "bg-palette-brand-white border border-semantic-stroke-basic2 text-semantic-text-primary font-regular";

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={onClick}
      // 36px 고정 height — DDS scale 에 36 토큰 부재로 32+4 합성
      // (DDS 토큰만 사용, 새 값 0건). 모든 variant 에서 동일 적용.
      style={{
        height: "calc(var(--spacing-scale-32) + var(--spacing-scale-4))",
      }}
      className={[
        "inline-flex items-center justify-center px-12 rounded-pill",
        "font-sans text-body-6 transition-colors whitespace-nowrap",
        visualClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}

// ──────────────────────────────────────────────────────────────
// ChipsFilter (multiple chips, single | multiple selection mode)
// ──────────────────────────────────────────────────────────────

export type ChipItem = {
  label: string;
  disabled?: boolean;
};

export type ChipsFilterProps = {
  chips: ChipItem[];
  /** multiple=true → 다중 선택, false (default) → 단일 선택 (toggle) */
  multiple?: boolean;
  /** uncontrolled 초기 선택 인덱스 배열 */
  defaultSelectedIndices?: number[];
  /** controlled 선택 인덱스 배열 */
  selectedIndices?: number[];
  onChange?: (indices: number[]) => void;
  className?: string;
};

export function ChipsFilter({
  chips,
  multiple = false,
  defaultSelectedIndices,
  selectedIndices,
  onChange,
  className,
}: ChipsFilterProps) {
  const isControlled = selectedIndices !== undefined;
  const [internal, setInternal] = React.useState<number[]>(
    defaultSelectedIndices ?? [],
  );
  const current = isControlled ? selectedIndices : internal;

  const handleToggle = (index: number) => {
    let next: number[];
    const isCurrentlySelected = current.includes(index);
    if (multiple) {
      next = isCurrentlySelected
        ? current.filter((i) => i !== index)
        : [...current, index];
    } else {
      // single mode: toggle off if same, else replace
      next = isCurrentlySelected ? [] : [index];
    }
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div
      role="group"
      className={["flex flex-wrap items-center gap-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      {chips.map((chip, i) => (
        <Chip
          key={i}
          label={chip.label}
          disabled={chip.disabled}
          selected={current.includes(i)}
          onClick={() => handleToggle(i)}
        />
      ))}
    </div>
  );
}
