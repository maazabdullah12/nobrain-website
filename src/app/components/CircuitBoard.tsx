import { useEffect, useRef } from 'react';

export function CircuitBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0, height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Full 30 circuit paths
    const paths: Array<{
      x: number; y: number; length: number;
      direction: 'h' | 'v'; progress: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      paths.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 100 + Math.random() * 200,
        direction: Math.random() > 0.5 ? 'h' : 'v',
        progress: Math.random()
      });
    }

    let isHidden = false;
    const onVisibility = () => { isHidden = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      if (isHidden) return;

      ctx.clearRect(0, 0, width, height);

      // Batch static lines
      ctx.strokeStyle = 'rgba(17, 17, 17, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const path of paths) {
        if (path.direction === 'h') {
          ctx.moveTo(path.x, path.y);
          ctx.lineTo(path.x + path.length, path.y);
        } else {
          ctx.moveTo(path.x, path.y);
          ctx.lineTo(path.x, path.y + path.length);
        }
      }
      ctx.stroke();

      // Batch pulse dots
      ctx.fillStyle = 'rgba(17, 17, 17, 0.4)';
      for (const path of paths) {
        const pulsePos = path.progress * path.length;
        ctx.beginPath();
        if (path.direction === 'h') {
          ctx.arc(path.x + pulsePos, path.y, 2, 0, Math.PI * 2);
        } else {
          ctx.arc(path.x, path.y + pulsePos, 2, 0, Math.PI * 2);
        }
        ctx.fill();
        path.progress += 0.005;
        if (path.progress > 1) path.progress = 0;
      }

      // Batch connection nodes
      ctx.fillStyle = 'rgba(17, 17, 17, 0.15)';
      for (const path of paths) {
        ctx.beginPath();
        ctx.arc(path.x, path.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] opacity-40"
      style={{ willChange: 'transform' }}
    />
  );
}
