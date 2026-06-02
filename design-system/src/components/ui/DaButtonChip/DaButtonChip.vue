<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['da-button-chip',
             `da-button-chip--${variant}`,
             { 'da-button-chip--disabled': disabled }]"
    @click="$emit('click', $event)"
  >
    <span class="da-button-chip__label">{{ label }}</span>
    <da-icon v-if="icon" name="chevron-right" :size="16" />
  </button>
</template>

<script>
// DaButtonChip — DDS button family pill variant
// 일반 DaButton 과 별개 컴포넌트(사이즈/형태 체계가 다름). pill 형태 + 선택적 trailing chevron-right.
// 결정 A: DaChip/DaChipsFilter 에 통합하지 않고 별도 유지 — ButtonChip 은 액션/필터 트리거, Chip 은 선택 상태 표현.
// emits: click(MouseEvent)
import DaIcon from '../DaIcon/DaIcon.vue'

export default {
  name: 'DaButtonChip',
  components: { DaIcon },
  props: {
    label:    { type: String, required: true },
    // true 면 trailing chevron-right 노출
    icon:     { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    // Figma 정의 유일 variant. 향후 확장 대비 prop 유지.
    variant:  { type: String, default: 'default',
                validator: v => ['default'].includes(v) },
    type:     { type: String, default: 'button',
                validator: v => ['button', 'submit', 'reset'].includes(v) },
  },
}
</script>

<style scoped lang="scss">
.da-button-chip {
  display: inline-flex;
  align-items: center;
  height: var(--dds-spacing-32);
  padding-left: var(--dds-spacing-12);
  padding-right: var(--dds-spacing-12);
  gap: var(--dds-spacing-2);
  border-radius: var(--dds-radius-pill);
  // 1px hairline border — DaButton tertiary 와 동일 컨벤션(ISSUE-2). disabled 에서도 stroke 유지.
  border: 1px solid var(--dds-color-stroke-basic2);
  font-family: var(--dds-font-body-6-family);
  font-size: var(--dds-font-body-6-size);
  line-height: var(--dds-font-body-6-line);
  letter-spacing: var(--dds-font-body-6-letter);
  font-weight: var(--dds-font-weight-regular);
  cursor: pointer;
  transition: background-color .15s, color .15s;

  &__label { white-space: nowrap; }

  &--default {
    background-color: var(--dds-color-palette-brand-white);
    color: var(--dds-color-text-primary);
  }

  // state (variant 색을 덮어쓰므로 뒤에 둔다). border 는 리셋하지 않는다 — stroke-basic2 유지(소스 기준).
  &--disabled {
    background-color: var(--dds-color-bg-disabled);
    color: var(--dds-color-text-disable);
    cursor: not-allowed;
  }
}
</style>
