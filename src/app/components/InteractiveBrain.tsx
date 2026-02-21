import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Node {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  connections: number[];
}

export function InteractiveBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const animationFrameRef = useRef<number>();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    // Create brain-like node structure
    const createNodes = () => {
      const nodes: Node[] = [];
      const centerX = size / 2;
      const centerY = size / 2;
      const nodeCount = 25;

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 80 + Math.random() * 80;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        nodes.push({
          x,
          y,
          radius: 3 + Math.random() * 4,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: []
        });
      }

      // Create connections
      nodes.forEach((node, i) => {
        const connectionCount = 2 + Math.floor(Math.random() * 3);
        const potentialConnections = nodes
          .map((_, idx) => idx)
          .filter(idx => idx !== i)
          .sort(() => Math.random() - 0.5)
          .slice(0, connectionCount);
        
        node.connections = potentialConnections;
      });

      return nodes;
    };

    nodesRef.current = createNodes();

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;

      // Update nodes
      nodesRef.current.forEach(node => {
        // Apply slight movement
        node.x += node.vx;
        node.y += node.vy;

        // Mouse interaction
        if (mouseRef.current.isHovering) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            node.vx += (dx / distance) * force * 0.3;
            node.vy += (dy / distance) * force * 0.3;
          }
        }

        // Pull back to center (very gentle)
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        node.vx += dx * 0.0002;
        node.vy += dy * 0.0002;

        // Damping
        node.vx *= 0.95;
        node.vy *= 0.95;
      });

      // Draw connections
      nodesRef.current.forEach((node, i) => {
        node.connections.forEach(connIdx => {
          if (connIdx > i) {
            const targetNode = nodesRef.current[connIdx];
            const dx = node.x - targetNode.x;
            const dy = node.y - targetNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            
            // Pulsing effect
            const pulse = Math.sin(Date.now() / 1000 + i) * 0.3 + 0.7;
            ctx.strokeStyle = `rgba(17, 17, 17, ${(0.3 + pulse * 0.2) * (1 - distance / 200)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Draw data flow particles
            if (isActive && Math.random() > 0.95) {
              const t = Math.random();
              const px = node.x + (targetNode.x - node.x) * t;
              const py = node.y + (targetNode.y - node.y) * t;
              
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(17, 17, 17, 0.8)';
              ctx.fill();
            }
          }
        });
      });

      // Draw nodes
      nodesRef.current.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
        gradient.addColorStop(0, 'rgba(17, 17, 17, 1)');
        gradient.addColorStop(1, 'rgba(17, 17, 17, 0.6)');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Glow effect when active
        if (isActive) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(17, 17, 17, 0.5)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true
    };
  };

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        setIsActive(false);
        mouseRef.current.isHovering = false;
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full cursor-pointer"
        style={{ maxWidth: '400px', maxHeight: '400px' }}
      />
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
        >
          <div className="text-[0.7rem] uppercase tracking-[2px] text-[#111111] font-bold opacity-80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Neural Network Active
          </div>
          <div className="text-[0.6rem] text-[#666666] mt-1">
            Thinking...
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
