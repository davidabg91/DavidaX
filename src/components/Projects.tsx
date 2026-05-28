import { type FC, useState, useEffect } from 'react';
import { CardStack, type CardStackItem } from './ui/card-stack';
import './Projects.css';

const projects: CardStackItem[] = [
  {
    id: 1,
    title: 'Needo',
    tag: 'Services Marketplace',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/needo.jpg`,
    href: 'https://needobg.com/',
    description: 'Needo свързва хората с идеи с хората с умения. Снимай, публикувай и избери най-добрата оферта за секунди.',
  },
  {
    id: 2,
    title: 'TransitFlow',
    tag: 'Fleet Management & NFC',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/transitflow.png`,
    href: 'http://transitflow.org/',
    description: 'Дигитализация на транспортния сектор чрез NFC валидиране, динамични графици и детайлна финансова отчетност.',
  },
  {
    id: 3,
    title: 'NFC Bulgaria',
    tag: 'NFC & Digital IDs',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/nfcbulgaria.png`,
    href: 'https://nfcbulgaria.com/',
    description: 'Смарт решения за дигитални визитки, NFC табели и автоматизация на бизнеса.',
  },
  {
    id: 4,
    title: 'Dary Commerce',
    tag: 'SaaS & Fintech',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/darycommerce.png`,
    href: 'https://darycommerce.com/',
    description: 'Иновативна платформа за управление на абонаменти и дигитални разплащания.',
  },
  {
    id: 5,
    title: 'ДИ ЦЕНТЪР',
    tag: 'Хотелиерски Софтуер',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/dicenter.png`,
    href: 'https://davidabg91.github.io/DICenter/',
    description: 'Премиум уеб сайт за управление на резервации и луксозно настаняване.',
  },
  {
    id: 6,
    title: 'The Corner',
    tag: 'Grocery & E-commerce',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/thecorner.png`,
    href: 'https://www.thecornerbar.online/',
    description: 'Модерна платформа за онлайн пазаруване и дигитализация на местни хранителни магазини.',
  },
  {
    id: 7,
    title: 'Fabcrush',
    tag: 'E-commerce Platform',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/fabcrush.png`,
    href: 'https://fabcrush.com/',
    description: 'Мащабируем онлайн маркетплейс с фокус върху потребителското преживяване.',
  },
  {
    id: 8,
    title: 'Fortnite Status',
    tag: 'Real-time API Monitor',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/isfortnite.png`,
    href: 'https://isfortnite.online/',
    description: 'Система за мониторинг на гейминг сървъри в реално време.',
  },
  {
    id: 9,
    title: 'Odd One Out',
    tag: 'Interactive Social Game',
    imageSrc: `${import.meta.env.BASE_URL}assets/projects/oddoneout.png`,
    href: 'https://oddoneout.site/',
    description: 'Уеб-базирана социална игра с фокус върху интерактивността.',
  },
];

function useCardSize() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const isMobile = width < 768;

  if (isMobile) {
    const cardWidth = Math.round(width * 0.78);
    const maxOffset = 2;
    // leftmost card left edge = 0: width/2 - maxOffset*cardSpacing - cardWidth/2 = 0
    const cardSpacing = (width - cardWidth) / (2 * maxOffset);
    const overlap = 1 - cardSpacing / cardWidth;
    return { cardWidth, cardHeight: Math.round(cardWidth * 0.6), overlap, spreadDeg: 24, maxVisible: maxOffset * 2 + 1 };
  }

  const cardWidth = 560;
  const cardHeight = 340;
  const maxOffset = 3;
  // leftmost card left edge touches screen left: width/2 - maxOffset*cardSpacing - cardWidth/2 = 0
  const cardSpacing = (width - cardWidth) / (2 * maxOffset);
  const overlap = 1 - cardSpacing / cardWidth;
  return { cardWidth, cardHeight, overlap, spreadDeg: 44, maxVisible: maxOffset * 2 + 1 };
}

const Projects: FC = () => {
  const { cardWidth, cardHeight, overlap, spreadDeg, maxVisible } = useCardSize();

  return (
    <section id="projects" className="projects-section section fade-in">
      <h2 className="section-title">
        Избрани <span className="gradient-text">Проекти</span>
      </h2>
      <CardStack
        items={projects}
        initialIndex={0}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        overlap={overlap}
        spreadDeg={spreadDeg}
        maxVisible={maxVisible}
        autoAdvance
        intervalMs={2800}
        pauseOnHover
        showDots
        loop
      />
    </section>
  );
};

export default Projects;
