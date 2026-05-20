"use client";

import * as React from "react";

import { Icon } from "@/app/components/ui";
import { DeliveryBadge, type DeliveryType } from "./DeliveryBadge";

export type ReviewCardKind = "all-case" | "store-only";

export type ReviewCardProps = {
  kind?: ReviewCardKind;
  image?: React.ReactNode;
  delivery?: DeliveryType;
  date?: string;
  productName: string;
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
        isAllCase ? "items-start" : "items-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isAllCase ? (
        <div
          className="shrink-0 overflow-hidden bg-palette-gray-300"
          style={{
            width: "calc(var(--spacing-scale-48) + var(--spacing-scale-4))",
            height: "calc(var(--spacing-scale-48) + var(--spacing-scale-4))",
          }}
        >
          {image}
        </div>
      ) : (
        <div
          className="flex shrink-0 items-center justify-center bg-palette-gray-300"
          style={{
            width: "calc(var(--spacing-scale-48) + var(--spacing-scale-4))",
            height: "calc(var(--spacing-scale-48) + var(--spacing-scale-4))",
          }}
        >
          <Icon
            name="store"
            size={24}
            className="text-semantic-text-secondary"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
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

        <p className="truncate text-body-7 font-medium text-semantic-text-primary">
          {productName}
        </p>

        {optionText && (
          <p className="truncate text-caption-1 font-regular text-semantic-text-secondary">
            {optionText}
          </p>
        )}
      </div>
    </div>
  );
}