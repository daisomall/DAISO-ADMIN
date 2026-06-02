<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['da-button',
             `da-button--${variant}`,
             `da-button--${size}`,
             { 'da-button--disabled': disabled }]"
    @click="$emit('click', $event)"
  >
    <da-icon v-if="icon" name="blank" :size="16" />
    <da-icon v-else-if="leadingIcon" :name="leadingIcon" :size="16" />

    <span class="da-button__label">{{ label }}</span>

    <da-icon v-if="icon" name="blank" :size="16" />
    <da-icon v-else-if="trailingIcon" :name="trailingIcon" :size="16" />
  </button>
</template>

<script>
// DaButton — DDS 버튼 primitive
// emits: click(MouseEvent)
import DaIcon from '../DaIcon/DaIcon.vue'

export default {
  name: 'DaButton',
  components: { DaIcon },
  props: {
    label:        { type: String, required: true },
    variant:      { type: String, default: 'primary',
                    validator: v => ['primary', 'tertiary'].includes(v) },
    size:         { type: String, default: 'large',
                    validator: v => ['large', 'medium'].includes(v) },
    icon:         { type: Boolean, default: false },
    leadingIcon:  { type: String, default: '' },
    trailingIcon: { type: String, default: '' },
    disabled:     { type: Boolean, default: false },
    type:         { type: String, default: 'button',
                    validator: v => ['button', 'submit', 'reset'].includes(v) },
  },
}
</script>

<style scoped lang="scss">
.da-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // 네이티브 <button> 의 user-agent 기본 border(outset bevel) 제거.
  // Figma Primary(node 41:961)는 border 없는 채움. tertiary 만 아래서 1px 을 다시 깐다.
  border: none;
  border-radius: var(--dds-radius-small);
  padding-left: var(--dds-spacing-16);
  padding-right: var(--dds-spacing-16);
  font-family: var(--dds-font-family-pretendard);
  font-size: var(--dds-font-body-5-size);
  line-height: var(--dds-font-body-5-line);
  letter-spacing: var(--dds-font-body-5-letter);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color .15s, color .15s;

  &__label { white-space: nowrap; }

  // variant
  &--primary {
    background-color: var(--dds-color-palette-gray-800);
    color: var(--dds-color-text-white);
  }
  &--tertiary {
    background-color: var(--dds-color-palette-brand-white);
    border: 1px solid var(--dds-color-stroke-basic2);
    color: var(--dds-color-text-primary);
  }

  // size
  &--large  { height: var(--dds-spacing-48); gap: var(--dds-spacing-4);
              font-weight: var(--dds-font-weight-bold); }
  &--medium { padding-top: var(--dds-spacing-10); padding-bottom: var(--dds-spacing-10);
              gap: var(--dds-spacing-2); font-weight: var(--dds-font-weight-medium); }

  // state (variant 색을 덮어쓰므로 뒤에 둔다)
  // Figma Type=Disabled(node 41:1117): fill=bg-disabled(#e9ebee) + border=1px stroke-basic2(#e9ebee).
  // border color 가 fill 과 동일해 육안상 안 보이지만, Figma 토큰값과 1:1 로 맞춘다.
  &--disabled {
    background-color: var(--dds-color-bg-disabled);
    border: 1px solid var(--dds-color-stroke-basic2);
    color: var(--dds-color-text-disable);
    cursor: not-allowed;
  }
}
</style>
