<template>
  <div :class="['da-popover', `da-popover--${position}`]">
    <!-- position="left": 화살표가 bubble 왼쪽 (← [ bubble ]) -->
    <svg
      v-if="position === 'left'"
      class="da-popover__arrow"
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="currentColor"
      aria-hidden="true"
      role="presentation"
    >
      <path d="M5 0L0 4.5L5 9Z" />
    </svg>

    <div class="da-popover__bubble" role="tooltip">
      <slot />
    </div>

    <!-- position="bottom": 화살표가 bubble 아래 ([ bubble ] ↓) -->
    <svg
      v-if="position === 'bottom'"
      class="da-popover__arrow"
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="currentColor"
      aria-hidden="true"
      role="presentation"
    >
      <path d="M0 0L4.5 5L9 0Z" />
    </svg>
  </div>
</template>

<script>
// DaPopover — DDS 말풍선(tooltip-like bubble)
// 시각 형태만 제공. open/close state·anchor positioning 은 consumer 책임(원본 동일).
// position 의미(Figma 명명 그대로): "bottom"=화살표가 bubble 아래(target 이 아래), "left"=화살표가 bubble 왼쪽(target 이 왼쪽).
//   → 일반 tooltip 라이브러리의 placement 와 반대 의미.
// children → default slot (텍스트/강조/icon 자유 컴포지션).
// 화살표 색은 wrapper 의 color(gray-800)를 currentColor 로 상속한다.
export default {
  name: 'DaPopover',
  props: {
    // "bottom" | "left" (Figma 변수명 그대로 보존)
    position: { type: String, default: 'bottom',
                validator: v => ['bottom', 'left'].includes(v) },
  },
}
</script>

<style scoped lang="scss">
.da-popover {
  display: inline-flex;
  align-items: center;
  // 화살표(fill: currentColor)가 상속할 색. bubble 배경과 동일.
  color: var(--dds-color-palette-gray-800);

  // 화살표가 bubble 아래 → 세로 스택
  &--bottom { flex-direction: column; }
  // 화살표가 bubble 왼쪽 → 가로 스택
  &--left   { flex-direction: row; }

  &__bubble {
    display: inline-flex;
    align-items: center;
    gap: var(--dds-spacing-2);
    padding: var(--dds-spacing-4) var(--dds-spacing-10);
    background-color: var(--dds-color-palette-gray-800);
    border-radius: var(--dds-radius-small);
    color: var(--dds-color-text-white);
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
    font-weight: var(--dds-font-weight-medium);
  }

  &__arrow { display: block; }
}
</style>
