<template>
  <div
    :class="['da-action-area',
             'da-action-area--strong',
             { 'da-action-area--sticky': sticky }]"
  >
    <da-button
      class="da-action-area__button"
      :label="label"
      :variant="buttonVariant"
      size="large"
      :icon="icon"
      :trailing-icon="trailingIcon"
      :disabled="disabled"
      @click="$emit('click', $event)"
    />
  </div>
</template>

<script>
// DaActionArea — DDS 하단 고정 CTA bar
// 내부에 full-width DaButton 을 합성한다. wrapper variant 는 Figma 정의 유일값 "strong".
// emits: click(MouseEvent) — 내부 버튼 클릭 전달
import DaButton from '../DaButton/DaButton.vue'

export default {
  name: 'DaActionArea',
  components: { DaButton },
  props: {
    label:         { type: String, required: true },
    // 내부 버튼 양쪽 placeholder(blank) icon 노출
    icon:          { type: Boolean, default: false },
    // 내부 DaButton variant (Figma Type=Primary|Tertiary)
    buttonVariant: { type: String, default: 'primary',
                     validator: v => ['primary', 'tertiary'].includes(v) },
    // 내부 DaButton trailing icon (icon=false 일 때 동작)
    trailingIcon:  { type: String, default: '' },
    disabled:      { type: Boolean, default: false },
    // Figma 정의 유일 wrapper variant. 향후 확장 대비 prop 유지.
    variant:       { type: String, default: 'strong',
                     validator: v => ['strong'].includes(v) },
    // 뷰포트 하단 sticky/fixed positioning
    sticky:        { type: Boolean, default: false },
  },
}
</script>

<style scoped lang="scss">
.da-action-area {
  width: 100%;
  padding-top: var(--dds-spacing-8);
  padding-bottom: var(--dds-spacing-20);
  padding-left: var(--dds-spacing-20);
  padding-right: var(--dds-spacing-20);
  background-color: var(--dds-color-bg-elevated);
  box-shadow: var(--dds-shadow-level-1);

  // 내부 full-width 버튼 (React: 자식 Button 에 w-full).
  // Vue2 는 자식 컴포넌트 root 에 부모 scopeId 도 적용되어 scoped 로 매칭된다.
  &__button { width: 100%; }

  &--sticky {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto; // fixed + left/right 0 이 폭 결정
    z-index: 50; // 레이어링 값(시각 스케일 토큰 아님) — React z-50 그대로 보존
  }
}
</style>
