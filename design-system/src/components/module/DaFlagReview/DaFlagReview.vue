<template>
  <span :class="['da-flag-review', `da-flag-review--${type}`]">
    {{ isRepurchase ? '재구매' : '매장구매' }}
  </span>
</template>

<script>
// DaFlagReview — DDS 리뷰 플래그 배지
// 무상태 presentational. type 2-variant:
//   repurchase        → brand-red 계열(5% bg / 10% border / red text), 라벨 "재구매"
//   in-store-purchase → stroke-basic1 bg / dim-black-thin border / text-primary, 라벨 "매장구매"
export default {
  name: 'DaFlagReview',
  props: {
    type: {
      type: String,
      default: 'in-store-purchase',
      validator: v => ['repurchase', 'in-store-purchase'].includes(v),
    },
  },
  computed: {
    isRepurchase() { return this.type === 'repurchase' },
  },
}
</script>

<style scoped lang="scss">
.da-flag-review {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: var(--dds-spacing-2) var(--dds-spacing-6);
  border: 1px solid; // ISSUE-2: hairline. border-color 는 variant 에서 지정
  border-radius: var(--dds-radius-pill);
  font-family: var(--dds-font-caption-3-family);
  font-size: var(--dds-font-caption-3-size);
  line-height: var(--dds-font-caption-3-line);
  letter-spacing: var(--dds-font-caption-3-letter);
  font-weight: var(--dds-font-weight-medium);

  &--repurchase {
    // brand-red 5% bg / 10% border — DDS alpha 토큰 부재(ISSUE-3), brand-red(#d70011) 리터럴
    background-color: rgba(215, 0, 17, 0.05);
    border-color: rgba(215, 0, 17, 0.1);
    color: var(--dds-color-palette-brand-red);
  }

  &--in-store-purchase {
    background-color: var(--dds-color-stroke-basic1);
    border-color: var(--dds-color-dim-black-thin);
    color: var(--dds-color-text-primary);
  }
}
</style>
