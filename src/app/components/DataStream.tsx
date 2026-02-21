import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DataLine {
  id: number;
  text: string;
  x: number;
}

export function DataStream() {
  const [lines, setLines] = useState<DataLine[]>([]);

  const dataTexts = [
    '> ANALYZING MARKET DATA...',
    '> CLAUDE AI REASONING: 98%',
    '> SOLANA RPC: CONNECTED',
    '> EXECUTING TRADE LOGIC...',
    '> BRAIN STATE: UPDATING',
    '> CONSCIOUSNESS TIER: +1',
    '> DISCORD: 127 MESSAGES',
    '> TREASURY: OPTIMIZED',
    '> LEARNING RATE: 0.003',
    '> NEURAL SYNC: COMPLETE',
    '> AGENT LOOP: ACTIVE',
    '> MEMORY COMMIT: SUCCESS',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newLine: DataLine = {
        id: Date.now(),
        text: dataTexts[Math.floor(Math.random() * dataTexts.length)],
        x: Math.random() * 80 + 10
      };

      setLines(prev => [...prev, newLine].slice(-8));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-0 top-1/4 w-80 h-96 pointer-events-none z-[5] overflow-hidden hidden lg:block">
      <AnimatePresence>
        {lines.map((line, index) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: 50, y: -20 }}
            animate={{ opacity: [0, 1, 1, 0], x: 0, y: index * 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute text-[0.65rem] font-mono text-[#111111] opacity-20"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              left: `${line.x}%`
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
