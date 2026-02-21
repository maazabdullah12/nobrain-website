import { motion } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter';

interface PulsingMetricProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  index: number;
}

export function PulsingMetric({ value, label, prefix, suffix, decimals = 0, index }: PulsingMetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center p-6 rounded-lg hover:bg-[rgba(0,0,0,0.02)] border border-transparent hover:border-[#cccccc] transition-all interactive relative group overflow-hidden"
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#111111] to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.div>

      {/* Pulsing background */}
      <motion.div
        className="absolute inset-0 bg-[#111111] opacity-0 group-hover:opacity-5 rounded-lg"
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="relative z-10">
        <motion.div
          className="text-4xl font-extrabold text-[#111111] mb-1"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
          animate={{
            textShadow: [
              '0 0 0px rgba(17, 17, 17, 0)',
              '0 0 10px rgba(17, 17, 17, 0.3)',
              '0 0 0px rgba(17, 17, 17, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.2
          }}
        >
          <AnimatedCounter
            end={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        </motion.div>
        
        <div className="text-[#999999] text-[0.72rem] uppercase tracking-[1.5px] font-medium">
          {label}
        </div>

        {/* Activity indicator */}
        <motion.div
          className="w-2 h-2 bg-[#111111] rounded-full mx-auto mt-3"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3
          }}
        />
      </div>
    </motion.div>
  );
}
