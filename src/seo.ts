/* ==========================================================================
   Мета данни за всяка страница — един източник за:
   - статичния HTML, който се генерира при build (scripts/prerender.js)
   - обновяването на <head> при навигация в браузъра (applyHead)
   ========================================================================== */
import { blogArticles } from './utils/blogData';

export const SITE_URL = 'https://davidax.org';

export interface Head {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageType: string;
  twitterTitle: string;
  twitterDescription: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
  notFound?: boolean;
}

const HOME: Head = {
  title: 'DavidaX | Изработка на Сайтове | Софтуерни Решения',
  description:
    'DavidaX - Премиум студио за софтуерни иновации. Професионална изработка на уеб сайтове, сложни системи, уеб дизайн и ИИ интеграция. Вашият партньор за дигитален успех.',
  canonical: SITE_URL,
  ogTitle: 'DavidaX | Изработка на Сайтове | Софтуерни Решения',
  ogDescription:
    'DavidaX - Премиум студио за софтуерни иновации. Професионална изработка на уеб сайтове, сложни системи и ИИ интеграция.',
  ogImage: `${SITE_URL}/og-innovations.png`,
  ogImageType: 'image/png',
  twitterTitle: 'DavidaX | Софтуерни Иновации',
  twitterDescription: 'Премиум студио за софтуерни иновации. Изграждаме бъдещето чрез чист код.',
};

function page(path: string, title: string, description: string): Head {
  return {
    ...HOME,
    title,
    description,
    canonical: `${SITE_URL}${path}`,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
  };
}

const normalize = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

/** Всички адреси, за които се генерира статичен HTML. */
export const routes: string[] = ['/', '/blog', '/legal', ...blogArticles.map((a) => `/blog/${a.slug}`)];

export function headFor(pathname: string): Head {
  const path = normalize(pathname);

  if (path === '/') return HOME;

  if (path === '/blog') {
    return page(
      '/blog',
      'Блог за Софтуерни Решения и Иновации | DavidaX',
      'Интересни статии, тенденции, цени за изработка на сайтове, софтуерни разработки и ИИ автоматизации от DavidaX.',
    );
  }

  if (path === '/legal') {
    return page(
      '/legal',
      'Правна Информация и Данни за Компанията | DavidaX',
      'Официални данни за ДАВИДА БГ ЕООД, седалище, адреси за контакти и комисии за защита на потребителите.',
    );
  }

  const article = path.startsWith('/blog/') ? blogArticles.find((a) => `/blog/${a.slug}` === path) : undefined;
  if (article) {
    const url = `${SITE_URL}/blog/${article.slug}`;
    const image = `${SITE_URL}/assets/blog/${article.image}`;
    return {
      title: `${article.title} | DavidaX`,
      description: article.excerpt,
      canonical: url,
      ogTitle: article.title,
      ogDescription: article.excerpt,
      ogImage: image,
      ogImageType: 'image/webp',
      twitterTitle: article.title,
      twitterDescription: article.excerpt,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        datePublished: '2026-05-02',
        image,
        author: { '@type': 'Organization', name: 'DavidaX', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'DavidaX',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.jpg` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      },
    };
  }

  return {
    ...HOME,
    title: 'Страницата не е намерена | DavidaX',
    noindex: true,
    notFound: true,
  };
}

/** Маркер на предварително изрисуваната страница (data-route върху #root). */
export function routeMarker(pathname: string) {
  return headFor(pathname).notFound ? '404' : normalize(pathname);
}

export const ARTICLE_SCHEMA_ID = 'dynamic-article-schema';

/** Обновява <head> при навигация в браузъра. */
export function applyHead(head: Head) {
  const set = (selector: string, attr: string, value: string) => {
    document.querySelector(selector)?.setAttribute(attr, value);
  };

  document.title = head.title;
  set('meta[name="description"]', 'content', head.description);
  set('link[rel="canonical"]', 'href', head.canonical);
  set('meta[property="og:url"]', 'content', head.canonical);
  set('meta[property="og:title"]', 'content', head.ogTitle);
  set('meta[property="og:description"]', 'content', head.ogDescription);
  set('meta[property="og:image"]', 'content', head.ogImage);
  set('meta[property="og:image:secure_url"]', 'content', head.ogImage);
  set('meta[property="og:image:type"]', 'content', head.ogImageType);
  set('meta[name="twitter:url"]', 'content', head.canonical);
  set('meta[name="twitter:title"]', 'content', head.twitterTitle);
  set('meta[name="twitter:description"]', 'content', head.twitterDescription);
  set('meta[name="twitter:image"]', 'content', head.ogImage);

  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (head.noindex) {
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex';
  } else {
    robots?.remove();
  }

  let schema = document.getElementById(ARTICLE_SCHEMA_ID) as HTMLScriptElement | null;
  if (head.jsonLd) {
    if (!schema) {
      schema = document.createElement('script');
      schema.id = ARTICLE_SCHEMA_ID;
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(head.jsonLd);
  } else {
    schema?.remove();
  }
}
