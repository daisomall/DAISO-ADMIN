<template>
  <div>
    <nav class="sr-toc">
      <span class="sr-toc__brand">DDS · SHOWROOM</span>
      <a href="#foundation">Foundation</a>
      <a href="#ui">UI · 14</a>
      <a href="#layout">Layout · 1</a>
      <a href="#module">Module · 6</a>
    </nav>

    <main class="sr-page">
      <foundation-section id="foundation" />
      <ui-section id="ui" />
      <layout-section id="layout" />
      <module-section id="module" />
    </main>
  </div>
</template>

<script>
// DDS Showroom — Foundation 토큰 + Da* 컴포넌트 전수 시각 검증(dev 전용).
import FoundationSection from './sections/FoundationSection.vue'
import UiSection from './sections/UiSection.vue'
import LayoutSection from './sections/LayoutSection.vue'
import ModuleSection from './sections/ModuleSection.vue'

export default {
  name: 'DdsShowroom',
  components: { FoundationSection, UiSection, LayoutSection, ModuleSection },
}
</script>
