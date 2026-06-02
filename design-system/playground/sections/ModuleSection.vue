<template>
  <section class="sr-section">
    <h2 class="sr-section__title">§4 DS/module — 6</h2>
    <p class="sr-section__desc">module 조합 컴포넌트 전수. 페이지 폭(360) 카드에서 확인.</p>

    <!-- DaDeliveryBadge -->
    <h3 class="sr-sub">DaDeliveryBadge</h3>
    <div class="sr-grid">
      <div class="sr-card">
        <div class="sr-card__label">type=normal</div>
        <div class="sr-card__demo"><da-delivery-badge type="normal" /></div>
      </div>
    </div>

    <!-- DaReviewCard -->
    <h3 class="sr-sub">DaReviewCard</h3>
    <div class="sr-grid">
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">all-case (image slot + delivery + date)</div>
        <da-review-card
          kind="all-case"
          delivery="normal"
          date="2026.06.01"
          product-name="다이소 수납 정리 박스 3종 세트"
          option-text="옵션 : 화이트 / 대"
        >
          <template #image><div :style="thumb('c5c8ce')" /></template>
        </da-review-card>
      </div>
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">store-only</div>
        <da-review-card
          kind="store-only"
          product-name="매장 구매 상품"
          option-text="강남점"
        />
      </div>
    </div>

    <!-- DaFlagReview -->
    <h3 class="sr-sub">DaFlagReview</h3>
    <div class="sr-grid">
      <div class="sr-card">
        <div class="sr-card__label">repurchase</div>
        <div class="sr-card__demo"><da-flag-review type="repurchase" /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">in-store-purchase</div>
        <div class="sr-card__demo"><da-flag-review type="in-store-purchase" /></div>
      </div>
    </div>

    <!-- DaOrderSection -->
    <h3 class="sr-sub">DaOrderSection</h3>
    <div class="sr-grid">
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">default · rating={{ ratingA }} (별점 클릭 가능)</div>
        <da-order-section
          :review="reviewData"
          :rating="ratingA"
          deadline="2026.06.10"
          @rating-click="ratingA = (ratingA % 5) + 1"
        >
          <template #review-image><div :style="thumb('c5c8ce')" /></template>
        </da-order-section>
      </div>
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">in-progress · pointsLabel + 이어서 작성</div>
        <da-order-section
          state="in-progress"
          :review="reviewData"
          :rating="4"
          deadline="2026.06.10"
          points-label="2,800P"
          @continue="continueCount += 1"
        >
          <template #review-image><div :style="thumb('a7c4e0')" /></template>
        </da-order-section>
      </div>
    </div>
    <p class="sr-section__desc">continue click count: {{ continueCount }}</p>

    <!-- DaUserRankingHeader -->
    <h3 class="sr-sub">DaUserRankingHeader</h3>
    <div class="sr-grid">
      <div class="sr-phone">
        <da-user-ranking-header
          :rank="1234"
          :metrics="metrics"
          :profile-image="avatar"
        />
      </div>
      <div class="sr-phone">
        <da-user-ranking-header :rank="58" :metrics="metrics" />
      </div>
    </div>

    <!-- DaReviewIncentiveBanner -->
    <h3 class="sr-sub">DaReviewIncentiveBanner</h3>
    <div class="sr-grid">
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">기본 · policy-click count: {{ policyCount }}</div>
        <da-review-incentive-banner
          highlight="최대 2,800P"
          @policy-click="policyCount += 1"
        />
      </div>
    </div>
  </section>
</template>

<script>
// §4 DS/module — 6종. 썸네일/아바타는 오프라인 안전 SVG data URI.
export default {
  name: 'ModuleSection',
  data() {
    return {
      reviewData: {
        kind: 'all-case',
        delivery: 'normal',
        date: '2026.06.01',
        productName: '다이소 수납 정리 박스 3종 세트',
        optionText: '옵션 : 화이트 / 대',
      },
      ratingA: 3,
      continueCount: 0,
      metrics: [
        { label: '리뷰', count: 128 },
        { label: '좋아요', count: '1.2천' },
        { label: '팔로워', count: 34 },
      ],
      avatar: SWATCH('a7c4e0'),
      policyCount: 0,
    }
  },
  methods: {
    // ReviewCard/OrderSection 썸네일 placeholder(52×52 채움)
    thumb(hex) {
      return {
        width: '52px',
        height: '52px',
        background: `#${hex}`,
      }
    },
  },
}

function SWATCH(hex) {
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='54' height='54'><rect width='54' height='54' fill='%23${hex}'/></svg>`
}
</script>
