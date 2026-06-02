<template>
  <div
    ref="container"
    :class="['da-dropdown', { 'da-dropdown--open': open }]"
  >
    <!-- Trigger -->
    <button
      type="button"
      class="da-dropdown__trigger"
      :class="{ 'da-dropdown__trigger--disabled': disabled }"
      aria-haspopup="listbox"
      :aria-expanded="String(open)"
      :aria-disabled="disabled ? 'true' : null"
      :disabled="disabled"
      @click="handleToggle"
    >
      <span class="da-dropdown__value">
        <span v-if="currentOption && currentOption.image" class="da-dropdown__image">
          <slot name="image" :option="currentOption">
            <img :src="currentOption.image" alt="" class="da-dropdown__img" />
          </slot>
        </span>
        <span class="da-dropdown__label">
          {{ currentOption ? currentOption.label : placeholder }}
        </span>
      </span>
      <da-icon :name="open ? 'chevron-up' : 'chevron-down'" :size="12" />
    </button>

    <!-- Panel -->
    <ul v-if="open" class="da-dropdown__panel" role="listbox">
      <li
        v-for="option in options"
        :key="option.value"
        class="da-dropdown__li"
      >
        <button
          type="button"
          class="da-dropdown__option"
          :class="{ 'da-dropdown__option--disabled': option.disabled }"
          role="option"
          :aria-selected="String(option.value === currentValue)"
          :aria-disabled="option.disabled ? 'true' : null"
          :disabled="option.disabled"
          @click="handleSelect(option)"
        >
          <span class="da-dropdown__value">
            <span v-if="option.image" class="da-dropdown__image">
              <slot name="image" :option="option">
                <img :src="option.image" alt="" class="da-dropdown__img" />
              </slot>
            </span>
            <span class="da-dropdown__label">{{ option.label }}</span>
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// DaDropdown — DDS select
// 2 state 자동 파생(prop 노출 X): closed(stroke-basic2 border) / open(gray-700 border + 옵션 리스트).
// controlled(value) / uncontrolled(defaultValue) 모두 지원. 외부 클릭 시 close(ISSUE-6 패턴: mounted/beforeDestroy 리스너).
// v-model: model { prop: 'value', event: 'change' } — emits change(value:string)
// placeholder/선택값 모두 text-primary (Figma "선택 prompt" 패턴 — TextInput placeholder 색과 다름).
// image: option.image(URL) 또는 scoped slot #image="{ option }" 로 커스텀(Icon 등) 렌더.
import DaIcon from '../DaIcon/DaIcon.vue'

export default {
  name: 'DaDropdown',
  components: { DaIcon },
  model: { prop: 'value', event: 'change' },
  props: {
    // { value, label, image?, disabled? }[]
    options:      { type: Array, required: true },
    // controlled. 미지정(undefined) 이면 uncontrolled.
    value:        { type: String, default: undefined },
    // uncontrolled 초기값.
    defaultValue: { type: String, default: undefined },
    placeholder:  { type: String, default: '선택' },
    disabled:     { type: Boolean, default: false },
  },
  data() {
    return { internal: this.defaultValue, open: false }
  },
  computed: {
    isControlled() { return this.value !== undefined },
    currentValue() { return this.isControlled ? this.value : this.internal },
    currentOption() { return this.options.find(opt => opt.value === this.currentValue) },
  },
  mounted() {
    document.addEventListener('mousedown', this.handleOutside)
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleOutside)
  },
  methods: {
    handleToggle() {
      if (this.disabled) return
      this.open = !this.open
    },
    handleSelect(option) {
      if (option.disabled) return
      if (!this.isControlled) this.internal = option.value
      this.$emit('change', option.value)
      this.open = false
    },
    handleOutside(e) {
      if (!this.open) return
      const el = this.$refs.container
      if (el && !el.contains(e.target)) this.open = false
    },
  },
}
</script>

<style scoped lang="scss">
.da-dropdown {
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: hidden; // overflow-clip
  border-radius: var(--dds-radius-small);
  border: 1px solid var(--dds-color-stroke-basic2);
  background-color: var(--dds-color-bg-base-white);

  &--open { border-color: var(--dds-color-palette-gray-700); }

  &__trigger,
  &__option {
    display: flex;
    width: 100%;
    align-items: center;
    padding-left: var(--dds-spacing-16);
    padding-right: var(--dds-spacing-16);
    padding-top: var(--dds-spacing-10);
    padding-bottom: var(--dds-spacing-10);
    background-color: transparent;
    border: 0;
    cursor: pointer;
    color: var(--dds-color-text-primary); // label + chevron(currentColor) 공통 색
    transition: background-color .15s, color .15s;
  }

  &__trigger {
    gap: var(--dds-spacing-12);
    &--disabled { cursor: not-allowed; color: var(--dds-color-text-disable); }
  }

  &__panel {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__li { display: contents; }

  &__option {
    gap: var(--dds-spacing-16);
    border-top: 1px solid var(--dds-color-stroke-basic2);

    &:hover { background-color: var(--dds-color-palette-gray-200); }

    &--disabled {
      cursor: not-allowed;
      color: var(--dds-color-text-disable);
      background-color: var(--dds-color-bg-disabled);
      &:hover { background-color: var(--dds-color-bg-disabled); } // hover override 차단
    }
  }

  &__value {
    display: flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    gap: var(--dds-spacing-8);
  }

  &__image {
    width: var(--dds-spacing-24);
    height: var(--dds-spacing-24);
    flex-shrink: 0;
    overflow: hidden;
    border-radius: var(--dds-radius-pill);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__label {
    flex: 1;
    min-width: 0;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: var(--dds-font-body-5-family);
    font-size: var(--dds-font-body-5-size);
    line-height: var(--dds-font-body-5-line);
    letter-spacing: var(--dds-font-body-5-letter);
    font-weight: var(--dds-font-weight-regular);
    color: inherit;
  }
}
</style>
