"use client";

import * as React from "react";
import { Button } from "@/app/components/Button";
import type { IconName } from "@/app/components/Icon";

/**
 * ActionArea — DDS layout component
 *
 * Figma reference: Foundation › Components › Button › Action Area
 * (Variant=Strong)
 *
 * 용도: 모바일 화면 하단 고정 CTA bar. 내부에 full-width Button.
 *
 * Props
 * - label         : 내부 버튼 텍스트
 * - icon          : boolean      내부 버튼 양쪽 placeholder icon 노출 (기존 호환)
 * - buttonVariant : "primary" | "tertiary"  내부 Button variant (default "primary")
 * - trailingIcon  : IconName     내부 Button trailing slot 명시 (icon=false 일 때)
 * - disabled      : boolean      내부 버튼 비활성화
 * - variant       : "strong"     ActionArea wrapper variant (Figma 정의 유일)
 * - sticky        : boolean      true → 뷰포트 하단 fixed positioning (기본 false)
 *
 * DDS Token 사용
 * - Spacing : pt-8 pb-20 px-20
 * - Bg      : semantic-background-elevated
 * - Shadow  : shadow-level-1 (Effect Foundation)
 *
 * 시각 구조
 * - 컨테이너 (white bg + shadow-level-1) + padding
 * - 내부 full-width Button (variant 는 buttonVariant prop 으로 결정)
 *
 * 호환성
 * - 기존 호출 (label/icon/disabled/variant/sticky 만 전달) → primary + 양쪽 placeholder
 *   동작 그대로 유지. buttonVariant 미지정 시 "primary" default.
 */

type ActionAreaVariant = "strong";
type ActionAreaButtonVariant = "primary" | "tertiary";

export type ActionAreaProps = {
  /** 내부 버튼 텍스트 */
  label: string;
  /** 내부 버튼 양쪽 placeholder icon 노출 (기존 호환) */
  icon?: boolean;
  /** 내부 Button variant — Figma Type=Primary|Tertiary 매핑 (default primary) */
  buttonVariant?: ActionAreaButtonVariant;
  /** 내부 Button trailing icon 명시 지정 (icon=false 일 때 동작) */
  trailingIcon?: IconName;
  /** 내부 버튼 비활성화 */
  disabled?: boolean;
  /** Figma 에 정의된 유일한 wrapper variant */
  variant?: ActionAreaVariant;
  /** 뷰포트 하단 sticky/fixed positioning */
  sticky?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function ActionArea({
  label,
  icon = false,
  buttonVariant = "primary",
  trailingIcon,
  disabled = false,
  // variant 는 현재 1개. 향후 확장 대비 prop 만 유지.
  variant: _variant = "strong",
  sticky = false,
  onClick,
  className,
}: ActionAreaProps) {
  const wrapperClass = [
    "bg-semantic-background-elevated shadow-level-1",
    "pt-8 pb-20 px-20",
    sticky ? "fixed bottom-0 left-0 right-0 z-50" : "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass}>
      <Button
        label={label}
        variant={buttonVariant}
        size="large"
        icon={icon}
        trailingIcon={trailingIcon}
        disabled={disabled}
        onClick={onClick}
        className="w-full"
      />
    </div>
  );
}
