import React, { useState, useEffect } from 'react';

interface DecipherTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

export const DecipherText: React.FC<DecipherTextProps> = ({ text, speed = 40, delay = 500 }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '01';

  useEffect(() => {
    let iteration = 0;
    let interval: any = null;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    const timeout = setTimeout(startAnimation, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, speed, delay]);

  return (
    <span aria-label={text} role="text">
      {displayText || text.split('').map(() => ' ').join('')}
    </span>
  );
};
