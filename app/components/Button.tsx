"use client";

import * as React from "react";
import { Icon, type IconName } from "@/app/components/Icon";

/**
 * Button — DDS primitive component
 *
 * Figma reference: Foundation › Components › Button
 *
 * Props
 * - label        : 버튼 텍스트
 * - variant      : "primary" | "tertiary"   (시각적 스타일. Figma Type)
 * - size         : "large" | "medium"        (사이즈. Figma Size)
 * - icon         : boolean                   (true 면 양쪽에 placeholder icon 노출)
 * - leadingIcon  : IconName  (선택. icon=false 일 때 leading slot 명시적 지정)
 * - trailingIcon : IconName  (선택. icon=false 일 때 trailing slot 명시적 지정)
 * - disabled     : boolean                   (state. variant 와 직교)
 *
 * Icon slot 우선순위
 * - icon=true            : 양쪽 blank placeholder (기존 호환)
 * - leadingIcon/trailingIcon : 각 slot 에 IconName 지정 (icon=false 일 때만 동작)
 *   → 둘 다 미지정이면 텍스트만 렌더 (default)
 *
 * DDS Token 사용 (globals.css @theme inline)
 * - Color   : palette-gray-800, palette-brand-white,
 *             semantic-text-{white|primary|disable},
 *             semantic-stroke-basic2,
 *             semantic-background-disabled
 * - Radius  : rounded-small (2px)
 * - Spacing : px-16, gap-{4|2}, h-48 (Large) / py-10 (Medium)
 * - Type    : text-body-5 + font-bold (Large) / font-medium (Medium)
 *
 * 알려진 spacing scale gap
 * - Medium 버튼의 Figma 사이즈는 40px 인데, 현재 spacing scale 에 40 토큰이
 *   없어 py-10 (10+21+10 = 41px) 로 1px deviation 발생. spacing/scale/40
 *   토큰이 Figma 에 추가되면 정정.
 */

type ButtonVariant = "primary" | "tertiary";
type ButtonSize = "large" | "medium";

export type ButtonProps = {
  /** 버튼 텍스트 */
  label: string;
  /** 시각적 변형 — Figma Type=Primary|Tertiary 대응 */
  variant?: ButtonVariant;
  /** 사이즈 — Figma Size=Large|Medium 대응 */
  size?: ButtonSize;
  /** true 면 label 양쪽에 placeholder icon 노출 (기존 호환) */
  icon?: boolean;
  /** leading slot 명시 지정 (icon=false 일 때만 동작) */
  leadingIcon?: IconName;
  /** trailing slot 명시 지정 (icon=false 일 때만 동작) */
  trailingIcon?: IconName;
  /** 비활성화 상태. variant 와 직교 적용 (Figma Type=Disabled 시각) */
  disabled?: boolean;
  /** native <button> type */
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function Button({
  label,
  variant = "primary",
  size = "large",
  icon = false,
  leadingIcon,
  trailingIcon,
  disabled = false,
  type = "button",
  onClick,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-small px-16 font-sans transition-colors";

  const sizeClass =
    size === "large"
      ? "h-48 gap-4 text-body-5 font-bold"
      : "py-10 gap-2 text-body-5 font-medium";

  const visualClass = disabled
    ? "bg-semantic-background-disabled text-semantic-text-disable cursor-not-allowed"
    : variant === "primary"
      ? "bg-palette-gray-800 text-semantic-text-white"
      : "bg-palette-brand-white border border-semantic-stroke-basic2 text-semantic-text-primary";

  // Slot 결정 — icon=true 면 양쪽 blank (기존 호환).
  // 그 외엔 leadingIcon / trailingIcon 명시 지정 시 해당 icon 렌더.
  const showBlankBoth = icon;
  const leftIcon = !showBlankBoth && leadingIcon ? leadingIcon : null;
  const rightIcon = !showBlankBoth && trailingIcon ? trailingIcon : null;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[base, sizeClass, visualClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      {showBlankBoth && <Icon name="blank" size={16} />}
      {leftIcon && <Icon name={leftIcon} size={16} />}
      {/* label single-line 강제 — Figma 원본 `whitespace-nowrap` 1:1.
          좁은 컨테이너에서도 label 줄바꿈 차단 (button 폭 → label 폭에 의해
          최소 보장). 호출부는 충분한 공간 확보 책임. */}
      <span className="whitespace-nowrap">{label}</span>
      {rightIcon && <Icon name={rightIcon} size={16} />}
      {showBlankBoth && <Icon name="blank" size={16} />}
    </button>
  );
}
