import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'bgl-v-owl-carousel/raw': path.resolve(__dirname, '../../src'),
			'bgl-v-owl-carousel/raw/components': path.resolve(__dirname, '../../src/components'),
		},
	},
})
