<template>
  <div class="da-review-incentive-banner">
    <div class="da-review-incentive-banner__notice">
      <div class="da-review-incentive-banner__notice-inner">
        <!-- PenGlyph: brand-red stroke 기반 벡터(DaIcon 미편입, inline 보존) -->
        <svg
          class="da-review-incentive-banner__pen"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M11 3l2 2-7.5 7.5H3.5V10.5L11 3z"
            stroke="currentColor"
            stroke-width="1.3"
            stroke-linejoin="round"
          />
          <path d="M10 4l2 2" stroke="currentColor" stroke-width="1.3" />
        </svg>
        <p class="da-review-incentive-banner__text">
          {{ prefix }} <span class="da-review-incentive-banner__highlight">{{ highlight }}</span> {{ suffix }}
        </p>
      </div>
    </div>

    <button
      type="button"
      class="da-review-incentive-banner__policy"
      @click="$emit('policy-click')"
    >
      <span>리뷰 정책</span>
      <da-icon name="tooltip" :size="16" />
    </button>
  </div>
</template>

<script>
// DaReviewIncentiveBanner — DDS 리뷰 작성 인센티브 안내 + 정책 링크
// 무상태 presentational. 안내행(PenGlyph + "리뷰 작성하고 {강조} 받아가세요.") + 정책 링크 버튼.
// PenGlyph 는 brand-red stroke 기반 벡터 → DaIcon(fill 전용) 미편입, inline SVG 보존(DaDeliveryBadge 결정 ① 동일).
// emits: policy-click(정책 링크 클릭).
// 의존: DaIcon(tooltip).
import DaIcon from '../../ui/DaIcon/DaIcon.vue'

export default {
  name: 'DaReviewIncentiveBanner',
  components: { DaIcon },
  props: {
    // 강조 P 값 — e.g. "최대 2,800P"
    highlight: { type: String, required: true },
    prefix:    { type: String, default: '리뷰 작성하고' },
    suffix:    { type: String, default: '받아가세요.' },
  },
}
</script>

<style scoped lang="scss">
.da-review-incentive-banner {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: var(--dds-spacing-12);

  &__notice {
    display: flex;
    align-items: center;
    gap: var(--dds-spacing-8);
    padding: var(--dds-spacing-6) var(--dds-spacing-12);
    // radius-small(2px) — React 는 spacing-scale-2(2px) 사용, DDS radius-small 와 동일값
    border-radius: var(--dds-radius-small);
    background-color: var(--dds-color-bg-grouped);
  }

  &__notice-inner {
    display: flex;
    align-items: center;
    gap: var(--dds-spacing-6);
  }

  &__pen {
    flex-shrink: 0;
    color: var(--dds-color-palette-brand-red);
  }

  &__text {
    margin: 0;
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
    font-weight: var(--dds-font-weight-medium);
    color: var(--dds-color-text-primary);
  }

  &__highlight {
    font-weight: var(--dds-font-weight-bold);
    color: var(--dds-color-palette-brand-red);
  }

  &__policy {
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: var(--dds-spacing-2);
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--dds-font-body-7-family);
    font-size: var(--dds-font-body-7-size);
    line-height: var(--dds-font-body-7-line);
    letter-spacing: var(--dds-font-body-7-letter);
    font-weight: var(--dds-font-weight-medium);
    color: var(--dds-color-text-secondary);
  }
}
</style>
