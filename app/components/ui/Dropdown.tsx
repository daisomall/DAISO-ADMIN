"use client";

import * as React from "react";
import { Icon } from "@/app/components/ui/Icon";

/**
 * Dropdown — DDS select component
 *
 * Figma reference: Foundation › Components › Dropdown (Default/Expand)
 *
 * 2 states (자동 파생, prop 노출 안 함)
 * - Default (closed) : border-stroke-basic2, trigger only
 * - Expand  (open)   : border-palette-gray-700 (darker), trigger + option list
 *
 * Props
 * - options       : { value, label, image?, disabled? }[]
 * - value         : controlled selected value
 * - defaultValue  : uncontrolled initial value
 * - onChange      : 선택 변경 콜백
 * - placeholder   : 선택값 없을 때 노출 텍스트
 * - disabled      : 전체 비활성화
 *
 * Image slot 처리
 * - 모든 image 는 size-24 원형 wrapper (rounded-pill + overflow-hidden) 안에서 렌더.
 * - <img> raster : 원형 crop 자동 적용
 * - <Icon> SVG  : 자체 overflow 없어 시각 변화 없음 (wrapper 일관성만 유지)
 * - 사용자는 image 에 별도 rounded 클래스를 추가할 필요 없음.
 *
 * 인터랙션
 * - 트리거 클릭   : toggle open
 * - 옵션 클릭     : select + close
 * - 외부 클릭     : close (mousedown listener)
 *
 * DDS Token
 * - Radius  : rounded-small
 * - Spacing : py-10 px-16 (trigger/option height ≈41px, Figma 40px 와 1px deviation)
 *             gap-12 (trigger content↔chevron), gap-16 (option content↔end),
 *             gap-8 (image↔label)
 * - Type    : text-body-5 font-regular
 * - Color   : semantic-stroke-basic2 (closed border), palette-gray-700 (open),
 *             semantic-text-primary (value AND placeholder/prompt — Figma
 *             current variant), semantic-text-disable, palette-gray-200
 *             (hover bg), semantic-background-disabled (disabled option bg)
 * - Icon    : <Icon name=chevron-{down|up} size=12 />
 *
 * Placeholder color 정책 (Figma 1:1)
 * - Dropdown 은 "선택 액션 prompt" 패턴 — placeholder text 는 lighter gray
 *   (text/placeholder) 가 아닌 text/primary 로 렌더. user 가 반드시 interact
 *   해야 함을 강조하는 instruction 톤.
 * - TextInput placeholder (gray-400) 와 시각 패턴 다름 — Dropdown 의 unset
 *   상태도 primary 색상 유지.
 *
 * 공통 spec 차이
 * - options array 기반 API — label/icon/variant prop 자연스럽지 않음
 * - disabled ✓
 *
 * Deviation
 * - Figma height 40px → DDS scale 외. py-10 (41px) 채택, 1px deviation.
 *
 * a11y
 * - Trigger : <button aria-haspopup="listbox" aria-expanded>
 * - Panel   : <ul role="listbox">
 * - Option  : <button role="option" aria-selected aria-disabled>
 */

export type DropdownOption = {
  value: string;
  label: string;
  /** optional leading image / icon (24×24 권장) */
  image?: React.ReactNode;
  disabled?: boolean;
};

export type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function Dropdown({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "선택",
  disabled = false,
  className,
}: DropdownProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string | undefined>(
    defaultValue,
  );
  const currentValue = isControlled ? value : internal;
  const currentOption = options.find((opt) => opt.value === currentValue);

  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Outside click → close
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    if (!isControlled) setInternal(option.value);
    onChange?.(option.value);
    setOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const containerClass = [
    "flex w-full flex-col overflow-clip rounded-small border bg-semantic-background-base-white",
    open ? "border-palette-gray-700" : "border-semantic-stroke-basic2",
  ].join(" ");

  // Placeholder 와 selected value 모두 text-primary (Figma current variant).
  // disabled 만 dim. value 유무에 따른 색 차이 없음 — "선택 prompt" 패턴.
  const labelColorClass = disabled
    ? "text-semantic-text-disable"
    : "text-semantic-text-primary";

  const chevronColorClass = disabled
    ? "text-semantic-text-disable"
    : "text-semantic-text-primary";

  return (
    <div
      ref={containerRef}
      className={[containerClass, className].filter(Boolean).join(" ")}
    >
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleToggle}
        className={[
          "flex w-full items-center gap-12 px-16 py-10 font-sans transition-colors",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        <span className="flex min-w-0 flex-1 items-center gap-8">
          {currentOption?.image && (
            <span className="size-24 shrink-0 overflow-hidden rounded-pill">
              {currentOption.image}
            </span>
          )}
          <span
            className={[
              "flex-1 truncate text-left text-body-5 font-regular",
              labelColorClass,
            ].join(" ")}
          >
            {currentOption?.label ?? placeholder}
          </span>
        </span>
        <Icon
          name={open ? "chevron-up" : "chevron-down"}
          size={12}
          className={chevronColorClass}
        />
      </button>

      {/* Panel */}
      {open && (
        <ul role="listbox" className="flex w-full flex-col">
          {options.map((option) => {
            const isSelected = option.value === currentValue;
            const isOptionDisabled = Boolean(option.disabled);
            return (
              <li key={option.value} className="contents">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isOptionDisabled || undefined}
                  disabled={isOptionDisabled}
                  onClick={() => handleSelect(option)}
                  className={[
                    "flex w-full items-center gap-16 border-t border-semantic-stroke-basic2 px-16 py-10 font-sans transition-colors",
                    isOptionDisabled
                      ? "cursor-not-allowed bg-semantic-background-disabled"
                      : "cursor-pointer hover:bg-palette-gray-200",
                  ].join(" ")}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-8">
                    {option.image && (
                      <span className="size-24 shrink-0 overflow-hidden rounded-pill">
                        {option.image}
                      </span>
                    )}
                    <span
                      className={[
                        "flex-1 truncate text-left text-body-5 font-regular",
                        isOptionDisabled
                          ? "text-semantic-text-disable"
                          : "text-semantic-text-primary",
                      ].join(" ")}
                    >
                      {option.label}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
