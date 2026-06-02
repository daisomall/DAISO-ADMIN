<template>
  <div class="option-scale-field">
    <!-- 원형 옵션 + 연결 라인 -->
    <div class="option-scale-field__track" role="radiogroup" :aria-label="ariaLabel">
      <template v-for="(opt, i) in options">
        <button
          :key="`opt-${i}`"
          type="button"
          class="option-scale-field__option"
          :class="{ 'option-scale-field__option--selected': value === i }"
          :aria-label="opt"
          :aria-checked="String(value === i)"
          role="radio"
          @click="$emit('input', i)"
        >
          <span class="option-scale-field__dot" />
        </button>
        <span
          v-if="i < options.length - 1"
          :key="`line-${i}`"
          class="option-scale-field__line"
          aria-hidden="true"
        />
      </template>
    </div>

    <!-- 하단 라벨 -->
    <div class="option-scale-field__labels">
      <span
        v-for="(opt, i) in options"
        :key="`label-${i}`"
        class="option-scale-field__label"
        :class="{ 'option-scale-field__label--selected': value === i }"
      >{{ opt }}</span>
    </div>
  </div>
</template>

<script>
// OptionScaleField — 원형 N-point 척도 선택 (페이지 전용 조립, 비-DDS)
// Figma rating_detail_container 패턴: 원형 옵션(40px 타깃 / 32px disc) + 1px 연결 라인 + 하단 라벨.
// 선택 = gray-800 채움 / 미선택 = gray-200 채움. v-model: value(Number index|null) / input(i).
// 옵션 개수(options.length)에 따라 라인 자동 배치. ②디자인/③사용성 평가 공통.
export default {
  name: 'OptionScaleField',
  model: { prop: 'value', event: 'input' },
  props: {
    // 라벨 문자열 배열 (예: ['불편해요','보통이에요','편리해요'])
    options:  { type: Array, required: true },
    // 선택 인덱스. null = 미선택.
    value:    { type: Number, default: null },
    ariaLabel: { type: String, default: '평가 선택' },
  },
}
</script>

<style scoped lang="scss">
.option-scale-field {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: var(--dds-spacing-8);

  &__track {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__option {
    // 40px 타깃 = scale-32 + scale-8 합성(DDS 토큰만, DaReviewCard 52 합성 규칙과 동일)
    display: flex;
    width: calc(var(--dds-spacing-32) + var(--dds-spacing-8));
    height: calc(var(--dds-spacing-32) + var(--dds-spacing-8));
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
  }

  &__dot {
    // 32px disc = scale-32 (DDS 토큰)
    width: var(--dds-spacing-32);
    height: var(--dds-spacing-32);
    border-radius: var(--dds-radius-pill);
    background-color: var(--dds-color-palette-gray-200); // 미선택
    transition: background-color .15s;

    .option-scale-field__option--selected & {
      background-color: var(--dds-color-palette-gray-800); // 선택
    }
  }

  &__line {
    // 40px = scale-32 + scale-8 합성 (option 타깃과 동일 폭)
    width: calc(var(--dds-spacing-32) + var(--dds-spacing-8));
    height: 1px; // ISSUE-2: 1px hairline (DDS spacing scale 최소 2)
    flex-shrink: 0;
    background-color: var(--dds-color-stroke-basic2);
  }

  &__labels {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    // label width(56) + gap(24) = pitch 80 = circle pitch(40+40)
    // → 라벨 중심이 원 중심과 정확히 정렬 (magic number 없이 토큰 합성으로 해결)
    gap: var(--dds-spacing-24);
  }

  &__label {
    // 56px = scale-48 + scale-8 합성
    width: calc(var(--dds-spacing-48) + var(--dds-spacing-8));
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
    font-weight: var(--dds-font-weight-medium);
    color: var(--dds-color-text-disable); // 미선택
    text-align: center;

    &--selected { color: var(--dds-color-text-primary); } // 선택
  }
}
</style>
