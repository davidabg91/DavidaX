import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('notfound-active');
    return () => document.body.classList.remove('notfound-active');
  }, []);

  return (
    <section className="notfound-section">
      <div className="notfound-inner">
        <div className="notfound-gif" aria-hidden="true">
          <h1 className="notfound-code">404</h1>
        </div>

        <div className="notfound-content">
          <h3 className="notfound-title">Look like you're lost</h3>
          <p className="notfound-text">The page you are looking for is not available!</p>

          <button type="button" className="notfound-btn" onClick={() => navigate('/')}>
            Go to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
