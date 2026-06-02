<template>
  <div class="da-user-ranking-header">
    <da-top-navigation :title="title" @leading-click="$emit('back')" />

    <div class="da-user-ranking-header__body">
      <div class="da-user-ranking-header__user">
        <!-- 프로필 + 편집 배지 -->
        <div class="da-user-ranking-header__profile">
          <div class="da-user-ranking-header__avatar">
            <img
              v-if="profileImage"
              :src="profileImage"
              alt=""
              class="da-user-ranking-header__avatar-img"
            />
            <da-icon
              v-else
              name="profile"
              :size="32"
              class="da-user-ranking-header__avatar-icon"
            />
          </div>

          <button
            type="button"
            aria-label="프로필 편집"
            class="da-user-ranking-header__edit"
            @click="$emit('profile-edit')"
          >
            <da-icon name="write" :size="10" class="da-user-ranking-header__edit-icon" />
          </button>
        </div>

        <div class="da-user-ranking-header__info">
          <!-- 랭킹 행 -->
          <div class="da-user-ranking-header__rank-row">
            <span class="da-user-ranking-header__rank">
              나의 랭킹은 <span class="da-user-ranking-header__rank-num">{{ rank.toLocaleString() }}</span> 등이에요
            </span>
            <button
              type="button"
              aria-label="랭킹 안내"
              class="da-user-ranking-header__tooltip"
              @click="$emit('tooltip')"
            >
              <da-icon name="tooltip" :size="16" />
            </button>
          </div>

          <!-- 메트릭 행 -->
          <div class="da-user-ranking-header__metrics">
            <template v-for="(m, i) in metrics">
              <span :key="`m-${i}`" class="da-user-ranking-header__metric">
                <span class="da-user-ranking-header__metric-label">{{ m.label }}</span>
                <span class="da-user-ranking-header__metric-count">{{ m.count }}</span>
              </span>
              <span
                v-if="i < metrics.length - 1"
                :key="`d-${i}`"
                aria-hidden="true"
                class="da-user-ranking-header__metric-divider"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// DaUserRankingHeader — DDS 리뷰 페이지 상단 프로필/랭킹 헤더
// 무상태 presentational. DaTopNavigation 재사용 + 프로필(54px 원형 + 편집 배지) + 랭킹/메트릭.
// emits: back(뒤로가기), profile-edit(프로필 편집), tooltip(랭킹 안내).
// 의존: DaTopNavigation, DaIcon(profile/write/tooltip).
import DaTopNavigation from '../../layout/DaTopNavigation/DaTopNavigation.vue'
import DaIcon from '../../ui/DaIcon/DaIcon.vue'

export default {
  name: 'DaUserRankingHeader',
  components: { DaTopNavigation, DaIcon },
  props: {
    title:        { type: String, default: '리뷰' },
    rank:         { type: Number, required: true },
    metrics:      { type: Array, required: true },
    profileImage: { type: String, default: '' },
  },
}
</script>

<style scoped lang="scss">
.da-user-ranking-header {
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: var(--dds-color-palette-gray-200);

  &__body {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0 var(--dds-spacing-20) var(--dds-spacing-16);
  }

  &__user {
    display: flex;
    width: 100%;
    align-items: center;
    gap: var(--dds-spacing-12);
  }

  &__profile {
    position: relative;
    flex-shrink: 0;
  }

  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    // 54px = scale-48 + scale-6 (DDS 토큰 합성)
    width: calc(var(--dds-spacing-48) + var(--dds-spacing-6));
    height: calc(var(--dds-spacing-48) + var(--dds-spacing-6));
    border: 1px solid var(--dds-color-dim-black-subtle); // ISSUE-2: hairline, dim/black/subtle
    border-radius: var(--dds-radius-pill);
    background-color: var(--dds-color-palette-gray-300);
  }

  &__avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__avatar-icon { color: var(--dds-color-palette-gray-500); }

  &__edit {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--dds-spacing-16);
    height: var(--dds-spacing-16);
    padding: 0;
    border: 1px solid var(--dds-color-palette-gray-600); // ISSUE-2: hairline
    border-radius: var(--dds-radius-pill);
    background-color: var(--dds-color-bg-base-white);
    cursor: pointer;
  }

  &__edit-icon { color: var(--dds-color-text-primary); }

  &__info {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: var(--dds-spacing-4);
  }

  &__rank-row {
    display: flex;
    align-items: center;
    gap: var(--dds-spacing-2);
  }

  &__rank {
    font-family: var(--dds-font-heading-5-family);
    font-size: var(--dds-font-heading-5-size);
    line-height: var(--dds-font-heading-5-line);
    letter-spacing: var(--dds-font-heading-5-letter);
    font-weight: var(--dds-font-weight-bold);
    color: var(--dds-color-text-primary);
  }

  &__rank-num { font-weight: var(--dds-font-weight-bold); }

  &__tooltip {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--dds-spacing-16);
    height: var(--dds-spacing-16);
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--dds-color-text-secondary);
  }

  &__metrics {
    display: flex;
    align-items: center;
    gap: var(--dds-spacing-8);
  }

  &__metric {
    display: flex;
    align-items: center;
    gap: var(--dds-spacing-2);
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
  }

  &__metric-label {
    font-weight: var(--dds-font-weight-regular);
    color: var(--dds-color-text-secondary);
  }

  &__metric-count {
    font-weight: var(--dds-font-weight-bold);
    color: var(--dds-color-text-primary);
  }

  &__metric-divider {
    flex-shrink: 0;
    width: 1px; // ISSUE-2: 1px 수직 구분선
    height: var(--dds-spacing-10);
    background-color: var(--dds-color-palette-gray-400);
  }
}
</style>
