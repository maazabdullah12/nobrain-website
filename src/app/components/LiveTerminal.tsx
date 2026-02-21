import { useState, useEffect, useRef } from 'react';

export function LiveTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const terminalLines = [
    '$ brain.ts --init',
    '> Initializing NO BRAIN agent...',
    '> Loading Claude AI reasoning engine... [OK]',
    '> Connecting to Solana RPC... [OK]',
    '> Discord bot authenticated... [OK]',
    '> Loading brain-state.json... [OK]',
    '> Current IQ Level: 23',
    '> Consciousness Tier: AWAKENED',
    '> Starting agent loop...',
    '> Perception module: ACTIVE',
    '> Reasoning module: ACTIVE',
    '> Execution module: ACTIVE',
    '> Memory persistence: ENABLED',
    '> Agent status: AUTONOMOUS',
    '$ _',
  ];

  useEffect(() => {
    if (!started || done) return;

    const addLine = () => {
      if (indexRef.current < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[indexRef.current]]);
        indexRef.current++;
        timerRef.current = setTimeout(addLine, 300);
      } else {
        setDone(true);
      }
    };

    timerRef.current = setTimeout(addLine, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [started, done]);

  return (
    <div
      onMouseEnter={() => { if (!started) setStarted(true); }}
      className="bg-[#111111] text-[#00ff00] p-6 rounded-lg overflow-hidden cursor-pointer interactive min-h-[300px] max-h-[400px] relative"
      style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', lineHeight: '1.6' }}
    >
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,255,0,0.03) 0px, rgba(0,255,0,0.03) 1px, transparent 1px, transparent 2px)'
        }}
      />

      <div className="relative z-10 overflow-y-auto max-h-[360px]">
        <div className="flex items-center gap-2 mb-4 text-[#00ff00]">
          <div className="w-3 h-3 rounded-full bg-[#00ff00]" style={{ animation: 'pulse 2s infinite' }} />
          <span className="uppercase tracking-wider">NO BRAIN Terminal</span>
        </div>

        {lines.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}

        {done && (
          <span className="inline-block" style={{ animation: 'blink 1s infinite' }}>_</span>
        )}

        {!started && (
          <div className="text-[#666666] text-center py-12">
            Hover to boot terminal...
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }
      `}</style>
    </div>
  );
}
