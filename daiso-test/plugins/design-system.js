// @daiso/design-system 전역 등록 플러그인
// barrel(install())이 모든 Da* 컴포넌트를 Vue.component 로 등록한다 → <da-button> 등 전역 사용.
import Vue from 'vue'
import DaisoDesignSystem from '@daiso/design-system'

Vue.use(DaisoDesignSystem)
