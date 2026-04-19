import { useState, useEffect, type FC } from 'react';
import './FloatingFeatures.css';

const features = [
  { id: 1, content: 'ИНТЕРАКТИВНИ ГРАФИКИ В РЕАЛНО ВРЕМЕ', icon: '📊' },
  { id: 2, content: 'МОДЕРНО УПРАВЛЕНИЕ НА АКАУНТИ', icon: '👤' },
  { id: 3, content: 'ИНТЕЛИГЕНТНИ ЧАТ БОТОВЕ И АГЕНТИ', icon: '🤖' },
  { id: 4, content: 'СИГУРНИ ТРАНЗАКЦИИ И АБОНАМЕНТИ', icon: '💳' },
  { id: 5, content: 'СЛОЖНИ ЙЕРАРХИЧНИ СИСТЕМИ', icon: '🗺️' }
];

const FloatingFeatures: FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          setIsVisible(scrollY + windowHeight <= documentHeight - 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`info-ticker-container ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="ticker-track">
        {features.map((f, index) => (
          <div 
            key={f.id} 
            className={`ticker-item ${activeFeature === index ? 'active' : ''}`}
          >
            <span className="ticker-icon">{f.icon}</span>
            <span className="ticker-text">{f.content}</span>
          </div>
        ))}
      </div>
      <div className="ticker-progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((activeFeature + 1) / features.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FloatingFeatures;
