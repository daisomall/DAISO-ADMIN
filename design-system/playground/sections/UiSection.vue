<template>
  <section class="sr-section">
    <h2 class="sr-section__title">§2 DS/ui — 14</h2>
    <p class="sr-section__desc">primitive 14종 · variant/state 매트릭스 + v-model 인터랙션.</p>

    <!-- DaIcon -->
    <h3 class="sr-sub">DaIcon</h3>
    <div class="sr-grid">
      <div v-for="n in iconNames" :key="n" class="sr-card">
        <div class="sr-card__label">{{ n }}</div>
        <div class="sr-card__demo"><da-icon :name="n" :size="24" /></div>
      </div>
    </div>
    <div class="sr-grid" style="margin-top:12px">
      <div class="sr-card">
        <div class="sr-card__label">size 16 / 24 / 32</div>
        <div class="sr-card__demo">
          <da-icon name="store" :size="16" />
          <da-icon name="store" :size="24" />
          <da-icon name="store" :size="32" />
        </div>
      </div>
    </div>

    <!-- DaButton -->
    <h3 class="sr-sub">DaButton</h3>
    <div class="sr-grid">
      <div class="sr-card">
        <div class="sr-card__label">primary / large</div>
        <div class="sr-card__demo"><da-button label="확인" /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">primary / medium</div>
        <div class="sr-card__demo"><da-button label="확인" size="medium" /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">tertiary / large</div>
        <div class="sr-card__demo"><da-button label="취소" variant="tertiary" /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">primary / disabled</div>
        <div class="sr-card__demo"><da-button label="확인" disabled /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">tertiary / disabled</div>
        <div class="sr-card__demo"><da-button label="취소" variant="tertiary" disabled /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">trailingIcon</div>
        <div class="sr-card__demo"><da-button label="다음" trailing-icon="chevron-right" /></div>
      </div>
    </div>

    <!-- DaTab / DaTabGroup -->
    <h3 class="sr-sub">DaTabGroup (+ DaTab)</h3>
    <div class="sr-card sr-card--block">
      <div class="sr-card__label">v-model selectedIndex = {{ tabIndex }}</div>
      <da-tab-group :tabs="tabs" v-model="tabIndex" />
    </div>

    <!-- DaActionArea -->
    <h3 class="sr-sub">DaActionArea</h3>
    <div class="sr-grid">
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">strong / primary</div>
        <da-action-area label="장바구니 담기" />
      </div>
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">disabled</div>
        <da-action-area label="장바구니 담기" disabled />
      </div>
    </div>

    <!-- DaPopover -->
    <h3 class="sr-sub">DaPopover</h3>
    <div class="sr-grid">
      <div class="sr-card sr-card--grouped">
        <div class="sr-card__label">position=bottom</div>
        <div class="sr-card__demo"><da-popover position="bottom">최대 2,800P</da-popover></div>
      </div>
      <div class="sr-card sr-card--grouped">
        <div class="sr-card__label">position=left</div>
        <div class="sr-card__demo"><da-popover position="left">안내 메시지</da-popover></div>
      </div>
    </div>

    <!-- DaDivider -->
    <h3 class="sr-sub">DaDivider</h3>
    <div class="sr-card sr-card--block">
      <div class="sr-card__label">normal</div>
      <da-divider variant="normal" />
      <div class="sr-card__label" style="margin-top:12px">thick</div>
      <da-divider variant="thick" />
    </div>

    <!-- DaButtonChip -->
    <h3 class="sr-sub">DaButtonChip</h3>
    <div class="sr-grid">
      <div class="sr-card">
        <div class="sr-card__label">default</div>
        <div class="sr-card__demo"><da-button-chip label="필터" /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">icon</div>
        <div class="sr-card__demo"><da-button-chip label="이어서 작성" icon /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">disabled</div>
        <div class="sr-card__demo"><da-button-chip label="필터" disabled /></div>
      </div>
    </div>

    <!-- DaChip -->
    <h3 class="sr-sub">DaChip · 4-state</h3>
    <div class="sr-grid">
      <div class="sr-card">
        <div class="sr-card__label">default</div>
        <div class="sr-card__demo"><da-chip label="전체" /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">selected</div>
        <div class="sr-card__demo"><da-chip label="전체" selected /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">disabled</div>
        <div class="sr-card__demo"><da-chip label="전체" disabled /></div>
      </div>
      <div class="sr-card">
        <div class="sr-card__label">selected + disabled</div>
        <div class="sr-card__demo"><da-chip label="전체" selected disabled /></div>
      </div>
    </div>

    <!-- DaChipsFilter -->
    <h3 class="sr-sub">DaChipsFilter (v-model)</h3>
    <div class="sr-grid">
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">single-select · selected = {{ singleSel }}</div>
        <da-chips-filter :chips="filterChips" v-model="singleSel" />
      </div>
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">multiple-select · selected = {{ multiSel }}</div>
        <da-chips-filter :chips="filterChips" multiple v-model="multiSel" />
      </div>
    </div>

    <!-- DaTextInput -->
    <h3 class="sr-sub">DaTextInput (v-model)</h3>
    <div class="sr-grid">
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">default · counter · value = "{{ textVal }}"</div>
        <da-text-input v-model="textVal" placeholder="리뷰를 작성해 주세요" :max-length="100" />
      </div>
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">error</div>
        <da-text-input default-value="필수 항목입니다" error="내용을 확인해 주세요" />
      </div>
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">disabled</div>
        <da-text-input default-value="수정 불가" disabled />
      </div>
    </div>

    <!-- DaDropdown -->
    <h3 class="sr-sub">DaDropdown (v-model)</h3>
    <div class="sr-grid">
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">기본 · value = "{{ sortVal }}"</div>
        <da-dropdown :options="sortOptions" v-model="sortVal" placeholder="정렬" />
      </div>
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">이미지 옵션 · value = "{{ imgVal }}"</div>
        <da-dropdown :options="imgOptions" v-model="imgVal" placeholder="상품 선택" />
      </div>
      <div class="sr-card sr-card--block">
        <div class="sr-card__label">disabled</div>
        <da-dropdown :options="sortOptions" disabled placeholder="정렬" />
      </div>
    </div>

    <!-- DaAccordion / DaAccordionBulletList -->
    <h3 class="sr-sub">DaAccordion (+ DaAccordionBulletList)</h3>
    <div class="sr-card sr-card--block">
      <div class="sr-card__label">v-model expanded = {{ accExpanded }}</div>
      <da-accordion title="리뷰 작성 안내" v-model="accExpanded">
        <da-accordion-bullet-list :items="bullets" />
      </da-accordion>
      <da-accordion title="비활성 항목" disabled :default-expanded="false">
        <p>disabled accordion</p>
      </da-accordion>
    </div>
  </section>
