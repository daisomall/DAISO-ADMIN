<template>
  <!-- li(=ul) 에 color 부여 → bullet(currentColor) + text 양쪽 상속 -->
  <ul class="da-accordion-bullet-list">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="da-accordion-bullet-list__item"
    >
      <!-- 3×3 dot — body-7 line-height(18) 컨테이너 내 수직 center 정렬. `•` glyph 의존 제거 -->
      <svg
        class="da-accordion-bullet-list__dot"
        width="3"
        height="18"
        viewBox="0 0 3 18"
        aria-hidden="true"
      >
        <circle cx="1.5" cy="9" r="1.5" fill="currentColor" />
      </svg>
      <!-- white-space: pre-line — item 의 string `\n` 을 line break 로 honor -->
      <div class="da-accordion-bullet-list__text">{{ item }}</div>
    </li>
  </ul>
</template>

<script>
// DaAccordionBulletList — DDS bullet list 패턴 헬퍼
// Accordion detail content 의 반복 패턴 캡슐화. body-7 regular(13/18) + text-secondary + 3×3 dot bullet(Figma imgDot 1:1).
// items: string[] — 각 item 의 `\n` 은 white-space:pre-line 으로 line break.
// hanging indent: items-start + dot shrink-0 + text flex-1 → wrap 시 text 가 bullet 좌측으로 안 떨어짐.
export default {
  name: 'DaAccordionBulletList',
  props: {
    items: { type: Array, required: true },
  },
}
</script>

<style scoped lang="scss">
.da-accordion-bullet-list {
  display: flex;
  flex-direction: column;
  gap: var(--dds-spacing-8);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--dds-color-text-secondary);

  &__item {
    display: flex;
    align-items: flex-start;
    gap: var(--dds-spacing-8);
  }

  &__dot { flex-shrink: 0; }

  &__text {
    flex: 1;
    white-space: pre-line;
    font-family: var(--dds-font-body-7-family);
    font-size: var(--dds-font-body-7-size);
    line-height: var(--dds-font-body-7-line);
    letter-spacing: var(--dds-font-body-7-letter);
    font-weight: var(--dds-font-weight-regular);
  }
}
</style>
