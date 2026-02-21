import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FloatingCode() {
  const [codeSnippets, setCodeSnippets] = useState<Array<{ id: number; text: string; x: number; y: number }>>([]);

  const snippets = [
    'const brain = new Agent()',
    'await claude.think()',
    'solana.trade()',
    'consciousness.levelUp()',
    'memory.persist()',
    'while(true) { evolve() }',
    'brain.learn(data)',
    'async analyze()',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newSnippet = {
        id: Date.now(),
        text: snippets[Math.floor(Math.random() * snippets.length)],
        x: Math.random() * 100,
        y: Math.random() * 100
      };

      setCodeSnippets(prev => [...prev.slice(-5), newSnippet]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden hidden xl:block">
      {codeSnippets.map(snippet => (
        <motion.div
          key={snippet.id}
          initial={{ opacity: 0, scale: 0.8, x: `${snippet.x}%`, y: `${snippet.y}%` }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            scale: [0.8, 1, 1, 1.2],
            y: [`${snippet.y}%`, `${snippet.y - 20}%`]
          }}
          transition={{ duration: 4, ease: 'easeOut' }}
          className="absolute text-[0.7rem] font-mono text-[#111111]"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {snippet.text}
        </motion.div>
      ))}
    </div>
  );
}