</template>

<script>
// §2 DS/ui — 14종. v-model 컴포넌트는 실제 양방향 바인딩으로 동작까지 QA.
export default {
  name: 'UiSection',
  data() {
    return {
      iconNames: ['blank', 'star', 'chevron-down', 'chevron-up', 'chevron-right', 'tooltip', 'video', 'camera', 'store', 'arrow-left', 'write', 'profile', 'delivery'],
      tabs: [
        { label: '전체' },
        { label: '식품', count: 12 },
        { label: '생활', count: 3 },
        { label: '완료', disabled: true },
      ],
      tabIndex: 0,
      filterChips: [{ label: '전체' }, { label: '배송' }, { label: '매장' }, { label: '리뷰', disabled: true }],
      singleSel: [0],
      multiSel: [0, 2],
      textVal: '',
      sortOptions: [
        { value: 'recent', label: '최신순' },
        { value: 'popular', label: '인기순' },
        { value: 'low', label: '낮은 가격순', disabled: true },
      ],
      sortVal: '',
      imgOptions: [
        { value: 'a', label: '다이소 수납 박스', image: SWATCH('c5c8ce') },
        { value: 'b', label: '주방 정리 트레이', image: SWATCH('a7c4e0') },
        { value: 'c', label: '욕실 디스펜서', image: SWATCH('e0c4a7') },
      ],
      imgVal: '',
      accExpanded: true,
      bullets: [
        '구매한 상품에 대한 솔직한 리뷰를 작성해 주세요.',
        '욕설·비방·광고성 내용은 노출이 제한될 수 있습니다.',
        '작성한 리뷰는 마이페이지에서 수정/삭제할 수 있습니다.',
      ],
    }
  },
}

// 오프라인 안전 placeholder 이미지(단색 SVG data URI)
function SWATCH(hex) {
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect width='48' height='48' fill='%23${hex}'/></svg>`
}
</script>
