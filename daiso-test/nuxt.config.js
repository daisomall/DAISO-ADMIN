// daiso-test — Nuxt2 설정
// @daiso/design-system 을 import 해 Da* 컴포넌트를 조립·검증한다 (개발자 전달용 프로토타입).
//
// 주의:
//   → 토큰 CSS 는 package "exports" 에 정의된 서브패스(@daiso/design-system/styles/dds-tokens.css)로 참조.
//     (Node 리졸버가 exports 를 강제하므로 실제 경로 ./src/... 직접 참조는 차단된다.)
//   → design-system 의 .vue SFC(scoped scss)는 build.transpile 로 vue-loader 처리.
export default {
  // 모바일 프론트엔드 — SSR 기본
  ssr: true,

  head: {
    title: 'daiso-test',
    htmlAttrs: { lang: 'ko' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },

  // 토큰 → 베이스 리셋(box-sizing/margin) → host 폰트(@font-face). 전역 주입.
  css: [
    '@daiso/design-system/styles/dds-tokens.css',
    '@/assets/css/reset.css',
    '@/assets/css/fonts.css',
  ],

  // DDS 전역 등록 (Vue.use(barrel install()))
  plugins: [
    '@/plugins/design-system.js',
  ],

  build: {
    // node_modules 의 @daiso/design-system .vue SFC 를 webpack 이 컴파일하도록 transpile.
    transpile: ['@daiso/design-system'],
  },
}
