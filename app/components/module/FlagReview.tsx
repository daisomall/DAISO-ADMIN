"use client";

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