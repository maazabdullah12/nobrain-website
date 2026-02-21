import { useEffect, useRef } from 'react';

export function MatrixRain() {
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

    const chars = '01NOBRAIN';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * (height / fontSize)));
    // Each column stores a few recent characters for a simple trail
    const prevY: number[][] = Array(columns).fill(null).map(() => []);

    let isHidden = false;
    const onVisibility = () => { isHidden = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    let lastTime = 0;

    const animate = (time: number) => {
      animRef.current = requestAnimationFrame(animate);
      if (isHidden) return;
      if (time - lastTime < 100) return; // ~10fps is plenty for rain
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw current character (brightest)
        ctx.fillStyle = 'rgba(17, 17, 17, 0.12)';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);

        // Draw 3 trailing characters (fading)
        for (let t = 0; t < prevY[i].length; t++) {
          const alpha = 0.06 * (1 - t / prevY[i].length);
          ctx.fillStyle = `rgba(17, 17, 17, ${alpha})`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, prevY[i][t] * fontSize);
        }

        // Store trail
        prevY[i].unshift(drops[i]);
        if (prevY[i].length > 3) prevY[i].pop();

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
          prevY[i] = [];
        }
        drops[i]++;
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
      className="fixed inset-0 pointer-events-none z-[1] opacity-25"
      style={{ willChange: 'transform' }}
    />
  );
}
