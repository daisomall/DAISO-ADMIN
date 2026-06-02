<template>
  <div class="rating-box">
    <div class="rating-box__title">
      <h2 class="rating-box__question">{{ question }}</h2>
      <!-- 선택적 +1P 적립 Popover 등 -->
      <slot name="badge" />
    </div>
    <div class="rating-box__content">
      <slot />
    </div>
  </div>
</template>

<script>
// RatingBox — 리뷰 작성 화면 평가 박스 래퍼 (페이지 전용 조립, 비-DDS)
// Figma rating_box 반복 패턴(title[질문 + 선택적 badge] → content) 캡슐화.
// 질문 타이포: DDS heading-5(SUITE bold 16/22). 박스 간 구분선은 페이지에서 DaDivider 로 배치.
export default {
  name: 'RatingBox',
  props: {
    question: { type: String, required: true },
  },
}
</script>

<style scoped lang="scss">
.rating-box {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: var(--dds-spacing-16);
  padding-top: var(--dds-spacing-24);
  padding-bottom: var(--dds-spacing-24);

  &__title {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: var(--dds-spacing-8);
  }

  &__question {
    margin: 0;
    font-family: var(--dds-font-heading-5-family);
    font-size: var(--dds-font-heading-5-size);
    line-height: var(--dds-font-heading-5-line);
    letter-spacing: var(--dds-font-heading-5-letter);
    font-weight: var(--dds-font-weight-bold);
    color: var(--dds-color-text-primary);
    text-align: center;
  }

  &__content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: var(--dds-spacing-8);
  }
}
</style>
