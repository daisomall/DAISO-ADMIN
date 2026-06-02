<template>
  <button
    type="button"
    :class="['da-chip',
             { 'da-chip--selected': selected,
               'da-chip--disabled': disabled }]"
    :aria-pressed="String(selected)"
    :aria-disabled="disabled ? 'true' : null"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    {{ label }}
  </button>
</template>

<script>
// DaChip — DDS 단일 필터 칩
// parent 가 selected state 제어(toggle button 패턴). DaChipsFilter 가 그룹에서 자동 관리.
// a11y: <button aria-pressed>. selected×disabled 4-state 시각 매트릭스(소스 그대로):
//   unselected/enabled  : brand-white  · stroke-basic2 border · text-primary · regular
//   selected/enabled    : gray-700     · no border           · text-white    · bold
//   unselected/disabled : bg-disabled  · stroke-basic2 border · text-disable  · regular
//   selected/disabled   : gray-400     · no border           · text-white    · bold
//   (selected 는 gray-700 — Tab/Button 의 gray-800 과 다름. Figma 명시값 그대로.)
// emits: click(MouseEvent)
export default {
  name: 'DaChip',
  props: {
    label:    { type: String, required: true },
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
}
</script>

<style scoped lang="scss">
.da-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // 36px 고정 height — DDS scale 에 36 토큰 부재로 32+4 합성(DDS 토큰만, 새 값 0). 모든 variant 동일.
  height: calc(var(--dds-spacing-32) + var(--dds-spacing-4));
  padding-left: var(--dds-spacing-12);
  padding-right: var(--dds-spacing-12);
  border-radius: var(--dds-radius-pill);
  font-family: var(--dds-font-body-6-family);
  font-size: var(--dds-font-body-6-size);
  line-height: var(--dds-font-body-6-line);
  letter-spacing: var(--dds-font-body-6-letter);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color .15s, color .15s;

  // default = unselected / enabled
  background-color: var(--dds-color-palette-brand-white);
  border: 1px solid var(--dds-color-stroke-basic2);
  color: var(--dds-color-text-primary);
  font-weight: var(--dds-font-weight-regular);

  // selected / enabled (disabled 조합은 아래 compound 가 덮어씀)
  &--selected {
    background-color: var(--dds-color-palette-gray-700);
    border: none;
    color: var(--dds-color-text-white);
    font-weight: var(--dds-font-weight-bold);
  }

  // unselected / disabled
  &--disabled {
    cursor: not-allowed;
    background-color: var(--dds-color-bg-disabled);
    border: 1px solid var(--dds-color-stroke-basic2);
    color: var(--dds-color-text-disable);
    font-weight: var(--dds-font-weight-regular);
  }

  // selected / disabled — compound(specificity 0,2,0)로 단일 modifier 들을 확정 override
  &--selected#{&}--disabled {
    background-color: var(--dds-color-palette-gray-400);
    border: none;
    color: var(--dds-color-text-white);
    font-weight: var(--dds-font-weight-bold);
  }
}
</style>
