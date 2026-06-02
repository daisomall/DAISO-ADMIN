<template>
  <section class="sr-section">
    <h2 class="sr-section__title">§3 DS/layout — 1</h2>
    <p class="sr-section__desc">page shell. 모바일 폭(360) 프레임에서 확인.</p>

    <h3 class="sr-sub">DaTopNavigation</h3>
    <div class="sr-grid">
      <div class="sr-phone">
        <da-top-navigation title="리뷰" @leading-click="onBack" />
      </div>
    </div>
    <p class="sr-section__desc">leading-click count: {{ backCount }}</p>
  </section>
</template>

<script>
// §3 DS/layout — DaTopNavigation. @leading-click 동작 확인용 카운터.
export default {
  name: 'LayoutSection',
  data() {
    return { backCount: 0 }
  },
  methods: {
    onBack() { this.backCount += 1 },
  },
}
</script>
