import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// DDS dev harness (showroom) — playground/ 를 root 로 띄우고 ../src 의 실제 Da* SFC 를 import.
// 라이브러리 배포물(files:["src"])에는 포함되지 않는 dev 전용 설정.
export default defineConfig({
  root: 'playground',
  plugins: [vue()],
  resolve: {
    alias: {
      // @ds → design-system/src (barrel·토큰·컴포넌트 import 용)
      '@ds': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5180,
    open: true,
    fs: { allow: ['..'] }, // playground 상위(design-system/src) 서빙 허용
  },
})
