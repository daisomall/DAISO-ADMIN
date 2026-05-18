import * as React from "react";

/**
 * Popover — DDS floating tooltip-like bubble
 *
 * Figma reference: Foundation › Components › Popover (Position=Bottom/Left)
 *
 * Styled bubble + 화살표 vector. **Positioning(어디 띄울지)은 consumer 책임**.
 * 본 컴포넌트는 시각 형태만 제공 (open/close state, anchor positioning 미포함).
 *
 * "position" prop 의 의미 (Figma 명명 그대로 보존)
 * - "bottom" : 화살표가 bubble 의 **bottom** 위치 (target 이 아래에 있을 때 사용)
 *              → 시각: [ bubble ]
 *                       ↓
 * - "left"   : 화살표가 bubble 의 **left** 위치 (target 이 왼쪽에 있을 때 사용)
 *              → 시각: ← [ bubble ]
 *
 * 주의: 일반 tooltip 라이브러리의 `placement` 와 의미가 반대 (placement="top"
 * 이 본 컴포넌트의 position="bottom" 에 대응).
 *
 * Props
 * - children  : bubble 내부 콘텐츠 (텍스트, Daiso 강조, icon 등 자유 컴포지션)
 * - position  : "bottom" | "left" (default "bottom")
 *
 * DDS Token
 * - Bg     : bg-palette-gray-800
 * - Radius : rounded-small (2px)
 * - Padding: px-10 py-4
 * - Type   : text-caption-1 font-medium text-semantic-text-white (12/16)
 * - Inner gap: gap-2
 * - Arrow color: currentColor (parent text-palette-gray-800 상속)
 *
 * 공통 spec 매핑
 * - children (= label 대체, ReactNode 가 더 자유로움)
 * - icon : children 안에서 자유 배치
 * - variant : position prop (Figma 변수명 그대로)
 * - disabled : 미적용 (popover 는 시각 요소)
 *
 * 숫자 강조 예시 (Figma 패턴)
 *   <Popover position="bottom">
 *     텍스트 <span className="font-promo">25P</span> 텍스트
 *   </Popover>
 */

export type PopoverPosition = "bottom" | "left";

export type PopoverProps = {
  children: React.ReactNode;
  position?: PopoverPosition;
  className?: string;
};

export function Popover({
  children,
  position = "bottom",
  className,
}: PopoverProps) {
  return (
    <div
      className={[
        "inline-flex items-center text-palette-gray-800",
        position === "bottom" ? "flex-col" : "flex-row",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {position === "left" && <ArrowLeft />}
      <div
        role="tooltip"
        className="inline-flex items-center gap-2 rounded-small bg-palette-gray-800 px-10 py-4 font-sans text-caption-1 font-medium text-semantic-text-white"
      >
        {children}
      </div>
      {position === "bottom" && <ArrowDown />}
    </div>
  );
}

/** 9×5 down-pointing triangle, currentColor fill. */
function ArrowDown() {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="currentColor"
      aria-hidden
      role="presentation"
    >
      <path d="M0 0L4.5 5L9 0Z" />
    </svg>
  );
}

/** 5×9 left-pointing triangle, currentColor fill. */
function ArrowLeft() {
  return (
    <svg
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="currentColor"
      aria-hidden
      role="presentation"
    >
      <path d="M5 0L0 4.5L5 9Z" />
    </svg>
  );
}
