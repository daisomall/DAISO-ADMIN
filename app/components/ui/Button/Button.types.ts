import * as React from "react";
import type { IconName } from "@/app/components/ui/Icon";

export type ButtonVariant = "primary" | "tertiary";

export type ButtonSize = "large" | "medium";

export type ButtonProps = {
  /** 버튼 텍스트 */
  label: string;

  /** 시각적 변형 */
  variant?: ButtonVariant;

  /** 사이즈 */
  size?: ButtonSize;

  /** 양쪽 blank icon */
  icon?: boolean;

  /** leading icon */
  leadingIcon?: IconName;

  /** trailing icon */
  trailingIcon?: IconName;

  /** disabled 상태 */
  disabled?: boolean;

  /** native button type */
  type?: "button" | "submit" | "reset";

  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  className?: string;
};