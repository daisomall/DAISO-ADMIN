"use client";

import * as React from "react";
import { ButtonChip } from "@/app/components/ButtonChip";
import { Icon } from "@/app/components/Icon";
import { Popover } from "@/app/components/Popover";

/**
 * Module — DDS domain composition components (review writing flow)
 *
 * Figma reference: Foundation › Components › Module
 *
 * 3 sub-components export
 * - FlagReview   : small pill badge ("재구매" / "매장구매")
 * - ReviewCard   : 리뷰 리스트 아이템 (상품 정보 표시)
 * - OrderSection : 리뷰 작성 카드 (ReviewCard + 별점 + 마감일 + chip + popover 조합)
 *
 * 도메인 specific composition — 다른 DDS 컴포넌트 (ButtonChip, Popover, Icon) 를
 * 내부에서 조합.
 *
 * Deviations (Figma → DDS)
 * - 배송 뱃지 bg `#eef0f2` → 가장 가까운 `bg-palette-gray-300` (#e9ebee)
 * - 배송 아이콘 (`ico_delivery_normal`) → Icon set 미포함, 텍스트만 노출
 * - 별점 empty 상태 → outline 별 미정의, `star` icon + `text-semantic-text-disable`
 * - 재구매 색상 (5%/10% brand-red) → Tailwind opacity modifier (`/5`, `/10`)
 *   사용. DDS color 토큰 + Tailwind opacity 조합 (새 토큰 생성 X).
 * - InProgress 의 Popover → Figma 절대 위치, 본 구현은 inline 배치
 */

// ──────────────────────────────────────────────────────────────
// FlagReview — small pill badge
// ──────────────────────────────────────────────────────────────

export type FlagReviewType = "repurchase" | "in-store-purchase";

export type FlagReviewProps = {
  type?: FlagReviewType;
  className?: string;
};

