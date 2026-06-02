<template>
  <div
    :class="['da-review-card', `da-review-card--${kind}`]"
  >
    <!-- 썸네일 52×52 = calc(spacing-48 + spacing-4) -->
    <div class="da-review-card__thumb">
      <!-- store-only: image 대신 store 아이콘 / all-case: image slot -->
      <da-icon
        v-if="kind === 'store-only'"
        name="store"
        :size="24"
        class="da-review-card__store-icon"
      />
      <slot v-else name="image" />
    </div>

    <div class="da-review-card__content">
      <!-- meta row: all-case 이고 delivery 또는 date 가 있을 때만 -->
      <div
        v-if="kind === 'all-case' && (delivery || date)"
        class="da-review-card__meta"
      >
        <da-delivery-badge v-if="delivery" :type="delivery" />
        <span v-if="date" class="da-review-card__date">{{ date }}</span>
      </div>

      <p class="da-review-card__name">{{ productName }}</p>

      <p v-if="optionText" class="da-review-card__option">{{ optionText }}</p>
    </div>
  </div>
</template>

<script>
// DaReviewCard — DDS 리뷰/상품 정보 행
// 무상태 presentational. kind 2-variant:
//   all-case  → items-start, 썸네일=image(slot), 메타행(DaDeliveryBadge + date) 노출
//   store-only→ items-center, 썸네일=store 아이콘(secondary), 메타행 없음
// image 는 named slot #image (ReactNode 자유 컴포지션 보존, 결정 ②).
// 의존: DaDeliveryBadge, DaIcon(store).
import DaIcon from '../../ui/DaIcon/DaIcon.vue'
import DaDeliveryBadge from '../DaDeliveryBadge/DaDeliveryBadge.vue'

export default {
  name: 'DaReviewCard',
  components: { DaIcon, DaDeliveryBadge },
  props: {
    kind:        { type: String, default: 'all-case',
                   validator: v => ['all-case', 'store-only'].includes(v) },
    // all-case 메타행의 배송 타입(DaDeliveryBadge type). 비우면 배지 미노출.
    delivery:    { type: String, default: '' },
    date:        { type: String, default: '' },
    productName: { type: String, required: true },
    optionText:  { type: String, default: '' },
  },
}
</script>

<style scoped lang="scss">
.da-review-card {
  display: flex;
  width: 100%;
  gap: var(--dds-spacing-10);

  // kind 별 수직 정렬
  &--all-case   { align-items: flex-start; }
  &--store-only { align-items: center; }

  &__thumb {
    flex-shrink: 0;
    overflow: hidden;
    // 52px 고정 = scale-48 + scale-4 합성(DDS 토큰만). ReviewCard/Profile 합성 규칙과 동일.
    width: calc(var(--dds-spacing-48) + var(--dds-spacing-4));
    height: calc(var(--dds-spacing-48) + var(--dds-spacing-4));
    background-color: var(--dds-color-palette-gray-300);

    // store-only 일 때 아이콘 중앙 정렬
    .da-review-card--store-only & {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__store-icon { color: var(--dds-color-text-secondary); }

  &__content {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: var(--dds-spacing-4);
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--dds-spacing-6);
  }

  &__date {
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
    font-weight: var(--dds-font-weight-regular);
    color: var(--dds-color-text-secondary);
  }

  &__name {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: var(--dds-font-body-7-family);
    font-size: var(--dds-font-body-7-size);
    line-height: var(--dds-font-body-7-line);
    letter-spacing: var(--dds-font-body-7-letter);
    font-weight: var(--dds-font-weight-medium);
    color: var(--dds-color-text-primary);
  }

  &__option {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
    font-weight: var(--dds-font-weight-regular);
    color: var(--dds-color-text-secondary);
  }
}
</style>
