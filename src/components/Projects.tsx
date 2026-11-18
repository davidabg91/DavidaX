import { type FC, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Words, Wave } from './ui/Split';
import { cssVars } from '../utils/css';
import { withTransition } from '../fx/nav';
import { scan } from '../fx/motion';
import './Projects.css';

type Category = 'platforms' | 'shops' | 'sites' | 'play';

interface Project {
  id: number;
  title: string;
  tag: string;
  image: string;
  href: string;
  description: string;
  category: Category;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Needo',
    tag: 'Services Marketplace',
    image: 'needo.webp',
    href: 'https://needobg.com/',
    description: 'Needo свързва хората с идеи с хората с умения. Снимай, публикувай и избери най-добрата оферта за секунди.',
    category: 'platforms',
  },
  {
    id: 2,
    title: 'TransitFlow',
    tag: 'Fleet Management & NFC',
    image: 'transitflow.webp',
    href: 'http://transitflow.org/',
    description: 'Дигитализация на транспортния сектор чрез NFC валидиране, динамични графици и детайлна финансова отчетност.',
    category: 'platforms',
  },
  {
    id: 3,
    title: 'NFC Bulgaria',
    tag: 'NFC & Digital IDs',
    image: 'nfcbulgaria.webp',
    href: 'https://nfcbulgaria.com/',
    description: 'Смарт решения за дигитални визитки, NFC табели и автоматизация на бизнеса.',
    category: 'sites',
  },
  {
    id: 4,
    title: 'Dary Commerce',
    tag: 'SaaS & Fintech',
    image: 'darycommerce.webp',
    href: 'https://darycommerce.com/',
    description: 'Иновативна платформа за управление на абонаменти и дигитални разплащания.',
    category: 'platforms',
  },
  {
    id: 5,
    title: 'ДИ ЦЕНТЪР',
    tag: 'Хотелиерски Софтуер',
    image: 'dicenter.webp',
    href: 'https://davidabg91.github.io/DICenter/',
    description: 'Премиум уеб сайт за управление на резервации и луксозно настаняване.',
    category: 'sites',
  },
  {
    id: 6,
    title: 'Поръчки за малки и големи',
    tag: 'E-commerce & Community',
    image: 'malkiigolemi.webp',
    href: 'https://malkiigolemi.com/',
    description: 'Онлайн магазин на Facebook общността „Поръчки за малки и големи“ — козметика, играчки и стоки за дома с бърза доставка.',
    category: 'shops',
  },
  {
    id: 7,
    title: 'Fabcrush',
    tag: 'E-commerce Platform',
    image: 'fabcrush.webp',
    href: 'https://fabcrush.com/',
    description: 'Мащабируем онлайн маркетплейс с фокус върху потребителското преживяване.',
    category: 'shops',
  },
  {
    id: 8,
    title: 'Fortnite Status',
    tag: 'Real-time API Monitor',
    image: 'isfortnite.webp',
    href: 'https://isfortnite.online/',
    description: 'Система за мониторинг на гейминг сървъри в реално време.',
    category: 'play',
  },
  {
    id: 9,
    title: 'Odd One Out',
    tag: 'Interactive Social Game',
    image: 'oddoneout.webp',
    href: 'https://oddoneout.site/',
    description: 'Уеб-базирана социална игра с фокус върху интерактивността.',
    category: 'play',
  },
  {
    id: 10,
    title: 'Умаревска Ябълка',
    tag: 'E-commerce & Local Business',
    image: 'umarevskaqbylka.webp',
    href: 'https://davidabg91.github.io/UmarevskaQbylka',
    description: 'Иновативен уеб сайт и онлайн магазин за производител на натурални ябълки и студено пресован сок с интерактивна количка.',
    category: 'shops',
  },
];

const filters: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: 'Всички' },
  { key: 'platforms', label: 'Платформи' },
  { key: 'shops', label: 'Магазини' },
  { key: 'sites', label: 'Сайтове' },
  { key: 'play', label: 'Игри и инструменти' },
];

const Projects: FC = () => {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const grid = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  // След филтриране новите карти се показват веднага (преходът е от View Transitions)
  useLayoutEffect(() => {
    if (!touched.current) return;
    grid.current?.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
    scan();
  }, [filter]);

  const choose = (key: Category | 'all') => {
    if (key === filter) return;
    touched.current = true;
    withTransition(() => setFilter(key));
  };

  return (
    <section id="projects" className="projects on-dark">
      <Wave position="top" />
      <div className="projects__glow" aria-hidden="true"></div>

      <div className="wrap projects__inner">
        <header className="projects__head">
          <div>
            <span className="kicker reveal">Портфолио</span>
            <h2 className="h2" data-split>
              <Words>Избрани *Проекти*</Words>
            </h2>
          </div>

          <div className="filters reveal" role="group" aria-label="Филтър по тип проект">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`filters__btn${filter === f.key ? ' is-active' : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => choose(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        <div className="projects__grid" ref={grid}>
          {visible.map((p, i) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project reveal"
              style={cssVars({ '--ri': i % 3, viewTransitionName: `project-${p.id}` })}
              data-tilt="5"
            >
              <span className="spot" aria-hidden="true"></span>
              <div className="project__media">
                <img
                  src={`${import.meta.env.BASE_URL}assets/projects/${p.image}`}
                  alt={`${p.title} — ${p.tag}`}
                  width="640"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project__body">
                <span className="project__tag">{p.tag}</span>
                <h3 className="project__title">
                  {p.title}
                  <ArrowUpRight aria-hidden="true" />
                </h3>
                <p className="project__desc">{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Wave position="bottom" />
    </section>
  );
};

export default Projects;
