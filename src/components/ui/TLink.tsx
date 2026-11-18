import { type AnchorHTMLAttributes, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToHash, withRouteTransition } from '../../fx/nav';

interface TLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Вътрешен адрес: "/blog", "/#contact", "/blog/slug" */
  to: string;
}

/**
 * Вътрешна връзка: плавен преход (View Transitions) между страниците и
 * плавен скрол до секция, когато целта е на текущата страница.
 */
export function TLink({ to, onClick, children, ...rest }: TLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();

    const [rawPath, hash = ''] = to.split('#');
    const path = rawPath || '/';

    if (path === location.pathname) {
      if (to !== location.pathname + location.hash) navigate(to);
      scrollToHash(hash);
      return;
    }
    withRouteTransition(() => navigate(to));
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
