<template>
  <main class="review-write">
    <!-- 1. 상단 네비게이션 -->
    <da-top-navigation title="리뷰" @leading-click="onBack" />

    <!-- 2. 상품 + 옵션 선택 -->
    <section class="review-write__product">
      <da-review-card kind="all-case" :product-name="product.name">
        <template #image>
          <span class="review-write__thumb" :style="{ background: product.thumb }" aria-hidden="true" />
        </template>
      </da-review-card>
      <da-dropdown
        v-model="optionValue"
        :options="optionList"
        placeholder="구매한 옵션을 선택해 주세요."
      />
    </section>

    <da-divider variant="thick" />

    <!-- 평가 섹션 묶음 — Figma content frame(좌우 20px 인셋). thick divider/네비/아코디언/CTA 는 바깥 풀폭 유지. -->
    <div class="review-write__ratings">
    <!-- 3. 별점 -->
    <rating-box question="상품에 얼마나 만족하시나요?">
      <template #badge>
        <da-popover position="left">
          <span class="review-write__point">+1P</span> 적립
        </da-popover>
      </template>
      <star-rating-field v-model="form.star" />
    </rating-box>

    <da-divider />

    <!-- 4. 척도 ② 디자인 -->
    <rating-box question="디자인은 마음에 드나요?">
      <option-scale-field v-model="form.design" :options="designOptions" />
    </rating-box>

    <da-divider />

    <!-- 5. 척도 ③ 사용성 -->
    <rating-box question="사용에 어려움은 없나요?">
      <option-scale-field v-model="form.usability" :options="usabilityOptions" />
    </rating-box>

    <da-divider />

    <!-- 6. 텍스트 리뷰 + 첨부 + 안내 -->
    <rating-box question="솔직한 리뷰를 남겨주세요.">
      <template #badge>
        <da-popover position="left">
          <span class="review-write__point">+1P</span> 적립
        </da-popover>
      </template>

      <da-text-input
        v-model="form.text"
        :max-length="1000"
        placeholder="상품을 사용하며 느낀 장단점 등을 10자 이상 입력해 주세요."
      />

      <div class="review-write__attach">
        <da-button
          class="review-write__attach-btn"
          :label="`사진 첨부 (${attach.photo.count}/${attach.photo.max})`"
          variant="tertiary"
          size="medium"
          leading-icon="camera"
          @click="onAttachPhoto"
        />
        <da-button
          class="review-write__attach-btn"
          :label="`동영상 첨부 (${attach.video.count}/${attach.video.max})`"
          variant="tertiary"
          size="medium"
          leading-icon="video"
          @click="onAttachVideo"
        />
      </div>

      <da-accordion-bullet-list class="review-write__tips" :items="tips" />
    </rating-box>
    </div>

    <da-divider variant="thick" />

    <!-- 7. 리뷰 작성 전 확인 정책 -->
    <da-accordion title="리뷰 작성 전 확인해 주세요." :default-expanded="true">
      <da-accordion-bullet-list :items="policy" />
    </da-accordion>

    <!-- 8. 하단 등록 CTA -->
    <da-action-area
      label="등록하기"
      button-variant="primary"
      :disabled="!canSubmit"
      @click="onSubmit"
    />
  </main>
</template>

<script>
// 마이페이지 > 리뷰 작성 화면 (Figma UX_04_011)
// DDS + 페이지 전용 조립 컴포넌트(StarRatingField·OptionScaleField·RatingBox) 결선.
// 텍스트는 Figma 확정값. 단, 별점 1·2·3·5점 라벨은 임시 표준 카피(추정, StarRatingField 기본값),
// 더미/중복 행은 제외(첨부 안내 3행 / 정책 3행).
import RatingBox from '@/components/review/RatingBox.vue'
import StarRatingField from '@/components/review/StarRatingField.vue'
import OptionScaleField from '@/components/review/OptionScaleField.vue'

