import React, { useState, useEffect } from 'react';

interface DecipherTextProps {
  text: string;
  from?: string;
  speed?: number;
  delay?: number;
  revealSpeed?: number;
}

export const DecipherText: React.FC<DecipherTextProps> = ({ 
  text, 
  from = '', 
  speed = 40, 
  delay = 500,
  revealSpeed = 3
}) => {
  const [displayText, setDisplayText] = useState(from || '');
  const chars = '01';

  useEffect(() => {
    let iteration = 0;
    let interval: any = null;

    const startAnimation = () => {
      interval = setInterval(() => {
        const targetChars = text.split('');
        const fromChars = from.split('');
        
        // Determine the length to animate (max of both)
        const maxLength = Math.max(targetChars.length, fromChars.length);
        const currentLength = Math.max(
          fromChars.length,
          Math.min(targetChars.length, Math.floor(iteration * 1.5))
        );

        setDisplayText(
          Array.from({ length: currentLength }).map((_, index) => {
            if (index < iteration) {
              return text[index] || '';
            }
            
            // Show original character if still early in its transformation
            if (fromChars[index] && iteration < index) {
              return fromChars[index];
            }

            // Return space if target is space and we are close to it
            if (targetChars[index] === ' ' && iteration > index - 2) return ' ';
            
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text); // Ensure final text is exact
        }

        iteration += 1 / revealSpeed;
      }, speed);
    };

    const timeout = setTimeout(startAnimation, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, from, speed, delay, revealSpeed]);

  return (
    <span aria-label={text} role="text" className="decipher-span">
      {displayText}
    </span>
  );
};
