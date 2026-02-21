import { motion } from 'motion/react';

export function ScanningEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#111111] to-transparent"
        animate={{
          top: ['0%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ opacity: 0.15 }}
      />
    </div>
  );
}
