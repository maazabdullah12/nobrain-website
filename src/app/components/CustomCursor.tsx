import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const [renderPos, setRenderPos] = useState({ x: 0, y: 0 });
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setDotPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animId: number;
    const animate = () => {
      cursorPos.current = {
        x: cursorPos.current.x + (mousePos.current.x - cursorPos.current.x) * 0.35,
        y: cursorPos.current.y + (mousePos.current.y - cursorPos.current.y) * 0.35
      };
      setRenderPos({ ...cursorPos.current });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .interactive')) {
        setIsActive(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .interactive')) {
        setIsActive(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: `${renderPos.x}px`,
          top: `${renderPos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: isActive ? '40px' : '22px',
          height: isActive ? '40px' : '22px',
          opacity: isVisible ? 1 : 0,
          border: `2px solid ${isActive ? '#333333' : '#111111'}`,
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s'
        }}
      />
      
      {/* Cursor dot */}
      <div
        className="fixed pointer-events-none z-[10000] hidden md:block"
        style={{
          left: `${dotPos.x}px`,
          top: `${dotPos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '5px',
          height: '5px',
          opacity: isVisible ? 1 : 0,
          background: '#111111',
          borderRadius: '50%',
          boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)'
        }}
      />
    </>
  );
}
