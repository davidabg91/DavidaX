import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Preload на шрифтовете, които се виждат първи (завесата и hero заглавието),
 * за да няма премигване между резервния и истинския шрифт.
 */
function preloadFonts(): Plugin {
  const critical = /(unbounded-(latin|cyrillic)|onest-cyrillic)-wght-normal-[\w-]+\.woff2$/
  return {
    name: 'davidax-preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        return Object.keys(ctx.bundle ?? {})
          .filter((file) => critical.test(file))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${file}`, crossorigin: '' },
            injectTo: 'head-prepend' as const,
          }))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadFonts()],
  base: '/',
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    // Файловете с хеш в името отиват в /static, за да се кешират завинаги (vercel.json);
    // /assets остава за снимките от public/.
    assetsDir: 'static',
  },
})
