// @daiso/design-system — barrel + Vue 2.7 plugin
//
// 사용:
//   // 전역 등록
//   import Vue from 'vue'
//   import DaisoDesignSystem from '@daiso/design-system'
//   import '@daiso/design-system/styles/dds-tokens.css' // 토큰 선행 로드 필수
//   Vue.use(DaisoDesignSystem)
//
//   // 또는 개별 import
//   import { DaButton } from '@daiso/design-system'
//
// 토큰(dds-tokens.css)은 컴포넌트보다 먼저 로드해야 var(--dds-*) 가 해석된다.
import DaIcon from './components/ui/DaIcon/DaIcon.vue'
import DaButton from './components/ui/DaButton/DaButton.vue'
import DaTab from './components/ui/DaTab/DaTab.vue'
import DaTabGroup from './components/ui/DaTabGroup/DaTabGroup.vue'
import DaActionArea from './components/ui/DaActionArea/DaActionArea.vue'
import DaPopover from './components/ui/DaPopover/DaPopover.vue'
import DaDivider from './components/ui/DaDivider/DaDivider.vue'
import DaButtonChip from './components/ui/DaButtonChip/DaButtonChip.vue'
import DaChip from './components/ui/DaChip/DaChip.vue'
import DaChipsFilter from './components/ui/DaChipsFilter/DaChipsFilter.vue'
import DaTextInput from './components/ui/DaTextInput/DaTextInput.vue'
import DaDropdown from './components/ui/DaDropdown/DaDropdown.vue'
import DaAccordion from './components/ui/DaAccordion/DaAccordion.vue'
import DaAccordionBulletList from './components/ui/DaAccordionBulletList/DaAccordionBulletList.vue'
import DaTopNavigation from './components/layout/DaTopNavigation/DaTopNavigation.vue'
import DaDeliveryBadge from './components/module/DaDeliveryBadge/DaDeliveryBadge.vue'
import DaReviewCard from './components/module/DaReviewCard/DaReviewCard.vue'
import DaFlagReview from './components/module/DaFlagReview/DaFlagReview.vue'
import DaOrderSection from './components/module/DaOrderSection/DaOrderSection.vue'
import DaUserRankingHeader from './components/module/DaUserRankingHeader/DaUserRankingHeader.vue'
import DaReviewIncentiveBanner from './components/module/DaReviewIncentiveBanner/DaReviewIncentiveBanner.vue'

const components = {
  DaIcon,
  DaButton,
  DaTab,
  DaTabGroup,
  DaActionArea,
  DaPopover,
  DaDivider,
  DaButtonChip,
  DaChip,
  DaChipsFilter,
  DaTextInput,
  DaDropdown,
  DaAccordion,
  DaAccordionBulletList,
  DaTopNavigation,
  DaDeliveryBadge,
  DaReviewCard,
  DaFlagReview,
  DaOrderSection,
  DaUserRankingHeader,
  DaReviewIncentiveBanner,
}

// kebab-case 전역 태그 등록 (<da-icon>, <da-button>)
function install(Vue) {
  if (install.installed) return
  install.installed = true
  Object.keys(components).forEach((name) => {
    Vue.component(components[name].name, components[name])
  })
}

export default { install }
export { DaIcon, DaButton, DaTab, DaTabGroup, DaActionArea, DaPopover, DaDivider, DaButtonChip, DaChip, DaChipsFilter, DaTextInput, DaDropdown, DaAccordion, DaAccordionBulletList, DaTopNavigation, DaDeliveryBadge, DaReviewCard, DaFlagReview, DaOrderSection, DaUserRankingHeader, DaReviewIncentiveBanner }