export default {
  name: 'MypageReviewWritePage',
  components: { RatingBox, StarRatingField, OptionScaleField },
  data() {
    return {
      product: {
        name: '여행용 접이식 숄더백 블랙',
        thumb: 'linear-gradient(135deg,#3a3f4a,#1f242c)',
      },
      // 옵션 목록은 Figma 미정의 → Mock
      optionList: [
        { value: 'op1', label: '블랙 / 1개' },
        { value: 'op2', label: '네이비 / 1개' },
      ],
      optionValue: undefined,

      // 척도 라벨 (Figma 확정값)
      designOptions: ['마음에 들지 않아요', '보통이에요', '아주 마음에 들어요'],
      usabilityOptions: ['불편해요', '보통이에요', '편리해요'],

      // 첨부 카운트
      attach: {
        photo: { count: 0, max: 10 },
        video: { count: 0, max: 1 },
      },

      // 첨부 안내 (Figma 확정값, 더미 행 제외 — 3행)
      tips: [
        '사진 첨부 시 +10P, 동영상 첨부 시 +15P 적립됩니다.',
        '사진 최대 10장, 동영상 최대 1개 첨부 가능합니다.',
        '상품과 무관한 사진/동영상을 첨부한 리뷰는 통보 없이 삭제 및 적립금이 회수됩니다.',
      ],

      // 정책 (Figma 확정값, 더미/중복 행 제외 — 3행. 하위 항목은 \n 으로 줄바꿈)
      policy: [
        '식품 등의 표시·광고에 관한 법률에 의거하여 당사 심의 기준을 준수한 리뷰만 제공됩니다. 식품 표시 광고법에 위배되는 내용은 블라인드 처리할 수 있습니다.\n- 질병 예방/치료 효과가 있다는 내용\n- 의약외품을의약품으로 오인하게 하는 내용\n- 과학적 근거 없이 효능을 과장하는 내용',
        '개인정보 유출 및 권리 침해 기준 및 유의 사항 안내\n① 개인정보(연락처, 주소, 카드번호, 계좌번호, 주민등록번호 등) 유출\n② 모욕적인 발언(성적 발언, 인신 공격, 과도한 비판 등)\n③ 이외 상대방이 불쾌할 수 있는 내용',
        '상기 내용을 게시할 경우, 임의로 삭제 및 경고 처리할 수 있습니다.',
      ],

      // 입력 상태
      form: {
        star: 0,
        design: null,
        usability: null,
        text: '',
      },
    }
  },
  computed: {
    // 등록 활성 기준: 별점≥1 + 척도 ②③ 모두 선택 + 텍스트 10자 이상
    canSubmit() {
      return this.form.star >= 1
        && this.form.design !== null
        && this.form.usability !== null
        && this.form.text.trim().length >= 10
    },
  },
  methods: {
    onBack() {},
    onAttachPhoto() { /* 사진 첨부 — 프로토타입 no-op */ },
    onAttachVideo() {},
    onSubmit() {
      if (!this.canSubmit) return
      // eslint-disable-next-line no-console
      console.log('submit', JSON.parse(JSON.stringify(this.form)))
    },
  },
}
</script>

<style scoped lang="scss">
.review-write {
  display: flex;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--dds-color-bg-base-white);
  font-family: var(--dds-font-family-pretendard);

  &__product {
    display: flex;
    flex-direction: column;
    gap: var(--dds-spacing-12);
    // Figma Product frame: 상단 12 / 하단 24 (비대칭)
    padding: var(--dds-spacing-12) var(--dds-spacing-20) var(--dds-spacing-24);
  }

  // 평가 섹션 — Figma content frame 의 좌우 20px 인셋(335폭). rating-box·thin divider 가 함께 인셋된다.
  // (thick divider/TopNavigation/Accordion/ActionArea 는 이 래퍼 밖이라 풀폭 375 유지.)
  &__ratings {
    display: flex;
    flex-direction: column;
    padding-left: var(--dds-spacing-20);
    padding-right: var(--dds-spacing-20);
  }

  // DaReviewCard #image 슬롯 — 상품 썸네일 placeholder
  &__thumb {
    display: block;
    width: 100%;
    height: 100%;
  }

  // +1P 적립 강조 (Daiso 프로모 서체)
  &__point { font-family: var(--dds-font-family-daiso); }

  &__attach {
    display: flex;
    width: 100%;
    gap: var(--dds-spacing-8);
  }

  &__attach-btn { flex: 1; }

  // 첨부 안내 bullet — caption-1(12) 톤. DaAccordionBulletList 기본은 body-7(13)이므로 상단 여백만 부여.
  &__tips { width: 100%; }
}
</style>
