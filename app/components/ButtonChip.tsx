"use client";

import * as React from "react";
import { Icon } from "@/app/components/Icon";

/**
 * ButtonChip — DDS button family (pill variant)
 *
 * Figma reference: Foundation › Components › Button › Button/Chip
 *
 * Pill 형태의 작은 버튼. 텍스트 + 선택적 trailing chevron-right icon.
 * 일반 Button 과 별개 컴포넌트 (사이즈/형태 체계가 다름).
 *
 * Props
 * - label    : 버튼 텍스트
 * - icon     : boolean      true 면 trailing chevron-right 노출
 * - disabled : boolean
 * - variant  : "default"    (Figma 정의 유일 variant)
 *
 * DDS Token
 * - Radius : rounded-pill (Figma Pill = 1000px)
 * - Spacing: h-32 px-12 gap-2
 * - Type   : text-body-6 font-regular
 * - Color  : palette-brand-white (bg) / semantic-stroke-basic2 (border) /
 *            semantic-text-primary (text)
 *            disabled → semantic-background-disabled / semantic-text-disable
 *
 * Spacing scale deviation 메모
 * - Figma 원본 padding: pl-10 pr-12 pt-7 pb-6 (height 32px)
 * - DDS 구현: h-32 + px-12 + flex items-center (수직은 flex 가 처리)
 *   → pt-7 토큰 부재 + 시각적 동등성을 위해 symmetric padding 으로 단순화.
 */

type ButtonChipVariant = "default";

export type ButtonChipProps = {
  label: string;
  icon?: boolean;
  disabled?: boolean;
  variant?: ButtonChipVariant;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function ButtonChip({
  label,
  icon = false,
  disabled = false,
  // 현재 1개 variant. 향후 확장 대비 prop 유지.
  variant: _variant = "default",
  type = "button",
  onClick,
  className,
}: ButtonChipProps) {
  const base =
    "inline-flex h-32 items-center px-12 gap-2 rounded-pill border font-sans text-body-6 font-regular transition-colors";

  const visualClass = disabled
    ? "bg-semantic-background-disabled border-semantic-stroke-basic2 text-semantic-text-disable cursor-not-allowed"
    : "bg-palette-brand-white border-semantic-stroke-basic2 text-semantic-text-primary";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[base, visualClass, className].filter(Boolean).join(" ")}
    >
      <span>{label}</span>
      {icon && <Icon name="chevron-right" size={16} />}
    </button>
  );
}
