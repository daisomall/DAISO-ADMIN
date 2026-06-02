<template>
  <section class="sr-section">
    <h2 class="sr-section__title">§1 Foundation token</h2>
    <p class="sr-section__desc">dds-tokens.css 의 var(--dds-*) 직접 참조 — 토큰 선행 로드 검증 겸함.</p>

    <!-- Color · palette -->
    <h3 class="sr-sub">Color · palette</h3>
    <div class="sr-swatches">
      <div v-for="c in palette" :key="c" class="sr-swatch">
        <div
          class="sr-swatch__chip"
          :data-cssvar="`--dds-color-palette-${c}`"
          :style="{ background: `var(--dds-color-palette-${c})` }"
        />
        <div class="sr-swatch__meta">
          <div class="sr-swatch__name">{{ c }}</div>
          <div class="sr-swatch__val">{{ resolved[`--dds-color-palette-${c}`] || '—' }}</div>
        </div>
      </div>
    </div>

    <!-- Color · semantic -->
    <h3 class="sr-sub">Color · semantic</h3>
    <div class="sr-swatches">
      <div v-for="c in semantic" :key="c" class="sr-swatch">
        <div
          class="sr-swatch__chip"
          :data-cssvar="`--dds-color-${c}`"
          :style="{ background: `var(--dds-color-${c})` }"
        />
        <div class="sr-swatch__meta">
          <div class="sr-swatch__name">{{ c }}</div>
          <div class="sr-swatch__val">{{ resolved[`--dds-color-${c}`] || '—' }}</div>
        </div>
      </div>
    </div>

    <!-- Typography -->
    <h3 class="sr-sub">Typography</h3>
    <div class="sr-grid">
      <div v-for="t in typography" :key="t" class="sr-card sr-card--block">
        <div class="sr-card__label">{{ t }}</div>
        <div :style="typoStyle(t)">다이소 DDS Foundation · Aa 0123</div>
      </div>
    </div>

    <!-- Spacing -->
    <h3 class="sr-sub">Spacing scale</h3>
    <div class="sr-card sr-card--block">
      <div v-for="n in spacing" :key="n" class="sr-spacing__row">
        <span class="sr-spacing__label">spacing-{{ n }} ({{ n }}px)</span>
        <span class="sr-spacing__bar" :style="{ width: `var(--dds-spacing-${n})` }" />
      </div>
    </div>

    <!-- Radius -->
    <h3 class="sr-sub">Radius</h3>
    <div class="sr-radius">
      <div v-for="r in radius" :key="r">
        <div class="sr-radius__box" :style="{ borderRadius: `var(--dds-radius-${r})` }" />
        <div class="sr-radius__label">radius-{{ r }}</div>
      </div>
    </div>

    <!-- Font weight -->
    <h3 class="sr-sub">Font weight</h3>
    <div class="sr-grid">
      <div v-for="w in weights" :key="w" class="sr-card">
        <div class="sr-card__label">weight-{{ w }}</div>
        <div :style="{ fontWeight: `var(--dds-font-weight-${w})`, fontSize: '18px' }">
          다이소 DDS Aa
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// §1 Foundation — 토큰 그룹 전수 시각화. 색상은 mounted 시 getComputedStyle 로 실제 값 해석.
export default {
  name: 'FoundationSection',
  data() {
    return {
      palette: [
        'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-700', 'gray-800',
        'brand-red', 'brand-white',
      ],
      semantic: [
        'text-primary', 'text-secondary', 'text-disable', 'text-placeholder', 'text-white',
        'bg-base-white', 'bg-base-black', 'bg-grouped', 'bg-elevated', 'bg-disabled',
        'stroke-basic1', 'stroke-basic2',
        'dim-black-thick', 'dim-black-basic', 'dim-black-thin', 'dim-black-subtle',
      ],
      typography: [
        'display-1', 'display-2',
        'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6',
        'body-1', 'body-2', 'body-3', 'body-4', 'body-5', 'body-6', 'body-7',
        'caption-1', 'caption-2', 'caption-3',
      ],
      spacing: [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 64, 72],
      radius: ['small', 'medium', 'large', 'pill'],
      weights: ['regular', 'medium', 'bold', 'extrabold'],
      resolved: {},
    }
  },
  mounted() {
    this.$nextTick(() => {
      const map = {}
      this.$el.querySelectorAll('[data-cssvar]').forEach((el) => {
        map[el.getAttribute('data-cssvar')] = getComputedStyle(el).backgroundColor
      })
      this.resolved = map
    })
  },
  methods: {
    typoStyle(t) {
      return {
        fontFamily: `var(--dds-font-${t}-family)`,
        fontSize: `var(--dds-font-${t}-size)`,
        lineHeight: `var(--dds-font-${t}-line)`,
        letterSpacing: `var(--dds-font-${t}-letter)`,
        fontWeight: `var(--dds-font-weight-medium)`,
      }
    },
  },
}
</script>