export function FlagReview({
  type = "in-store-purchase",
  className,
}: FlagReviewProps) {
  const isRepurchase = type === "repurchase";
  const visualClass = isRepurchase
    ? "bg-palette-brand-red/5 border-palette-brand-red/10 text-palette-brand-red"
    : "bg-semantic-stroke-basic1 border-semantic-dim-black-thin text-semantic-text-primary";

  return (
    <span
      className={[
        "inline-flex items-center justify-center px-6 py-2",
        "rounded-pill border font-sans text-caption-3 font-medium whitespace-nowrap",
        visualClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isRepurchase ? "재구매" : "매장구매"}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────
// ReviewCard — 리뷰 리스트 아이템
// ──────────────────────────────────────────────────────────────

export type ReviewCardKind = "all-case" | "store-only";

/**
 * 배송 유형 식별자. 현재 "normal" (택배) 만 지원.
 * 추후 "express", "pickup" 등으로 확장 시 DeliveryBadge 의 label 분기 추가.
 */
export type DeliveryType = "normal";

export type ReviewCardProps = {
  kind?: ReviewCardKind;
  /** AllCase 전용: 52×52 상품 이미지 (img 엘리먼트 또는 ReactNode) */
  image?: React.ReactNode;
  /** AllCase 전용: 배송 유형. 지정 시 DeliveryBadge 노출 */
  delivery?: DeliveryType;
  /** AllCase 전용: 날짜 (e.g. "2025-07-18") */
  date?: string;
  /** 상품명 (모든 kind 공통) */
  productName: string;
  /** 옵션 텍스트 (모든 kind 공통, optional) */
  optionText?: string;
  className?: string;
};

export function ReviewCard({
  kind = "all-case",
  image,
  delivery,
  date,
  productName,
  optionText,
  className,
}: ReviewCardProps) {
  const isAllCase = kind === "all-case";

  return (
    <div
      className={[
        "flex w-full gap-10 font-sans",
        // Figma 정의: all-case 는 items-start (상품 정보 다줄로 위부터 정렬),
        // store-only 는 items-center (간결한 정보, 수직 중앙 정렬)
        isAllCase ? "items-start" : "items-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Leading: image (all-case) or store icon (store-only)
          Figma 원본: size-[52px]. DDS spacing scale 에 52 없음 →
          calc(var(--spacing-scale-48) + var(--spacing-scale-4)) = 52px
          (DDS 토큰만 사용, 새 값 생성 X). */}
      {isAllCase ? (
        <div
          className="shrink-0 overflow-hidden bg-palette-gray-300"
          style={{
            width:
              "calc(var(--spacing-scale-48) + var(--spacing-scale-4))",
            height:
              "calc(var(--spacing-scale-48) + var(--spacing-scale-4))",
          }}
        >
          {image}
        </div>
      ) : (
        <div
          className="flex shrink-0 items-center justify-center bg-palette-gray-300"
          style={{
            width:
              "calc(var(--spacing-scale-48) + var(--spacing-scale-4))",
            height:
              "calc(var(--spacing-scale-48) + var(--spacing-scale-4))",
          }}
        >
          <Icon
            name="store"
            size={24}
            className="text-semantic-text-secondary"
          />
        </div>
      )}

      {/* Meta info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
        {/* Delivery + date (all-case only) */}
        {isAllCase && (delivery || date) && (
          <div className="flex flex-wrap items-center gap-6">
            {delivery && <DeliveryBadge type={delivery} />}
            {date && (
              <span className="text-caption-1 font-regular text-semantic-text-secondary">
                {date}
              </span>
            )}
          </div>
        )}

        {/* Product name */}
        <p className="truncate text-body-7 font-medium text-semantic-text-primary">
          {productName}
        </p>

        {/* Option text */}
        {optionText && (
          <p className="truncate text-caption-1 font-regular text-semantic-text-secondary">
            {optionText}
          </p>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// DeliveryBadge — icon + SVG label visual indicator
// ──────────────────────────────────────────────────────────────

/**
 * 배송 유형 visual indicator. text 기반이 아닌 icon + SVG composition.
 *
 * - Icon : `delivery` (truck, 12px) — Icon system 일관성 유지
 * - Label: 배송 유형별 inline SVG (현재 "normal" → 택배 SVG)
 * - 색상 : currentColor (부모 text-semantic-text-primary 상속)
 *
 * 확장 (향후)
 * - "express" 등 추가 시 LABEL_SVG 매핑 + DeliveryType 유니온에 추가
 */
export function DeliveryBadge({
  type = "normal",
  className,
}: {
  type?: DeliveryType;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-px bg-palette-gray-300 px-4 py-2 text-semantic-text-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="img"
      aria-label={DELIVERY_ARIA_LABEL[type]}
    >
      <Icon name="delivery" size={12} aria-hidden />
      <DeliveryLabelSvg type={type} />
    </span>
  );
}

const DELIVERY_ARIA_LABEL: Record<DeliveryType, string> = {
  normal: "택배 배송",
};

/**
 * 배송 유형별 label SVG.
 * 한글을 텍스트가 아닌 brand-styled vector glyph 로 렌더 (Figma 원본 패턴).
 */
function DeliveryLabelSvg({ type }: { type: DeliveryType }) {
  if (type === "normal") {
    // "택배" glyph SVG (16.372 × 9, currentColor)
    return (
      <svg
        width="16.372"
        height="9"
        viewBox="0 0 16.3722 9"
        fill="currentColor"
        aria-hidden
        role="presentation"
      >
        <path d="M3.842 4.93548H0V0.509885H3.63923V1.58897H1.34861V2.20812H3.61917V3.23725H1.34861V3.84703H3.842V4.93548ZM7.52242 5.81374V9H6.17381V6.87201H1.54081V5.81374H7.52242ZM7.52242 0V5.43392H6.24457V3.25598H5.55495V5.37357H4.29823V0.170656H5.55495V2.18835H6.24457V0.00104041H7.52242V0Z" />
        <path d="M8.80008 0.6795H10.0568V2.75754H11.1615V0.6795H12.4182V6.6025H8.79903V0.6795H8.80008ZM11.1615 5.54422V3.79605H10.0568V5.54422H11.1615ZM13.0878 0.140478H14.3445V3.42664H15.0848V0H16.3721V8.68991H15.0848V4.48491H14.3445V8.29032H13.0878V0.140478Z" />
      </svg>
    );
  }
  return null;
}

// ──────────────────────────────────────────────────────────────
// OrderSection — 리뷰 작성 카드
// ──────────────────────────────────────────────────────────────

export type OrderSectionState = "default" | "in-progress";

export type OrderSectionProps = {
  state?: OrderSectionState;
  /** ReviewCard props (composition) */
  review: ReviewCardProps;
  /** 별점 0–5 (0 = empty stars, 5 = all filled) */
  rating?: number;
  /**
   * 작성 기한 — 문자열 또는 ReactNode.
   * 문자열만 전달 시 전체가 bold 처리 (기존 동작). 부분 강조 등은 ReactNode 로
   * 직접 구성 (e.g. <>{"2025-07-04 "}<span className="text-palette-brand-red">(오늘까지)</span></>).
   */
  deadline?: React.ReactNode;
  /** InProgress 전용: popover 에 노출할 포인트 (e.g. "24P") */
  pointsLabel?: string;
  /** InProgress 전용: "이어서 작성" 버튼 클릭 핸들러 */
  onContinue?: () => void;
  /**
   * 별점 영역 클릭 핸들러 (선택).
   * - 지정 시 별점 5개를 감싸는 <button> 으로 wrap → keyboard/screen-reader
   *   친화적 interaction 가능. 외부에서 navigation/modal/state 등 트리거.
   * - 미지정 시 기존 동작 (정적 div) 유지 — 호환성 보존.
   */
  onRatingClick?: () => void;
  className?: string;
};

export function OrderSection({
  state = "default",
  review,
  rating = 0,
  deadline,
  pointsLabel,
  onContinue,
  onRatingClick,
  className,
}: OrderSectionProps) {
  const isInProgress = state === "in-progress";

  return (
    <div
      className={[
        "flex w-full flex-col gap-16 rounded-medium border border-semantic-stroke-basic2 bg-semantic-background-base-white p-16",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ReviewCard {...review} />

      <div className="flex items-end gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          {/* Star rating
              - filled (selected/active) : text-semantic-text-primary (gray-800)
              - empty  (unselected)      : text-semantic-stroke-basic2 (gray-300, Figma #E9EBEE)
              ※ empty 별의 정확한 색은 gray-300. DDS 에 "empty fill light gray" 전용
                semantic token 이 없어 같은 hex(#e9ebee) 의 stroke-basic2 채택
                (semantic 우선 원칙 + 신규 hex/토큰 추가 0건).

              onRatingClick 지정 시 button 으로 wrap → 별점 영역 클릭으로
              navigation/state trigger 가능. 미지정 시 정적 div 유지 (기존 호환). */}
          {(() => {
            const starsContent = [1, 2, 3, 4, 5].map((position) => {
              const filled = rating >= position;
              return (
                <Icon
                  key={position}
                  name="star"
                  size={22}
                  className={
                    filled
                      ? "text-semantic-text-primary"
                      : "text-semantic-stroke-basic2"
                  }
                  aria-label={`별점 ${position}`}
                />
              );
            });
            return onRatingClick ? (
              <button
                type="button"
                onClick={onRatingClick}
                aria-label="별점 작성하기"
                className="flex cursor-pointer items-center gap-2 self-start"
              >
                {starsContent}
              </button>
            ) : (
              <div className="flex items-center gap-2">{starsContent}</div>
            );
          })()}
          {/* Deadline */}
          {deadline && (
            <p className="text-caption-2 font-regular text-semantic-text-secondary">
              작성 기한 :{" "}
              <span className="font-bold">{deadline}</span>
            </p>
          )}
        </div>

        {/* InProgress 전용: popover + chip (수직 stacking, 중앙 정렬)
            Figma 원본: popover 가 chip 위에 absolute 로 띄워져 chip 와 수직 정렬.
            본 구현은 inline 으로 단순화하되 items-center 로 horizontal 정렬 유지. */}
        {isInProgress && (
          <div className="flex shrink-0 flex-col items-center gap-4">
            {pointsLabel && (
              <Popover position="bottom">
                최대 <span className="font-promo">{pointsLabel}</span>
              </Popover>
            )}
            <ButtonChip label="이어서 작성" icon onClick={onContinue} />
          </div>
        )}
      </div>
    </div>
  );
}
