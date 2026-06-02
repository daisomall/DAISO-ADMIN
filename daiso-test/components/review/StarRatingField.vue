<template>
  <div class="star-rating-field">
    <!-- 클릭형 별 5개 (40px). value 이하 인덱스까지 채움. -->
    <div class="star-rating-field__stars" role="radiogroup" :aria-label="ariaLabel">
      <button
        v-for="n in 5"
        :key="n"
        type="button"
        class="star-rating-field__star"
        :class="{ 'star-rating-field__star--filled': value >= n }"
        :aria-label="`${n}점`"
        :aria-checked="String(value === n)"
        role="radio"
        @click="$emit('input', n)"
      >
        <da-icon name="star" :size="40" />
      </button>
    </div>

    <!-- 점수 라벨. 미선택(0)이면 미노출. -->
    <p v-if="currentLabel" class="star-rating-field__label">{{ currentLabel }}</p>
  </div>
</template>

<script>
// StarRatingField — 별점 입력 (페이지 전용 조립, 비-DDS)
// DaIcon(star 40px)을 building block 으로 사용. v-model: value(Number 0~5) / input(n).
// 점수별 라벨은 labels prop(맵). 4점 '무난해요'만 Figma 확정값,
// 1·2·3·5점은 임시 표준 카피(추정값) — 디자인 확정 시 교체 예정.
export default {
  name: 'StarRatingField',
  model: { prop: 'value', event: 'input' },
  props: {
    value:    { type: Number, default: 0 },
    ariaLabel: { type: String, default: '별점' },
    // { 1..5: label } — 4='무난해요'(확정), 그 외 임시(추정)
    labels: {
      type: Object,
      default: () => ({
        1: '별로예요',
        2: '그냥 그래요',
        3: '보통이에요',
        4: '무난해요',
        5: '최고예요',
      }),
    },
  },
  computed: {
    currentLabel() { return this.value ? this.labels[this.value] : '' },
  },
}
</script>

<style scoped lang="scss">
.star-rating-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dds-spacing-8);

  &__stars {
    display: flex;
    align-items: center;
    gap: var(--dds-spacing-4);
  }

  &__star {
    display: flex;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    color: var(--dds-color-stroke-basic2); // 미선택 별 색
    &--filled { color: var(--dds-color-text-primary); }
  }

  &__label {
    margin: 0;
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
    font-weight: var(--dds-font-weight-medium);
    color: var(--dds-color-text-primary);
  }
}
</style>
