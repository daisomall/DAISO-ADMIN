import { cva } from "class-variance-authority";

export const buttonStyle = cva(
  "inline-flex items-center justify-center rounded-small px-16 font-sans transition-colors",
  {
    variants: {
      variant: {
        primary:
          "bg-palette-gray-800 text-semantic-text-white",

        tertiary:
          "bg-palette-brand-white border border-semantic-stroke-basic2 text-semantic-text-primary",
      },

      size: {
        large:
          "h-48 gap-4 text-body-5 font-bold",

        medium:
          "py-10 gap-2 text-body-5 font-medium",
      },

      disabled: {
        true:
          "bg-semantic-background-disabled text-semantic-text-disable cursor-not-allowed",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "large",
    },
  },
);