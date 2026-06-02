<template>
  <div class="da-tab-group" role="tablist">
    <da-tab
      v-for="(tab, i) in tabs"
      :key="i"
      class="da-tab-group__item"
      :label="tab.label"
      :count="tab.count"
      :disabled="tab.disabled"
      :selected="i === currentIndex"
      @click="handleSelect(i)"
    />
  </div>
</template>

<script>
// DaTabGroup — DDS 다중 탭 컨테이너
// selected state 자동 관리. controlled(selectedIndex) / uncontrolled(defaultSelectedIndex) 모두 지원.
// v-model: model { prop: 'selectedIndex', event: 'change' } — emits change(index)
import DaTab from '../DaTab/DaTab.vue'

export default {
  name: 'DaTabGroup',
  components: { DaTab },
  model: { prop: 'selectedIndex', event: 'change' },
  props: {
    // { label, count?, disabled? }[]
    tabs:                 { type: Array, required: true },
    // controlled. 미지정(undefined) 이면 uncontrolled.
    selectedIndex:        { type: Number, default: undefined },
    // uncontrolled 초기 선택 인덱스.
    defaultSelectedIndex: { type: Number, default: 0 },
  },
  data() {
    return { internalIndex: this.defaultSelectedIndex }
  },
  computed: {
    isControlled() { return this.selectedIndex !== undefined },
    currentIndex() { return this.isControlled ? this.selectedIndex : this.internalIndex },
  },
  methods: {
    handleSelect(index) {
      if (!this.isControlled) this.internalIndex = index
      this.$emit('change', index)
    },
  },
}
</script>

<style scoped lang="scss">
.da-tab-group {
  display: flex;
  width: 100%;
  height: var(--dds-spacing-48);
  background-color: var(--dds-color-bg-base-white);

  // 각 탭이 동일 폭을 차지 (React: 자식 Tab 에 flex-1).
  // Vue2 는 자식 컴포넌트 root 에 부모 scopeId 도 적용되므로 scoped 로 매칭된다.
  &__item { flex: 1; }
}
</style>
