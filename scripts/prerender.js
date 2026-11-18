/* ==========================================================================
   Генерира статичен HTML за всяка страница след `vite build`.
   - съдържанието е в HTML-а още преди да се зареди JavaScript (SEO, AI роботи,
     социални мрежи, по-бързо първо изрисуване)
   - всяка страница получава собствени title / description / canonical / OG
   - 404.html се връща с истински статус 404 от хостинга
   ========================================================================== */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(root, 'dist');
const SSR_ENTRY = path.join(root, 'dist-ssr', 'entry-server.js');
const SITEMAP = path.join(root, 'public', 'sitemap.xml');

const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Сменя content/href на точно един таг; спира build-а, ако тагът липсва. */
function setAttr(html, tagPattern, attr, value) {
  const re = new RegExp(`(<${tagPattern}[^>]*\\s${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: липсва таг ${tagPattern} в index.html`);
  return html.replace(re, (_, a, b) => a + escAttr(value) + b);
}

function applyHead(html, head, schemaId) {
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escText(head.title)}</title>`);
  html = setAttr(html, 'meta name="description"', 'content', head.description);
  html = setAttr(html, 'link rel="canonical"', 'href', head.canonical);
  html = setAttr(html, 'meta property="og:url"', 'content', head.canonical);
  html = setAttr(html, 'meta property="og:title"', 'content', head.ogTitle);
  html = setAttr(html, 'meta property="og:description"', 'content', head.ogDescription);
  html = setAttr(html, 'meta property="og:image"', 'content', head.ogImage);
  html = setAttr(html, 'meta property="og:image:secure_url"', 'content', head.ogImage);
  html = setAttr(html, 'meta property="og:image:type"', 'content', head.ogImageType);
  html = setAttr(html, 'meta name="twitter:url"', 'content', head.canonical);
  html = setAttr(html, 'meta name="twitter:title"', 'content', head.twitterTitle);
  html = setAttr(html, 'meta name="twitter:description"', 'content', head.twitterDescription);
  html = setAttr(html, 'meta name="twitter:image"', 'content', head.ogImage);

  let extra = '';
  if (head.noindex) extra += '    <meta name="robots" content="noindex" />\n';
  if (head.jsonLd) {
    const json = JSON.stringify(head.jsonLd).replace(/</g, '\\u003c');
    extra += `    <script type="application/ld+json" id="${schemaId}">${json}</script>\n`;
  }
  return extra ? html.replace('</head>', `${extra}  </head>`) : html;
}

async function main() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath) || !fs.existsSync(SSR_ENTRY)) {
    throw new Error('prerender: липсва dist/index.html или dist-ssr/entry-server.js — пуснете целия build.');
  }
  const template = fs.readFileSync(templatePath, 'utf-8');
  const ROOT_TAG = '<div id="root"></div>';
  if (!template.includes(ROOT_TAG)) throw new Error('prerender: не намирам <div id="root"></div> в dist/index.html');

  const { render, routes, ARTICLE_SCHEMA_ID } = await import(pathToFileURL(SSR_ENTRY).href);

  const pages = [...routes.map((route) => ({ route, file: route === '/' ? 'index.html' : `${route.slice(1)}/index.html` })),
    { route: '/__not-found__', file: '404.html' }];

  for (const { route, file } of pages) {
    const { html, head, marker } = render(route);
    let out = template.replace(ROOT_TAG, `<div id="root" data-route="${escAttr(marker)}">${html}</div>`);
    out = applyHead(out, head, ARTICLE_SCHEMA_ID);
    const target = path.join(DIST, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, out);
    console.log(`✅ ${file}  (${(out.length / 1024).toFixed(1)} kB)`);
  }

  // Предупреждение, ако sitemap.xml и реалните страници се разминават
  if (fs.existsSync(SITEMAP)) {
    const sitemap = fs.readFileSync(SITEMAP, 'utf-8');
    const inSitemap = new Set([...sitemap.matchAll(/<loc>https:\/\/davidax\.org([^<]*)<\/loc>/g)].map((m) => m[1].replace(/\/+$/, '') || '/'));
    for (const r of routes) if (!inSitemap.has(r)) console.warn(`⚠️  ${r} липсва в public/sitemap.xml`);
    for (const r of inSitemap) if (!routes.includes(r)) console.warn(`⚠️  ${r} е в sitemap.xml, но няма такава страница`);
  }

  fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
  console.log(`✨ Готово: ${pages.length} статични страници.`);
}

main().catch((err) => {
  console.error('❌ Грешка при prerender:', err);
  process.exit(1);
});
