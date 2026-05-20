"use client";

import * as React from "react";
import { Icon } from "@/app/components/ui/Icon";

/**
 * TopNavigation — DDS page header
 *
 * Figma reference: Foundation › Components › Top Navigation (Variant=Normal)
 *
 * 구조 (Figma 원본 1:1)
 * - Outer       : full-width, items-center, px-16 py-12, gap-12
 * - Leading slot: size-32 wrapper (32×32), icon size-24 (arrow-left 고정)
 * - Inner       : px-8 py-4 (title)
 * - Title       : Body 4 Bold (Pretendard 16/22)
 * - Bg          : 미설정 (parent context 의 배경 상속).
 *                 (이전: semantic-background-base-white 강제 → 본 페이지의
 *                 gray 헤더 영역 등 다른 배경 위에 배치 시 부자연스러움.
 *                 컨테이너 결정권을 호출부로 이양.)
 *
 * Height
 * - py-12 (24) + py-4 (8) + body-4 line-height (22) = 54px
 *   (Figma 56px 와 2px deviation — DDS spacing scale 내 최대 근사)
 *
 * Props (default 기준만 유지)
 * - title          : 페이지 제목
 * - onLeadingClick : Leading 버튼 클릭 핸들러 (arrow-left 고정)
 *
 * a11y
 * - <header>
 * - Leading : <button aria-label="뒤로가기"> (arrow-left)
 * - Title   : <h1>
 */

export type TopNavigationProps = {
  title: string;
  onLeadingClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function TopNavigation({
  title,
  onLeadingClick,
  className,
}: TopNavigationProps) {
  return (
    <header
      className={[
        // bg 미설정 — parent context 의 배경 상속.
        // layout / spacing 은 Figma 원본 유지 (px-16 py-12 gap-12).
        "flex w-full items-center gap-12 px-16 py-12 font-sans",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        onClick={onLeadingClick}
        aria-label="뒤로가기"
        className="flex size-32 shrink-0 items-center justify-center text-semantic-text-primary"
      >
        <Icon name="arrow-left" size={24} />
      </button>
      <div className="flex flex-1 items-center px-8 py-4">
        <h1 className="flex-1 truncate text-body-4 font-bold text-semantic-text-primary">
          {title}
        </h1>
      </div>
    </header>
  );
}
