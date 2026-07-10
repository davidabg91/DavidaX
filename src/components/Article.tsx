import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogArticles } from '../utils/blogData';
import { HashLink } from 'react-router-hash-link';
import './Article.css';
import './Blog.css'; // For common styles like back-btn

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = blogArticles.find(a => a.slug === slug);

  useEffect(() => {
    window.lenisInstance?.scrollTo(0, { immediate: true });
    if (!article) {
      navigate('/blog');
      return;
    }

    // Save original tags to restore on unmount
    const originalTitle = document.title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const originalOgTitle = ogTitle ? ogTitle.getAttribute('content') : '';

    const ogDesc = document.querySelector('meta[property="og:description"]');
    const originalOgDesc = ogDesc ? ogDesc.getAttribute('content') : '';

    const ogImage = document.querySelector('meta[property="og:image"]');
    const originalOgImage = ogImage ? ogImage.getAttribute('content') : '';

    const ogSecureImage = document.querySelector('meta[property="og:image:secure_url"]');
    const originalOgSecureImage = ogSecureImage ? ogSecureImage.getAttribute('content') : '';

    const canonical = document.querySelector('link[rel="canonical"]');
    const originalCanonical = canonical ? canonical.getAttribute('href') : '';

    // Set new values
    document.title = `${article.title} | DavidaX`;
    if (metaDesc) metaDesc.setAttribute('content', article.excerpt);
    if (ogTitle) ogTitle.setAttribute('content', article.title);
    if (ogDesc) ogDesc.setAttribute('content', article.excerpt);
    
    const absoluteImageUrl = `https://davidax.org/assets/blog/${article.image}`;
    if (ogImage) ogImage.setAttribute('content', absoluteImageUrl);
    if (ogSecureImage) ogSecureImage.setAttribute('content', absoluteImageUrl);
    
    const absoluteArticleUrl = `https://davidax.org/blog/${article.slug}`;
    if (canonical) canonical.setAttribute('href', absoluteArticleUrl);

    // Inject BlogPosting JSON-LD Schema
    const scriptId = 'dynamic-article-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "datePublished": "2026-05-02",
      "image": absoluteImageUrl,
      "author": {
        "@type": "Organization",
        "name": "DavidaX",
        "url": "https://davidax.org"
      },
      "publisher": {
        "@type": "Organization",
        "name": "DavidaX",
        "logo": {
          "@type": "ImageObject",
          "url": "https://davidax.org/logo.jpg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": absoluteArticleUrl
      }
    };
    
    script.textContent = JSON.stringify(schema);

    return () => {
      // Restore original tags
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      if (ogTitle && originalOgTitle) ogTitle.setAttribute('content', originalOgTitle);
      if (ogDesc && originalOgDesc) ogDesc.setAttribute('content', originalOgDesc);
      if (ogImage && originalOgImage) ogImage.setAttribute('content', originalOgImage);
      if (ogSecureImage && originalOgSecureImage) ogSecureImage.setAttribute('content', originalOgSecureImage);
      if (canonical && originalCanonical) canonical.setAttribute('href', originalCanonical);

      // Remove dynamic schema script
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [article, navigate]);

  if (!article) return null;

  return (
    <article className="article-container fade-in">
      <Link to="/blog" className="blog-back-btn">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Назад към Блога
      </Link>

      <header className="article-hero">
        <span className="article-category">{article.category}</span>
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime} четене</span>
        </div>
      </header>

      <div className="article-main-image">
        <img src={`${import.meta.env.BASE_URL}assets/blog/${article.image}`} alt={article.title} />
      </div>

      <div 
        className="article-body" 
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <div className="article-cta glass">
        <h3>Готови ли сте да промените бизнеса си?</h3>
        <p>Нека заедно изградим вашето дигитално присъствие с модерни технологии и печеливша стратегия.</p>
        <HashLink to="/#contact" className="nav-btn" scroll={(el) => window.lenisInstance?.scrollTo(el)}>
          Безплатна Консултация
        </HashLink>
      </div>

      <footer className="article-footer-nav">
        <Link to="/blog" className="blog-back-btn">
          Всички статии
        </Link>
        <HashLink to="/#home" className="blog-back-btn" scroll={(el) => window.lenisInstance?.scrollTo(el)}>
          Към Начало
        </HashLink>
      </footer>
    </article>
  );
};

export default Article;
