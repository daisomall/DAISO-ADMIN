<template>
  <main class="review-page">
    <!-- 1. 상단 프로필/랭킹 헤더 (내부에 DaTopNavigation 포함) -->
    <da-user-ranking-header
      :title="'리뷰'"
      :rank="user.rank"
      :metrics="user.metrics"
      :profile-image="user.profileImage"
      @back="onBack"
      @profile-edit="onProfileEdit"
      @tooltip="onRankTooltip"
    />

    <!-- 2. 탭 (작성 가능한 리뷰 / 내가 작성한 리뷰) -->
    <da-tab-group :tabs="tabs" v-model="activeTab" />

    <div class="review-page__body">
      <!-- 3. 리뷰 작성 인센티브 배너 -->
      <da-review-incentive-banner
        :highlight="incentive.highlight"
        @policy-click="onPolicyClick"
      />

      <!-- 4. 구매처 필터 칩 -->
      <da-chips-filter :chips="filterChips" v-model="activeFilter" />

      <!-- 5. 주문/리뷰 카드 리스트 -->
      <div class="review-page__list">
        <da-order-section
          v-for="item in visibleReviews"
          :key="item.id"
          :state="item.state"
          :review="item.review"
          :rating="item.rating"
          :deadline="item.deadline"
          :points-label="item.pointsLabel"
          @rating-click="onRatingClick(item)"
          @continue="onContinue(item)"
        >
          <template #review-image>
            <span
              class="review-page__thumb"
              :style="{ background: item.thumb }"
              aria-hidden="true"
            />
          </template>
        </da-order-section>
      </div>
    </div>

    <!-- 6. 하단 더보기 -->
    <da-action-area
      label="더보기"
      button-variant="tertiary"
      trailing-icon="chevron-down"
      @click="onLoadMore"
    />
  </main>
</template>

<script>
// 마이페이지 > 리뷰 (리스트 화면, Figma UX_07_086)
// DDS 모듈을 수직 조립한 페이지. 무상태 DDS 에 Mock 데이터/상태를 결선만 한다.
// 신규 DDS 컴포넌트 없음 — 전부 @daiso/design-system 재사용.
export default {
  name: 'MypageReviewPage',
  data() {
    return {
      // 상단 헤더 — 프로필/랭킹/메트릭
      user: {
        rank: 566288,
        profileImage: '', // 비우면 DaIcon profile 폴백
        metrics: [
          { label: '완전꿀팁', count: 3 },
          { label: '리뷰육성상승', count: 31 },
          { label: '궁금증해결', count: 6 },
        ],
      },

      // 탭 — count 는 DaTab badge
      tabs: [
        { label: '작성 가능한 리뷰', count: 12 },
        { label: '내가 작성한 리뷰', count: '99+' },
      ],
      activeTab: 0,

      // 인센티브 배너
      incentive: { highlight: '최대 1,000P' },

      // 구매처 필터 (single 모드) — DaChip 은 label 만 받으므로 count 합성
      filterChips: [
        { label: '다이소몰 구매 8' },
        { label: '매장 구매 4' },
      ],
      activeFilter: [0], // 기본 다이소몰 선택. 빈 배열이면 전체 노출

      // 리뷰 카드 데이터
      reviews: [
        {
          id: 1,
          source: 'online',
          thumb: 'linear-gradient(135deg,#b7e0c2,#8fd3a8)',
          review: {
            kind: 'all-case',
            delivery: '택배',
            date: '2025-07-18',
            productName: '마미케어 바다포도 스킨팩 80매',
          },
          rating: 0,
          deadline: '2025-07-04 (오늘까지)',
          state: 'default',
          pointsLabel: '',
        },
        {
          id: 2,
          source: 'online',
          thumb: 'linear-gradient(135deg,#cfe2f3,#9fc5e8)',
          review: {
            kind: 'all-case',
            delivery: '택배',
            date: '2025-07-18',
            productName: '닥터오라클 큐어소나 쿨링코드 더마쿨러',
          },
          rating: 0,
          deadline: '2025-07-04 (D-24)',
          state: 'default',
          pointsLabel: '',
        },
        {
          id: 3,
          source: 'online',
          thumb: 'linear-gradient(135deg,#3a3f4a,#1f242c)',
          review: {
            kind: 'all-case',
            delivery: '택배',
            date: '2025-07-18',
            productName: '여행용 접이식 숄더백 블랙',
          },
          rating: 0,
          deadline: '2025-07-04 (D-24)',
          state: 'default',
          pointsLabel: '',
        },
        {
          id: 4,
          source: 'online',
          thumb: 'linear-gradient(135deg,#f4cccc,#ea9999)',
          review: {
            kind: 'all-case',
            delivery: '택배',
            date: '2025-07-18',
            productName: '[클라겐]올리브팜 에센셜 마스크 시트',
          },
          rating: 5,
          deadline: '2025-07-04 (D-24)',
          state: 'in-progress',
          pointsLabel: '24P',
        },
        {
          id: 5,
          source: 'store',
          thumb: 'linear-gradient(135deg,#ffe599,#f6c244)',
          review: {
            kind: 'all-case',
            delivery: '택배',
            date: '2025-07-15',
            productName: '실리콘 주방 집게 2종 세트',
          },
          rating: 0,
          deadline: '2025-07-02 (D-22)',
          state: 'default',
          pointsLabel: '',
        },
      ],
    }
  },
  computed: {
    // 선택된 구매처 필터로 리스트 필터링. 빈 선택 → 전체.
    visibleReviews() {
      if (!this.activeFilter.length) return this.reviews
      const sources = this.activeFilter.map(i => (i === 0 ? 'online' : 'store'))
      return this.reviews.filter(r => sources.includes(r.source))
    },
  },
  methods: {
    onBack() { /* 라우터 back — 프로토타입에선 no-op */ },
    onProfileEdit() {},
    onRankTooltip() {},
    onPolicyClick() {},
    onRatingClick(item) {
      // 별점 클릭 → 리뷰 작성 화면(UX_04_011) 진입 예정
      // eslint-disable-next-line no-console
      console.log('rating-click', item.id)
    },
    onContinue(item) {
      // eslint-disable-next-line no-console
      console.log('continue', item.id)
    },
    onLoadMore() {
      // eslint-disable-next-line no-console
      console.log('load-more')
    },
  },
}
</script>

<style scoped lang="scss">
.review-page {
  display: flex;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--dds-color-bg-base-white);
  font-family: var(--dds-font-family-pretendard);

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--dds-spacing-16);
    padding: var(--dds-spacing-16) var(--dds-spacing-20);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--dds-spacing-12);
  }

  // DaReviewCard #image 슬롯 채움 — 썸네일 placeholder(52×52 컨테이너 채움)
  &__thumb {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
