import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

  const getGlitchedText = () => {
    return text.split('').map((char, i) => {
      if (Math.random() > 0.9) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  return (
    <span className={`relative inline-block ${className}`}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], x: [-2, 2, -2], y: [1, -1, 1] }}
            transition={{ duration: 0.2, times: [0, 0.5, 1] }}
            className="absolute inset-0"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundImage: 'linear-gradient(to right, #111111, #444444)',
              textShadow: 'none',
              filter: 'drop-shadow(2px 0 #ff000044)'
            }}
          >
            {getGlitchedText()}
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], x: [2, -2, 2], y: [-1, 1, -1] }}
            transition={{ duration: 0.2, times: [0, 0.5, 1], delay: 0.05 }}
            className="absolute inset-0"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundImage: 'linear-gradient(to right, #111111, #444444)',
              textShadow: 'none',
              filter: 'drop-shadow(-2px 0 #00ffff44)'
            }}
          >
            {getGlitchedText()}
          </motion.span>
        </>
      )}
    </span>
  );
}
