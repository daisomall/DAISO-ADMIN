"use client";

import * as React from "react";

import { ButtonChip, Icon, Popover } from "@/app/components/ui";
import { ReviewCard, type ReviewCardProps } from "./ReviewCard";

export type OrderSectionState = "default" | "in-progress";

export type OrderSectionProps = {
  state?: OrderSectionState;
  review: ReviewCardProps;
  rating?: number;
  deadline?: React.ReactNode;
  pointsLabel?: string;
  onContinue?: () => void;
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
                  aria-hidden
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

          {deadline && (
            <p className="text-caption-2 font-regular text-semantic-text-secondary">
              작성 기한 : <span className="font-bold">{deadline}</span>
            </p>
          )}
        </div>

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
