import { motion } from 'motion/react';

export function NeuralPulse({ delay = 0 }: { delay?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-[#111111] rounded-lg"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: [0, 0.2, 0],
            scale: [1, 1.05, 1.1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: delay + i * 0.6,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
}
