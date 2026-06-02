<template>
  <div class="da-order-section">
    <!-- 리뷰/상품 정보 행. review 객체를 DaReviewCard 로 그대로 전달. -->
    <da-review-card v-bind="review">
      <template #image><slot name="review-image" /></template>
    </da-review-card>

    <div class="da-order-section__body">
      <div class="da-order-section__left">
        <!-- 별점: rating-click 리스너가 있으면 button, 없으면 div -->
        <component
          :is="interactive ? 'button' : 'div'"
          :type="interactive ? 'button' : null"
          :aria-label="interactive ? '별점 작성하기' : null"
          :class="['da-order-section__stars', { 'da-order-section__stars--button': interactive }]"
          @click="interactive ? $emit('rating-click') : null"
        >
          <da-icon
            v-for="n in 5"
            :key="n"
            name="star"
            :size="22"
            :class="['da-order-section__star', { 'da-order-section__star--filled': rating >= n }]"
          />
        </component>

        <p v-if="deadline || $slots.deadline" class="da-order-section__deadline">
          작성 기한 :
          <span class="da-order-section__deadline-value"><slot name="deadline">{{ deadline }}</slot></span>
        </p>
      </div>

      <div v-if="isInProgress" class="da-order-section__right">
        <da-popover v-if="pointsLabel" position="bottom">
          최대 <span class="da-order-section__promo">{{ pointsLabel }}</span>
        </da-popover>

        <da-button-chip label="이어서 작성" icon @click="$emit('continue', $event)" />
      </div>
    </div>
  </div>
</template>

<script>
// DaOrderSection — DDS 주문/리뷰 작성 섹션
// 무상태 presentational. state 2-variant:
//   default     → 별점 + 작성기한만
//   in-progress → 우측 영역(포인트 Popover + "이어서 작성" DaButtonChip) 추가 노출
// review 는 DaReviewCard props 객체(v-bind 전달). 썸네일 이미지는 #review-image slot 으로 위임.
// deadline 은 String prop 또는 #deadline slot(ReactNode 보존).
// emits: rating-click(별점 클릭), continue(이어서 작성).
// 의존: DaReviewCard, DaIcon(star), DaPopover, DaButtonChip.
import DaReviewCard from '../DaReviewCard/DaReviewCard.vue'
import DaIcon from '../../ui/DaIcon/DaIcon.vue'
import DaPopover from '../../ui/DaPopover/DaPopover.vue'
import DaButtonChip from '../../ui/DaButtonChip/DaButtonChip.vue'

export default {
  name: 'DaOrderSection',
  components: { DaReviewCard, DaIcon, DaPopover, DaButtonChip },
  props: {
    state:       { type: String, default: 'default',
                   validator: v => ['default', 'in-progress'].includes(v) },
    review:      { type: Object, required: true },
    rating:      { type: Number, default: 0 },
    deadline:    { type: String, default: '' },
    pointsLabel: { type: String, default: '' },
  },
  computed: {
    isInProgress() { return this.state === 'in-progress' },
    // rating-click 리스너 유무로 별점 인터랙션 여부 결정(React onRatingClick 분기 대응)
    interactive() { return !!this.$listeners['rating-click'] },
  },
}
</script>

<style scoped lang="scss">
.da-order-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: var(--dds-spacing-16);
  padding: var(--dds-spacing-16);
  border: 1px solid var(--dds-color-stroke-basic2); // ISSUE-2: hairline
  border-radius: var(--dds-radius-medium);
  background-color: var(--dds-color-bg-base-white);

  &__body {
    display: flex;
    align-items: flex-end;
    gap: var(--dds-spacing-16);
  }

  &__left {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: var(--dds-spacing-8);
  }

  &__stars {
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: var(--dds-spacing-2);

    // button variant: 기본 button 스타일 초기화 + 포인터
    &--button {
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
    }
  }

  &__star {
    color: var(--dds-color-stroke-basic2);
    &--filled { color: var(--dds-color-text-primary); }
  }

  &__deadline {
    margin: 0;
    font-family: var(--dds-font-caption-2-family);
    font-size: var(--dds-font-caption-2-size);
    line-height: var(--dds-font-caption-2-line);
    letter-spacing: var(--dds-font-caption-2-letter);
    font-weight: var(--dds-font-weight-regular);
    color: var(--dds-color-text-secondary);
  }

  &__deadline-value { font-weight: var(--dds-font-weight-bold); }

  &__right {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    gap: var(--dds-spacing-4);
  }

  // 포인트 강조 텍스트 — Daiso 프로모 서체(React font-promo 대응)
  &__promo { font-family: var(--dds-font-family-daiso); }
}
</style>
