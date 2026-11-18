import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogArticles } from '../utils/blogData';
import { TLink } from './ui/TLink';
import NotFound from './NotFound';
import { cssVars } from '../utils/css';
import './Article.css';
import './Blog.css'; // общи стилове (back-link)

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);

  // Мета данните и JSON-LD схемата за статията идват от src/seo.ts
  if (!article) return <NotFound />;

  return (
    <article className="article">
      <header className="phero on-dark article__hero">
        <div className="wrap article__wrap">
          <TLink to="/blog" className="back-link">
            <ArrowLeft aria-hidden="true" />
            Назад към Блога
          </TLink>
          <span className="kicker article__cat">{article.category}</span>
          <h1 className="phero__title article__title">{article.title}</h1>
          <div className="phero__meta">
            <span>{article.date}</span>
            <span aria-hidden="true">•</span>
            <span>{article.readTime} четене</span>
          </div>
        </div>
      </header>

      <div className="sheet sheet--page article__sheet">
        <div className="article__wrap">
          <div className="article__image" style={cssVars({ viewTransitionName: `post-${article.slug}` })}>
            <img
              src={`${import.meta.env.BASE_URL}assets/blog/${article.image}`}
              alt={article.title}
              width="1024"
              height="1024"
              decoding="async"
            />
          </div>

          <div
            className="article__body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="article__cta on-dark reveal">
            <h3>Готови ли сте да промените бизнеса си?</h3>
            <p>Нека заедно изградим вашето дигитално присъствие с модерни технологии и печеливша стратегия.</p>
            <TLink to="/#contact" className="btn btn--accent">
              Безплатна Консултация
              <ArrowRight aria-hidden="true" />
            </TLink>
          </div>

          <footer className="article__nav">
            <TLink to="/blog" className="back-link">
              Всички статии
            </TLink>
            <TLink to="/#home" className="back-link">
              Към Начало
            </TLink>
          </footer>
        </div>
      </div>
    </article>
  );
};

export default Article;
