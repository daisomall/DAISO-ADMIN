import Vue from 'vue'

// 토큰(dds-tokens.css)을 컴포넌트보다 먼저 로드해야 var(--dds-*) 가 해석된다.
import '@ds/styles/dds-tokens.css'
import './showroom.css'

// barrel 의 install() 로 전역 등록(통합 등록 경로 검증 겸함).
import DaisoDesignSystem from '@ds/index.js'
import Showroom from './Showroom.vue'

Vue.use(DaisoDesignSystem)

new Vue({ render: (h) => h(Showroom) }).$mount('#app')
