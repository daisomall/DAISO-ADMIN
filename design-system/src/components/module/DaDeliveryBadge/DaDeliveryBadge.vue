<template>
  <span
    class="da-delivery-badge"
    role="img"
    :aria-label="ariaLabel"
  >
    <da-icon name="delivery" :size="12" aria-hidden="true" />
    <!-- 라벨은 텍스트가 아니라 SVG vector (Figma text-as-SVG 1:1, 결정 ①). type='normal' = "택배" -->
    <svg
      class="da-delivery-badge__label"
      width="16.372"
      height="9"
      viewBox="0 0 16.3722 9"
      fill="currentColor"
      aria-hidden="true"
      role="presentation"
    >
      <path d="M3.842 4.93548H0V0.509885H3.63923V1.58897H1.34861V2.20812H3.61917V3.23725H1.34861V3.84703H3.842V4.93548ZM7.52242 5.81374V9H6.17381V6.87201H1.54081V5.81374H7.52242ZM7.52242 0V5.43392H6.24457V3.25598H5.55495V5.37357H4.29823V0.170656H5.55495V2.18835H6.24457V0.00104041H7.52242V0Z" />
      <path d="M8.80008 0.6795H10.0568V2.75754H11.1615V0.6795H12.4182V6.6025H8.79903V0.6795H8.80008ZM11.1615 5.54422V3.79605H10.0568V5.54422H11.1615ZM13.0878 0.140478H14.3445V3.42664H15.0848V0H16.3721V8.68991H15.0848V4.48491H14.3445V8.29032H13.0878V0.140478Z" />
    </svg>
  </span>
</template>

<script>
// DaDeliveryBadge — DDS 택배 배지
// 순수 visual. DaIcon(delivery) + 라벨 SVG vector 합성. 라벨은 텍스트가 아닌 vector(Figma 1:1, 결정 ①).
// type='normal' 유일(현재). 향후 type 확장 시 라벨 path 추가 필요.
import DaIcon from '../../ui/DaIcon/DaIcon.vue'

const ARIA_LABEL = { normal: '택배 배송' }

export default {
  name: 'DaDeliveryBadge',
  components: { DaIcon },
  props: {
    type: { type: String, default: 'normal',
            validator: v => ['normal'].includes(v) },
  },
  computed: {
    ariaLabel() { return ARIA_LABEL[this.type] },
  },
}
</script>

<style scoped lang="scss">
.da-delivery-badge {
  display: inline-flex;
  align-items: center;
  gap: 1px; // ISSUE-2: gap-px(1px) — spacing scale(최소 2)에 토큰 부재. React gap-px 보존.
  padding: var(--dds-spacing-2) var(--dds-spacing-4);
  background-color: var(--dds-color-palette-gray-300);
  color: var(--dds-color-text-primary);

  &__label { display: block; }
}
</style>
