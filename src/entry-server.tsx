/* eslint-disable react-refresh/only-export-components -- сървърен вход, не е компонент */
/* Сървърен вход: ползва се само при build, за да се генерира статичен HTML за всяка страница. */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';
import { headFor, routeMarker, routes, ARTICLE_SCHEMA_ID } from './seo';

export { routes, ARTICLE_SCHEMA_ID };

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: headFor(url), marker: routeMarker(url) };
}
