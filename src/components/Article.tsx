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
    }
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
