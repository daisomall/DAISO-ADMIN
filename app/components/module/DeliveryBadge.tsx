"use client";

import { Icon } from "@/app/components/ui";

export type DeliveryType = "normal";

const DELIVERY_ARIA_LABEL: Record<DeliveryType, string> = {
  normal: "택배 배송",
};

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

function DeliveryLabelSvg({ type }: { type: DeliveryType }) {
  if (type !== "normal") return null;

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
