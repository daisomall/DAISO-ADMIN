<template>
  <div class="da-text-input">
    <!-- Text Field box — Figma 고정 height 120px = scale-72 + scale-48 합성(DDS 토큰만). -->
    <div
      :class="['da-text-input__box',
               { 'da-text-input__box--error': isError,
                 'da-text-input__box--disabled': disabled }]"
    >
      <textarea
        :id="id"
        :name="name"
        class="da-text-input__field"
        :class="{ 'da-text-input__field--disabled': disabled }"
        :placeholder="placeholder"
        :value="currentValue"
        :maxlength="maxLength"
        :rows="rows"
        :disabled="disabled"
        @input="handleInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <div v-if="showCounter" class="da-text-input__counter">
        <span
          class="da-text-input__count"
          :class="{ 'da-text-input__count--disabled': disabled }"
        >{{ currentLength }}</span><span class="da-text-input__max">/{{ maxLength }}</span>
      </div>
    </div>
    <p v-if="isError" class="da-text-input__error">{{ error }}</p>
  </div>
</template>

<script>
// DaTextInput — DDS 멀티라인 입력(textarea)
// Figma 4-state(Default/Focus/Filled/Error)는 상태+props 로 자연 파생:
//   focus → :focus-within 로 border 전환 / filled → value 렌더 / error → error prop(string) 존재 시 / default → 그 외.
// controlled(value) / uncontrolled(defaultValue) 모두 지원.
// v-model: model { prop: 'value', event: 'input' } — emits input(string), focus(FocusEvent), blur(FocusEvent)
// 고정 height 120px = calc(spacing-72 + spacing-48) (DDS scale 외 값 → 토큰 합성, ReviewCard 52·Profile 54 와 동일 규칙).
export default {
  name: 'DaTextInput',
  model: { prop: 'value', event: 'input' },
  props: {
    placeholder:  { type: String, default: '' },
    // controlled. 미지정(undefined) 이면 uncontrolled.
    value:        { type: String, default: undefined },
    // uncontrolled 초기값.
    defaultValue: { type: String, default: '' },
    maxLength:    { type: Number, default: 1000 },
    showCounter:  { type: Boolean, default: true },
    rows:         { type: Number, default: 4 },
    // 에러 메시지. presence 가 error state 결정.
    error:        { type: String, default: '' },
    disabled:     { type: Boolean, default: false },
    name:         { type: String, default: undefined },
    id:           { type: String, default: undefined },
  },
  data() {
    return { internalValue: this.defaultValue }
  },
  computed: {
    isControlled() { return this.value !== undefined },
    currentValue() { return this.isControlled ? this.value : this.internalValue },
    currentLength() { return this.currentValue.length },
    isError() { return Boolean(this.error) },
  },
  methods: {
    handleInput(e) {
      const v = e.target.value
      if (!this.isControlled) this.internalValue = v
      this.$emit('input', v)
    },
  },
}
</script>

<style scoped lang="scss">
.da-text-input {
  width: 100%;

  &__box {
    display: flex;
    flex-direction: column;
    gap: var(--dds-spacing-8);
    padding: var(--dds-spacing-12);
    border-radius: var(--dds-radius-small);
    border: 1px solid var(--dds-color-stroke-basic2);
    background-color: var(--dds-color-bg-base-white);
    height: calc(var(--dds-spacing-72) + var(--dds-spacing-48));

    &--error    { border-color: var(--dds-color-palette-brand-red); }
    &--disabled { background-color: var(--dds-color-bg-disabled); }
  }

  // focus 전환은 error/disabled 가 아닐 때만 (error 의 red border 보존).
  &__box:not(&__box--error):not(&__box--disabled):focus-within {
    border-color: var(--dds-color-palette-gray-800);
  }

  &__field {
    width: 100%;
    flex: 1;
    min-height: 0;
    resize: none;
    border: 0;
    background-color: transparent;
    padding-left: var(--dds-spacing-4);
    padding-right: var(--dds-spacing-4);
    outline: none;
    font-family: var(--dds-font-body-5-family);
    font-size: var(--dds-font-body-5-size);
    line-height: var(--dds-font-body-5-line);
    letter-spacing: var(--dds-font-body-5-letter);
    font-weight: var(--dds-font-weight-regular);
    color: var(--dds-color-text-primary);

    &::placeholder { color: var(--dds-color-text-placeholder); }

    &--disabled {
      color: var(--dds-color-text-disable);
      cursor: not-allowed;
      &::placeholder { color: var(--dds-color-text-disable); }
    }
  }

  &__counter {
    align-self: flex-end;
    padding-left: var(--dds-spacing-4);
    padding-right: var(--dds-spacing-4);
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
    font-weight: var(--dds-font-weight-regular);
  }

  &__count {
    color: var(--dds-color-text-primary);
    &--disabled { color: var(--dds-color-text-disable); }
  }

  &__max { color: var(--dds-color-text-placeholder); }

  &__error {
    padding-left: var(--dds-spacing-16);
    padding-top: var(--dds-spacing-8);
    font-family: var(--dds-font-caption-1-family);
    font-size: var(--dds-font-caption-1-size);
    line-height: var(--dds-font-caption-1-line);
    letter-spacing: var(--dds-font-caption-1-letter);
    font-weight: var(--dds-font-weight-regular);
    color: var(--dds-color-palette-brand-red);
  }
}
</style>
