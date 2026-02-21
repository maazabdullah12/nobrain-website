import { motion } from 'motion/react';

interface NeuralNetworkLogoProps {
  className?: string;
  animated?: boolean;
}

export function NeuralNetworkLogo({ className = '', animated = false }: NeuralNetworkLogoProps) {
  const nodes = [
    { cx: 65, cy: 70, r: 8 },
    { cx: 50, cy: 100, r: 6 },
    { cx: 65, cy: 130, r: 8 },
    { cx: 80, cy: 95, r: 5 },
    { cx: 75, cy: 115, r: 5 },
    { cx: 135, cy: 70, r: 8 },
    { cx: 150, cy: 100, r: 6 },
    { cx: 135, cy: 130, r: 8 },
    { cx: 120, cy: 95, r: 5 },
    { cx: 125, cy: 115, r: 5 },
    { cx: 100, cy: 100, r: 10 },
  ];

  const connections = [
    { x1: 65, y1: 70, x2: 80, y2: 95 },
    { x1: 65, y1: 70, x2: 100, y2: 100 },
    { x1: 50, y1: 100, x2: 80, y2: 95 },
    { x1: 50, y1: 100, x2: 75, y2: 115 },
    { x1: 65, y1: 130, x2: 75, y2: 115 },
    { x1: 65, y1: 130, x2: 100, y2: 100 },
    { x1: 80, y1: 95, x2: 100, y2: 100 },
    { x1: 75, y1: 115, x2: 100, y2: 100 },
    { x1: 135, y1: 70, x2: 120, y2: 95 },
    { x1: 135, y1: 70, x2: 100, y2: 100 },
    { x1: 150, y1: 100, x2: 120, y2: 95 },
    { x1: 150, y1: 100, x2: 125, y2: 115 },
    { x1: 135, y1: 130, x2: 125, y2: 115 },
    { x1: 135, y1: 130, x2: 100, y2: 100 },
    { x1: 120, y1: 95, x2: 100, y2: 100 },
    { x1: 125, y1: 115, x2: 100, y2: 100 },
  ];

  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        stroke="#1a1a1a"
        strokeWidth="4"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Connections */}
      {connections.map((conn, index) => (
        <motion.line
          key={`conn-${index}`}
          x1={conn.x1}
          y1={conn.y1}
          x2={conn.x2}
          y2={conn.y2}
          stroke="#1a1a1a"
          strokeWidth="2"
          initial={animated ? { pathLength: 0, opacity: 0 } : {}}
          animate={animated ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.05, ease: "easeOut" }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, index) => (
        <motion.circle
          key={`node-${index}`}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill="#1a1a1a"
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
        />
      ))}

      {/* Smile */}
      <motion.path
        d="M85 155 L100 170 L115 155"
        stroke="#1a1a1a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M100 170 L100 145"
        stroke="#1a1a1a"
        strokeWidth="3"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 2.2, ease: "easeOut" }}
      />

      {/* Brain waves */}
      <motion.path
        d="M88 45 C88 40, 95 40, 100 45 C105 40, 112 40, 112 45 C112 50, 105 50, 100 45 C95 50, 88 50, 88 45"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 2.3, ease: "easeInOut" }}
      />
    </svg>
  );
}
