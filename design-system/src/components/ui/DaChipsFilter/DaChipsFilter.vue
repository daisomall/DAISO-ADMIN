<template>
  <div class="da-chips-filter" role="group">
    <da-chip
      v-for="(chip, i) in chips"
      :key="i"
      :label="chip.label"
      :disabled="chip.disabled"
      :selected="current.includes(i)"
      @click="handleToggle(i)"
    />
  </div>
</template>

<script>
// DaChipsFilter — DDS 다중 칩 composition
// single(default) / multiple 선택 모드. selected state 자동 관리.
// controlled(selectedIndices) / uncontrolled(defaultSelectedIndices) 모두 지원.
// v-model: model { prop: 'selectedIndices', event: 'change' } — emits change(number[])
// a11y: <div role="group">
import DaChip from '../DaChip/DaChip.vue'

export default {
  name: 'DaChipsFilter',
  components: { DaChip },
  model: { prop: 'selectedIndices', event: 'change' },
  props: {
    // { label, disabled? }[]
    chips:                  { type: Array, required: true },
    // true → 다중 선택, false(default) → 단일 선택(toggle)
    multiple:               { type: Boolean, default: false },
    // uncontrolled 초기 선택 인덱스 배열
    defaultSelectedIndices: { type: Array, default: () => [] },
    // controlled. 미지정(undefined) 이면 uncontrolled.
    selectedIndices:        { type: Array, default: undefined },
  },
  data() {
    return { internal: [...this.defaultSelectedIndices] }
  },
  computed: {
    isControlled() { return this.selectedIndices !== undefined },
    current() { return this.isControlled ? this.selectedIndices : this.internal },
  },
  methods: {
    handleToggle(index) {
      const isCurrentlySelected = this.current.includes(index)
      let next
      if (this.multiple) {
        next = isCurrentlySelected
          ? this.current.filter(i => i !== index)
          : [...this.current, index]
      } else {
        // single mode: 같은 칩이면 해제, 아니면 교체
        next = isCurrentlySelected ? [] : [index]
      }
      if (!this.isControlled) this.internal = next
      this.$emit('change', next)
    },
  },
}
</script>

<style scoped lang="scss">
.da-chips-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--dds-spacing-8);
}
</style>
