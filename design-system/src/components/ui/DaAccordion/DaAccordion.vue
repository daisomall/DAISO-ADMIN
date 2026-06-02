<template>
  <div class="da-accordion">
    <button
      type="button"
      class="da-accordion__header"
      :class="{ 'da-accordion__header--disabled': disabled }"
      :aria-expanded="String(isOpen)"
      :aria-controls="panelId"
      :aria-disabled="disabled ? 'true' : null"
      :disabled="disabled"
      @click="handleToggle"
    >
      <span class="da-accordion__title">{{ title }}</span>
      <da-icon :name="isOpen ? 'chevron-up' : 'chevron-down'" :size="20" />
    </button>
    <div
      v-if="isOpen"
      :id="panelId"
      class="da-accordion__panel"
      role="region"
    >
      <slot />
    </div>
  </div>
</template>

<script>
// DaAccordion — DDS 확장 패널
// 2 state: collapsed(title + chevron-down) / expanded(+ detail panel bg-grouped).
// controlled(expanded) / uncontrolled(defaultExpanded) 모두 지원. children → default slot.
// v-model: model { prop: 'expanded', event: 'change' } — emits change(expanded:boolean)
// title 타이포: heading-5(SUITE 16/22/-1) bold. body: body-7 regular(slot 소비자 책임).
import DaIcon from '../DaIcon/DaIcon.vue'

export default {
  name: 'DaAccordion',
  components: { DaIcon },
  model: { prop: 'expanded', event: 'change' },
  props: {
    title:           { type: String, required: true },
    // controlled. 미지정(undefined) 이면 uncontrolled.
    expanded:        { type: Boolean, default: undefined },
    // uncontrolled 초기 expand 상태.
    defaultExpanded: { type: Boolean, default: false },
    disabled:        { type: Boolean, default: false },
  },
  data() {
    return { internal: this.defaultExpanded }
  },
  computed: {
    isControlled() { return this.expanded !== undefined },
    isOpen() { return this.isControlled ? this.expanded : this.internal },
    // button ↔ panel a11y 연결용 고유 id (React useId 대체).
    panelId() { return `da-accordion-panel-${this._uid}` },
  },
  methods: {
    handleToggle() {
      if (this.disabled) return
      const next = !this.isOpen
      if (!this.isControlled) this.internal = next
      this.$emit('change', next)
    },
  },
}
</script>

<style scoped lang="scss">
.da-accordion {
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: var(--dds-color-bg-base-white);

  &__header {
    display: flex;
    width: 100%;
    align-items: center;
    gap: var(--dds-spacing-12);
    padding-left: var(--dds-spacing-20);
    padding-right: var(--dds-spacing-20);
    padding-top: var(--dds-spacing-12);
    padding-bottom: var(--dds-spacing-12);
    background-color: transparent;
    border: 0;
    cursor: pointer;
    color: var(--dds-color-text-primary); // title + chevron(currentColor) 공통 색
    transition: background-color .15s, color .15s;

    &--disabled { cursor: not-allowed; color: var(--dds-color-text-disable); }
  }

  &__title {
    flex: 1;
    text-align: left;
    font-family: var(--dds-font-heading-5-family); // SUITE (React font-display)
    font-size: var(--dds-font-heading-5-size);
    line-height: var(--dds-font-heading-5-line);
    letter-spacing: var(--dds-font-heading-5-letter);
    font-weight: var(--dds-font-weight-bold);
    color: inherit;
  }

  &__panel {
    background-color: var(--dds-color-bg-grouped);
    padding-left: var(--dds-spacing-20);
    padding-right: var(--dds-spacing-20);
    padding-top: var(--dds-spacing-20);
    padding-bottom: var(--dds-spacing-24);
  }
}
</style>
