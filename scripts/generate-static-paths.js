import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const INDEX_HTML_PATH = path.resolve(DIST_DIR, 'index.html');

async function generateStaticPaths() {
  console.log('🚀 Starting static path generation for SEO...');

  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('❌ Error: dist/index.html not found. Run "npm run build" first.');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  // Create 404.html
  fs.writeFileSync(path.resolve(DIST_DIR, '404.html'), indexHtml);
  console.log('✅ Created dist/404.html');

  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('❌ Error: public/sitemap.xml not found.');
    return;
  }

  const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const urlRegex = /<loc>https:\/\/davidax\.org\/([^<]+)<\/loc>/g;
  let match;
  const paths = [];

  while ((match = urlRegex.exec(sitemap)) !== null) {
    const routePath = match[1];
    if (routePath && routePath !== '/') {
      paths.push(routePath);
    }
  }

  console.log(`Found ${paths.length} additional routes to physicalize.`);

  for (const route of paths) {
    const targetDir = path.resolve(DIST_DIR, route);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(path.resolve(targetDir, 'index.html'), indexHtml);
    console.log(`✅ Created ${route}/index.html`);
  }

  console.log('✨ Static path generation complete!');
}

generateStaticPaths().catch(err => {
  console.error('❌ Error during static path generation:', err);
  process.exit(1);
});
