"use client";

import { cn } from "@/app/lib/cn";

import { Icon } from "@/app/components/ui/Icon";

import type { ButtonProps } from "./Button.types";

import { buttonStyle } from "./Button.styles";

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
  const showBlankBoth = icon;

  const leftIcon =
    !showBlankBoth && leadingIcon
      ? leadingIcon
      : null;

  const rightIcon =
    !showBlankBoth && trailingIcon
      ? trailingIcon
      : null;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        buttonStyle({
          variant,
          size,
          disabled,
        }),
        className,
      )}
    >
      {showBlankBoth && (
        <Icon name="blank" size={16} />
      )}

      {leftIcon && (
        <Icon name={leftIcon} size={16} />
      )}

      <span className="whitespace-nowrap">
        {label}
      </span>

      {rightIcon && (
        <Icon name={rightIcon} size={16} />
      )}

      {showBlankBoth && (
        <Icon name="blank" size={16} />
      )}
    </button>
  );
}