import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { cloudflare } from "@cloudflare/vite-plugin"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		cloudflare()
	],
    server: {
        port: 1234,
    },
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
			'@data': fileURLToPath(new URL('./src/data', import.meta.url))
		},
	},
	build: {
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['vue', 'vue-router'],
					styles: ['src/styles/main.scss']
				},
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.endsWith('.css')) {
						return 'assets/css/[name]-[hash][extname]'
					}
					return 'assets/[name]-[hash][extname]'
				}
			}
		}
	},
	css: {
		devSourcemap: true
	}
})
