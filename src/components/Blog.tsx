import React from 'react';
import { ArrowRight } from 'lucide-react';
import { blogArticles } from '../utils/blogData';
import { TLink } from './ui/TLink';
import { Words } from './ui/Split';
import { cssVars } from '../utils/css';
import './Blog.css';

const Blog: React.FC = () => {
  return (
    <>
      <header className="phero on-dark">
        <div className="wrap">
          <span className="kicker reveal">Познание и Иновации</span>
          <h1 className="phero__title" data-split>
            <Words>Нашият *Блог*</Words>
          </h1>
        </div>
      </header>

      <section className="sheet sheet--page blog">
        <div className="wrap blog__grid">
          {blogArticles.map((article, index) => (
            <article key={article.slug} className="post reveal" style={cssVars({ '--ri': index % 2 })} data-tilt="4">
              <span className="spot" aria-hidden="true"></span>
              <div className="post__media" style={cssVars({ viewTransitionName: `post-${article.slug}` })}>
                <img
                  src={`${import.meta.env.BASE_URL}assets/blog/${article.image}`}
                  alt={article.title}
                  width="1024"
                  height="1024"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
              <div className="post__body">
                <div className="post__meta">
                  <span className="post__cat">{article.category}</span>
                  <span>{article.date} • {article.readTime}</span>
                </div>
                <h2 className="post__title">{article.title}</h2>
                <p className="post__excerpt">{article.excerpt}</p>
                <TLink to={`/blog/${article.slug}`} className="post__link" aria-label={`Прочети повече: ${article.title}`}>
                  Прочети повече
                  <ArrowRight aria-hidden="true" />
                </TLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
