<template>
  <button
    type="button"
    role="tab"
    :aria-selected="String(selected)"
    :aria-disabled="disabled ? 'true' : null"
    :disabled="disabled"
    :class="['da-tab',
             { 'da-tab--selected': selected, 'da-tab--disabled': disabled }]"
    @click="$emit('click', $event)"
  >
    <span class="da-tab__inner">
      <span class="da-tab__label">{{ label }}</span>
      <span v-if="hasCount" class="da-tab__badge">{{ count }}</span>
    </span>
    <span class="da-tab__line" aria-hidden="true" />
  </button>
</template>

<script>
// DaTab — DDS 단일 탭
// selected/disabled 는 parent(또는 DaTabGroup)가 제어한다.
// emits: click(MouseEvent)
// state 우선순위: disabled > selected (label/badge 색). line 은 selected 만 보고 결정(disabled 무관) — React 원본 그대로.
export default {
  name: 'DaTab',
  props: {
    label:    { type: String, required: true },
    // count badge. undefined/null/'' 이면 badge 미노출.
    count:    { type: [Number, String], default: null },
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    hasCount() {
      return this.count !== undefined && this.count !== null && this.count !== ''
    },
  },
}
</script>

<style scoped lang="scss">
.da-tab {
  position: relative;
  display: inline-flex;
  height: var(--dds-spacing-48);
  align-items: center;
  justify-content: center;
  padding-left: var(--dds-spacing-4);
  padding-right: var(--dds-spacing-4);
  border: 0;
  background: none;
  font-family: var(--dds-font-family-pretendard);
  cursor: pointer;
  transition: color .15s, background-color .15s;

  &__inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--dds-spacing-8);
  }

  &__label {
    font-size: var(--dds-font-body-5-size);
    line-height: var(--dds-font-body-5-line);
    letter-spacing: var(--dds-font-body-5-letter);
    font-weight: var(--dds-font-weight-medium);
    color: var(--dds-color-text-secondary);
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--dds-spacing-20);
    min-width: var(--dds-spacing-20);
    padding-left: var(--dds-spacing-4);
    padding-right: var(--dds-spacing-4);
    border-radius: var(--dds-radius-pill);
    font-size: var(--dds-font-caption-2-size);
    line-height: var(--dds-font-caption-2-line);
    letter-spacing: var(--dds-font-caption-2-letter);
    font-weight: var(--dds-font-weight-bold);
    color: var(--dds-color-text-white);
    background-color: var(--dds-color-palette-gray-400); // unselected 기본
  }

  &__line {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    // ISSUE-2: 1px hairline — DDS spacing scale(최소 2)에 토큰 부재.
    // React 원본도 Tailwind universal `h-px` 사용. Figma spacing/1 추가 시 토큰 교체.
    height: 1px;
    background-color: var(--dds-color-stroke-basic2);
  }

  // selected (variant)
  &--selected {
    .da-tab__label { font-weight: var(--dds-font-weight-bold); color: var(--dds-color-text-primary); }
    .da-tab__badge { background-color: var(--dds-color-palette-gray-800); }
    .da-tab__line  { height: var(--dds-spacing-2); background-color: var(--dds-color-palette-gray-800); }
  }

  // disabled (selected 뒤 — 동일 specificity 에서 source order 로 우선. label/badge 만 덮고 line 은 안 덮음)
  &--disabled {
    cursor: not-allowed;
    .da-tab__label { font-weight: var(--dds-font-weight-medium); color: var(--dds-color-text-disable); }
    .da-tab__badge { background-color: var(--dds-color-text-disable); }
  }
}
</style>
