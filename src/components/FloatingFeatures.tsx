import React, { useState, useEffect } from 'react';
import './FloatingFeatures.css';

const features = [
  {
    id: 1,
    title: 'Dashboard Analytics',
    content: 'Интерактивни графики в реално време',
    icon: '📊',
    position: 'top-left'
  },
  {
    id: 2,
    title: 'User Profile',
    content: 'Модерно управление на акаунти',
    icon: '👤',
    position: 'bottom-right'
  },
  {
    id: 3,
    title: 'AI Assistant',
    content: 'Интелигентни чат ботове и агенти',
    icon: '🤖',
    position: 'top-right'
  },
  {
    id: 4,
    title: 'Payment Gateway',
    content: 'Сигурни транзакции и абонаменти',
    icon: '💳',
    position: 'bottom-left'
  },
  {
    id: 5,
    title: 'Navigation Systems',
    content: 'Сложни йерархични менюта',
    icon: '🗺️',
    position: 'left-center'
  }
];

const FloatingFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-container">
      {features.map((f, index) => (
        <div 
          key={f.id} 
          className={`floating-panel ${f.position} ${activeFeature === index ? 'active' : ''}`}
        >
          <div className="panel-glow"></div>
          <div className="panel-content">
            <span className="panel-icon">{f.icon}</span>
            <div className="panel-text">
              <h4>{f.title}</h4>
              <p>{f.content}</p>
            </div>
          </div>
          <div className="tech-line"></div>
        </div>
      ))}
    </div>
  );
};

export default FloatingFeatures;
