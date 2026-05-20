"use client";

import * as React from "react";

/**
 * TextInput — DDS form input (multi-line textarea)
 *
 * Figma reference: Foundation › Components › Textinput
 *
 * Figma 4-state (Default / Active Focus / Filled / Error) 는 React 내부
 * 상태 + props 로 자연 파생:
 *   - focus    → `:focus-within` CSS selector 로 border 전환
 *   - filled   → value 또는 defaultValue 가 존재할 때 입력값 렌더링
 *   - error    → `error` prop (string) 존재 시 border 변경 + 메시지 노출
 *   - default  → 위 조건 모두 미충족 시
 *
 * Props
 * - placeholder  : 플레이스 홀더 텍스트
 * - value        : controlled value
 * - defaultValue : uncontrolled initial value
 * - onChange     : 변경 핸들러
 * - maxLength    : 최대 문자 수 (default 1000 — Figma 기준)
 * - showCounter  : 카운터 "n/maxLength" 노출 (default true)
 * - rows         : textarea 행 수 (default 4 — Figma 120px 컨테이너 근사)
 * - error        : 에러 메시지 (presence 가 error state 결정)
 * - disabled     : 비활성화
 *
 * DDS Token
 * - Color   : palette-brand-white (bg), semantic-stroke-basic2 (border),
 *             palette-gray-800 (focus border), palette-brand-red (error
 *             border + 메시지), semantic-text-primary / -placeholder /
 *             -disable, semantic-background-disabled (disabled bg)
 * - Radius  : rounded-small (2px)
 * - Spacing : p-12 외부, gap-8 텍스트↔카운터, px-4 내부 alignment,
 *             pt-8 px-16 에러 메시지 wrapper
 * - Type    : text-body-5 font-regular (입력), text-caption-1 font-regular
 *             (카운터 · 에러 메시지)
 *
 * 알려진 사이즈 deviation
 * - Figma 컨테이너 fixed height 120px (DDS scale 외 값).
 * - 구현: textarea rows={4} + p-12 + gap-8 + counter(16) ≈ 132px (자연 sizing).
 *   Figma 120 과 12px 오차. DDS 토큰만 사용.
 *
 * 공통 spec 차이
 * - label/icon/variant prop 미적용 (Figma 미정의).
 */

export type TextInputProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  showCounter?: boolean;
  rows?: number;
  /** 에러 메시지. 존재 시 error state. */
  error?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
};

export function TextInput({
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  maxLength = 1000,
  showCounter = true,
  rows = 4,
  error,
  disabled = false,
  name,
  id,
  className,
}: TextInputProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;
  const currentLength = currentValue.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const isError = Boolean(error);

  const containerClass = [
    "flex flex-col gap-8",
    "rounded-small border p-12",
    isError
      ? "border-palette-brand-red bg-semantic-background-base-white"
      : disabled
        ? "border-semantic-stroke-basic2 bg-semantic-background-disabled"
        : "border-semantic-stroke-basic2 bg-semantic-background-base-white focus-within:border-palette-gray-800",
  ].join(" ");

  const textareaClass = [
    // flex-1 + min-h-0 — 고정 height container 안에서 남는 공간을 채우고
    // rows 기반 intrinsic 높이보다 작게 shrink 허용 (box 120px 정확 고정).
    "w-full flex-1 min-h-0 resize-none border-0 bg-transparent px-4 outline-none",
    "font-sans text-body-5 font-regular",
    disabled
      ? "text-semantic-text-disable placeholder:text-semantic-text-disable cursor-not-allowed"
      : "text-semantic-text-primary placeholder:text-semantic-text-placeholder",
  ].join(" ");

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {/* Text Field box — Figma 고정 height 120px.
          DDS scale 외 값이라 토큰 합성 (scale-72 + scale-48 = 120),
          Profile 54 / ReviewCard 52 와 동일한 합성 규칙. p-12 + gap-8 +
          counter(16) 내부 분배는 textarea flex-1 이 흡수. */}
      <div
        className={containerClass}
        style={{
          height:
            "calc(var(--spacing-scale-72) + var(--spacing-scale-48))",
        }}
      >
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={maxLength}
          rows={rows}
          disabled={disabled}
          className={textareaClass}
        />
        {showCounter && (
          <div className="self-end px-4 font-sans text-caption-1 font-regular">
            <span
              className={
                disabled
                  ? "text-semantic-text-disable"
                  : "text-semantic-text-primary"
              }
            >
              {currentLength}
            </span>
            <span className="text-semantic-text-placeholder">/{maxLength}</span>
          </div>
        )}
      </div>
      {isError && (
        <p className="px-16 pt-8 font-sans text-caption-1 font-regular text-palette-brand-red">
          {error}
        </p>
      )}
    </div>
  );
}
