<template>
  <header class="da-top-navigation">
    <button
      type="button"
      class="da-top-navigation__leading"
      aria-label="뒤로가기"
      @click="$emit('leading-click', $event)"
    >
      <da-icon name="arrow-left" :size="24" />
    </button>
    <div class="da-top-navigation__inner">
      <h1 class="da-top-navigation__title">{{ title }}</h1>
    </div>
  </header>
</template>

<script>
// DaTopNavigation — DDS 페이지 헤더
// 구조(Figma 1:1): outer px-16 py-12 gap-12 / leading 32×32 wrapper + arrow-left(24) 고정 / inner px-8 py-4 / title Body4 Bold.
// height ≈54px (py-12 + py-4 + body-4 line 22) — Figma 56 과 2px deviation, DDS scale 내 최대 근사.
// bg 미설정: parent context 의 배경 상속(컨테이너 결정권은 호출부). emits leading-click(MouseEvent).
import DaIcon from '../../ui/DaIcon/DaIcon.vue'

export default {
  name: 'DaTopNavigation',
  components: { DaIcon },
  props: {
    title: { type: String, required: true },
  },
}
</script>

<style scoped lang="scss">
.da-top-navigation {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--dds-spacing-12);
  padding-left: var(--dds-spacing-16);
  padding-right: var(--dds-spacing-16);
  padding-top: var(--dds-spacing-12);
  padding-bottom: var(--dds-spacing-12);
  // bg 미설정 — parent 배경 상속.

  &__leading {
    display: flex;
    width: var(--dds-spacing-32);
    height: var(--dds-spacing-32);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    color: var(--dds-color-text-primary); // arrow-left(currentColor) 상속
  }

  &__inner {
    display: flex;
    flex: 1;
    align-items: center;
    padding-left: var(--dds-spacing-8);
    padding-right: var(--dds-spacing-8);
    padding-top: var(--dds-spacing-4);
    padding-bottom: var(--dds-spacing-4);
  }

  &__title {
    flex: 1;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: var(--dds-font-body-4-family);
    font-size: var(--dds-font-body-4-size);
    line-height: var(--dds-font-body-4-line);
    letter-spacing: var(--dds-font-body-4-letter);
    font-weight: var(--dds-font-weight-bold);
    color: var(--dds-color-text-primary);
  }
}
</style>
