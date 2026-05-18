import * as React from "react";

/**
 * Divider — DDS primitive component
 *
 * Figma reference: Foundation › Components › Divider
 *
 * Variants
 * - normal : 1px hairline · stroke-basic2 (gray-300)
 * - thick  : 8px bar · stroke-basic1 (gray-200, 더 연한 색)
 *
 * Props
 * - variant : "normal" | "thick"
 *
 * Note
 * - Divider 는 순수 visual primitive 이므로 공통 spec 의 label/icon/disabled
 *   prop 은 미적용. variant 만 노출.
 * - 1px hairline 은 DDS spacing scale (최소 2) 에 토큰이 없어 Tailwind 의
 *   universal hairline utility `h-px` 사용. spacing/1 토큰이 Figma 에
 *   추가되면 교체 가능.
 *
 * DDS Token
 * - normal : h-px (1px) · bg-semantic-stroke-basic2
 * - thick  : h-8       · bg-semantic-stroke-basic1
 */

type DividerVariant = "normal" | "thick";

export type DividerProps = {
  variant?: DividerVariant;
  className?: string;
};

export function Divider({ variant = "normal", className }: DividerProps) {
  const variantClass =
    variant === "thick"
      ? "h-8 bg-semantic-stroke-basic1"
      : "h-px bg-semantic-stroke-basic2";

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={["w-full", variantClass, className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
