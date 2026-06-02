<template>
  <main class="smoke">
    <h1 class="smoke__title">daiso-test — DDS 연결 스모크 테스트</h1>
    <p class="smoke__desc">
      아래 요소가 DDS 스타일(토큰·폰트·컴포넌트)대로 렌더되면 연결 성공.
    </p>

    <section class="smoke__group">
      <h2 class="smoke__label">DaButton</h2>
      <div class="smoke__row">
        <da-button label="Primary 버튼" variant="primary" size="large" />
        <da-button label="Tertiary 버튼" variant="tertiary" size="large" />
        <da-button label="Disabled" variant="primary" size="large" :disabled="true" />
      </div>
    </section>

    <section class="smoke__group">
      <h2 class="smoke__label">DaDivider</h2>
      <da-divider />
    </section>
  </main>
</template>

<script>
// 스모크 테스트 페이지 — DDS 컴포넌트가 전역 등록(plugins/design-system.js)되어 렌더되는지 확인.
// 본격 페이지(마이페이지 > 리뷰)는 후속 단계에서 pages/mypage/review/ 에 구현.
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
.smoke {
  padding: var(--dds-spacing-24);
  font-family: var(--dds-font-family-pretendard);
  color: var(--dds-color-text-primary);
}
.smoke__title {
  font-family: var(--dds-font-family-suite);
  font-size: var(--dds-font-heading-3-size);
  line-height: var(--dds-font-heading-3-line);
}
.smoke__desc {
  font-size: var(--dds-font-body-6-size);
  line-height: var(--dds-font-body-6-line);
  color: var(--dds-color-text-secondary);
}
.smoke__group { margin-top: var(--dds-spacing-32); }
.smoke__label {
  font-size: var(--dds-font-heading-6-size);
  line-height: var(--dds-font-heading-6-line);
  margin-bottom: var(--dds-spacing-12);
}
.smoke__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dds-spacing-12);
  align-items: center;
}
</style>
