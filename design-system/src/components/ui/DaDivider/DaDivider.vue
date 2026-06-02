<template>
  <div
    :class="['da-divider', `da-divider--${variant}`]"
    role="separator"
    aria-orientation="horizontal"
  />
</template>

<script>
// DaDivider — DDS 구분선 primitive
// 순수 visual primitive → label/icon/disabled 미적용. variant 만 노출.
// variant: "normal"(1px hairline · stroke-basic2) | "thick"(8px bar · stroke-basic1, 더 연한 색).
export default {
  name: 'DaDivider',
  props: {
    variant: { type: String, default: 'normal',
               validator: v => ['normal', 'thick'].includes(v) },
  },
}
</script>

<style scoped lang="scss">
.da-divider {
  width: 100%;

  // ISSUE-2: 1px hairline 은 DDS spacing scale(최소 2)에 토큰이 없어 리터럴 유지.
  // React 원본도 Tailwind universal hairline `h-px`(1px) 사용. spacing/1 토큰 추가 시 교체.
  &--normal {
    height: 1px;
    background-color: var(--dds-color-stroke-basic2);
  }

  &--thick {
    height: var(--dds-spacing-8);
    background-color: var(--dds-color-stroke-basic1);
  }
}
</style>
