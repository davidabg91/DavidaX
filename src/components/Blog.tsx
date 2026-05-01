import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogArticles } from '../utils/blogData';
import './Blog.css';

const Blog: React.FC = () => {
  useEffect(() => {
    window.lenisInstance?.scrollTo(0, { immediate: true });
  }, []);

  return (
    <section className="blog-container">
      <div className="blog-header fade-in">
        <span className="blog-subtitle">Познание и Иновации</span>
        <h1 className="section-title">Нашият <span className="gradient-text">Блог</span></h1>
      </div>

      <div className="blog-grid">
        {blogArticles.map((article, index) => (
          <article 
            key={article.slug} 
            className="blog-card glass fade-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="blog-card-image">
              <img src={`${import.meta.env.BASE_URL}assets/blog/${article.image}`} alt={article.title} loading="lazy" />
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span className="blog-card-category">{article.category}</span>
                <span>{article.date} • {article.readTime}</span>
              </div>
              <h2 className="blog-card-title">{article.title}</h2>
              <p className="blog-card-excerpt">{article.excerpt}</p>
              <Link to={`/blog/${article.slug}`} className="blog-card-link">
                Прочети повече
                <svg viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
