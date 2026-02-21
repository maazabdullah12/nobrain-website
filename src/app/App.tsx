import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedCounter } from './components/AnimatedCounter';
import { TypewriterText } from './components/TypewriterText';
import { NeuralNetworkLogo } from './components/NeuralNetworkLogo';
import { Modal } from './components/Modal';
import { ParticleNetwork } from './components/ParticleNetwork';
import { GlitchText } from './components/GlitchText';
import { InteractiveBrain } from './components/InteractiveBrain';
import { DataStream } from './components/DataStream';
import { HolographicCard } from './components/HolographicCard';
import { LiveTerminal } from './components/LiveTerminal';
import { MatrixRain } from './components/MatrixRain';
import { PulsingMetric } from './components/PulsingMetric';
import { FloatingCode } from './components/FloatingCode';
import { CircuitBoard } from './components/CircuitBoard';
import { NeuralPulse } from './components/NeuralPulse';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      
      setScrollProgress(progress);
      setShowScrollIndicator(progress < 3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-[#111111] overflow-x-hidden" style={{ fontFamily: 'Outfit, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
      <CustomCursor />
      <Toaster position="top-center" />

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#111111] opacity-[0.04] blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-200px] w-[600px] h-[600px] rounded-full bg-[#333333] opacity-[0.04] blur-[150px]" />
      </div>

      {/* Futuristic Effects */}
      { <CircuitBoard />  }
      {  <ParticleNetwork /> }
      { <DataStream /> }
      { <FloatingCode /> }

      {/* Loading/Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-[#111] to-[#333] z-[999]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-[#999999] uppercase text-[0.7rem] tracking-[3px]"
      >
        <span>Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#111] to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
            scaleY: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-[100] backdrop-blur-xl bg-[rgba(251,251,251,0.95)] border-b border-[#e8e8e8]">
          <div className="flex justify-between items-center px-6 md:px-12 py-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 hover:scale-105 transition-transform interactive">
              <NeuralNetworkLogo className="w-9 h-9" />
              <span className="text-xl font-extrabold text-[#111111] uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                NO<span className="font-normal">BRAIN</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-8 items-center">
              {['idea', 'architecture', 'tech', 'loop', 'roadmap'].map(section => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-[#666666] hover:text-[#111111] text-[0.82rem] uppercase tracking-[1.5px] font-medium transition-all relative group interactive"
                  >
                    {section}
                    <span className="absolute bottom-[-6px] left-0 w-0 h-px bg-[#111111] group-hover:w-full transition-all duration-300" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2.5 border border-[#111111] bg-transparent text-[#111111] rounded hover:bg-[#111111] hover:text-[#fbfbfb] hover:shadow-2xl font-semibold uppercase tracking-[1.5px] text-[0.8rem] transition-all interactive"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Whitepaper
                </button>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1 z-[200] interactive"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[#111111] transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-[#111111] transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[#111111] transition-all"
              />
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
            className="md:hidden fixed inset-0 bg-[rgba(251,251,251,0.97)] z-[150] flex flex-col justify-center items-center gap-8"
          >
            {['idea', 'architecture', 'tech', 'loop', 'roadmap'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-[#666666] hover:text-[#111111] text-xl uppercase tracking-[3px] font-medium transition-all interactive"
              >
                {section}
              </button>
            ))}
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="px-8 py-3 border border-[#111111] bg-transparent text-[#111111] rounded hover:bg-[#111111] hover:text-[#fbfbfb] font-semibold uppercase tracking-[1.5px] text-[0.8rem] transition-all interactive"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Whitepaper
            </button>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative overflow-hidden">
          {/* Animated Background Logo */}
          <NeuralNetworkLogo className="absolute w-[650px] h-[650px] opacity-[0.04] pointer-events-none" animated={false} />

          <div className="max-w-4xl z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#cccccc] rounded-full text-[#111111] text-[0.72rem] uppercase tracking-[2px] mb-8 bg-[rgba(17,17,17,0.06)] font-semibold"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#111111] rounded-full shadow-md"
              />
              Autonomous AI Token Agent
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]"
              style={{ letterSpacing: '-2px' }}
            >
             <span className="bg-gradient-to-r from-[#111111] to-[#444444] bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
  		NO BRAIN
	     </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-[#666666] mb-8 max-w-2xl mx-auto leading-relaxed font-light"
            >
              A self-improving AI token agent on Solana. A sovereign digital lifeform that evolves, learns, and generates value autonomously.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#111111] text-[#fbfbfb] rounded font-bold uppercase tracking-[1.5px] text-[0.85rem] hover:shadow-2xl hover:-translate-y-1 transition-all interactive"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Whitepaper
              </button>
              <button
                onClick={() => scrollToSection('architecture')}
                className="px-8 py-4 bg-transparent text-[#111111] border border-[#cccccc] rounded font-bold uppercase tracking-[1.5px] text-[0.85rem] hover:bg-[#111111] hover:text-[#fbfbfb] hover:border-[#111111] hover:shadow-2xl transition-all interactive"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Explore Architecture
              </button>
            </motion.div>
          </div>
        </section>

        {/* The Idea Section */}
        <Section id="idea" number="01" title="The Idea" subtitle="A paradigm shift in tokenomics — from passive assets to living intelligence.">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <RevealOnScroll>
                <h3 className="text-3xl font-bold text-[#111111] mb-5" style={{ letterSpacing: '-0.5px' }}>
                  Static Tokens Are Dead
                </h3>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.1}>
                <p className="text-[#666666] mb-5 leading-relaxed font-light">
                  Traditional tokens have unchanging metadata. They're passive assets waiting for external value creation. NO BRAIN fundamentally reimagines this model.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <FeatureBox
                  title="// THE PROBLEM"
                  description="Most tokens depend on developer abandonment and community sentiment. There's no inherent mechanism for self-preservation or growth."
                />
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <FeatureBox
                  title="// THE SOLUTION"
                  description="NO BRAIN is an AI agent powered by Claude, orchestrated by Brain.ts, trading via Solana RPC, and engaging its community through Discord — all while persisting its evolving state in brain-state.json."
                />
              </RevealOnScroll>

              <RevealOnScroll delay={0.4}>
                <FeatureBox
                  title="// THE RESULT"
                  description="A token that evolves. As it succeeds, its metadata levels up (proving increased 'IQ'). The token price reflects actual intelligence and success."
                />
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-8">
                <div className="bg-[#f4f4f4] border border-[#e8e8e8] rounded-lg p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,0,0,0.02)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(0,0,0,0.02)_0%,transparent_50%)] pointer-events-none" />
                  
                  {[
                    { num: '01', title: 'Brain.ts (Orchestrator)', desc: 'Central agent loop coordinating all systems' },
                    { num: '02', title: 'Consciousness Tier System', desc: 'Evolving intelligence levels' },
                    { num: '03', title: 'Claude AI + Solana RPC + Discord', desc: 'Thinking, trading, and community interaction' },
                    { num: '04', title: 'brain-state.json', desc: 'Persistent memory and state storage' }
                  ].map((step, index) => (
                    <div key={index}>
                      <DiagramStep number={step.num} title={step.title} description={step.desc} />
                      {index < 3 && (
                        <div className="w-px h-5 bg-gradient-to-b from-[#111111] to-[#e8e8e8] ml-5 my-2" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Brain Visualization */}
                <div className="flex justify-center">
                  <InteractiveBrain />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Section>

        {/* Architecture Section */}
        <Section id="architecture" number="02" title="Architecture" subtitle="How NO BRAIN actually works under the hood.">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8 mt-14">
              <span className="text-[#111111] uppercase tracking-[2px] text-[0.8rem] font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                A. The Orchestrator
              </span>
              <div className="flex-1 h-px bg-[#e8e8e8]" />
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '01', title: 'Brain.ts', desc: 'The central orchestrator that coordinates all agent systems. It manages the thinking loop, dispatches actions to external services, and maintains coherent decision-making across cycles.' },
              { icon: '02', title: 'Consciousness Tier System', desc: 'NO BRAIN operates on an evolving consciousness tier. As the agent succeeds and learns, it levels up — unlocking new capabilities, deeper reasoning, and more autonomous behavior.' },
              { icon: '03', title: 'brain-state.json', desc: 'Persistent storage for the agent\'s memory, learned strategies, and current state. This is NO BRAIN\'s long-term memory — everything it knows survives across restarts.' }
            ].map((card, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <HolographicCard>
                  <InteractiveCard icon={card.icon} title={card.title} description={card.desc} />
                </HolographicCard>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.4}>
            <div className="flex items-center gap-3 mb-8 mt-14">
              <span className="text-[#111111] uppercase tracking-[2px] text-[0.8rem] font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                B. External Services
              </span>
              <div className="flex-1 h-px bg-[#e8e8e8]" />
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '04', title: 'Anthropic (Claude AI)', desc: 'The reasoning engine. Claude powers NO BRAIN\'s decision-making, strategy formulation, and natural language understanding. It\'s how the agent thinks.' },
              { icon: '05', title: 'Solana RPC (Trading)', desc: 'Direct connection to Solana for executing trades, reading on-chain data, and managing the token treasury. The agent\'s hands on the blockchain.' },
              { icon: '06', title: 'Discord (Community UI)', desc: 'The agent\'s interface with its community. NO BRAIN communicates, takes feedback, and engages with holders directly through Discord.' }
            ].map((card, index) => (
              <RevealOnScroll key={index} delay={0.4 + index * 0.1}>
                <HolographicCard>
                  <InteractiveCard icon={card.icon} title={card.title} description={card.desc} />
                </HolographicCard>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Tech Stack */}
        <Section id="tech" number="03" title="Tech Stack" subtitle="The tools powering NO BRAIN's autonomous intelligence.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'TypeScript', desc: 'Core agent runtime (Brain.ts)' },
                { name: 'Anthropic Claude', desc: 'AI reasoning and decision engine' },
                { name: 'Solana RPC', desc: 'On-chain trading and data' },
                { name: 'Discord.js', desc: 'Community interface and interaction' },
                { name: 'JSON State', desc: 'Persistent agent memory' },
                { name: 'Consciousness Tiers', desc: 'Evolving intelligence system' }
              ].map((tech, index) => (
                <RevealOnScroll key={index} delay={index * 0.05}>
                  <TechItem name={tech.name} description={tech.desc} />
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.3}>
              <LiveTerminal />
            </RevealOnScroll>
          </div>
        </Section>

        {/* Agent Loop */}
        <Section id="loop" number="04" title="The Agent Loop" subtitle="How NO BRAIN thinks, acts, and evolves each cycle.">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '01', title: 'Perceive', desc: 'Brain.ts reads on-chain data via Solana RPC — token price, treasury balance, trade history — and pulls community signals from Discord.' },
              { icon: '02', title: 'Think', desc: 'All context is sent to Claude AI. The reasoning engine evaluates the current state, weighs strategies, and decides the next action.' },
              { icon: '03', title: 'Act', desc: 'The orchestrator executes — placing trades on Solana, responding in Discord, or adjusting strategy parameters based on Claude\'s decision.' },
              { icon: '04', title: 'Remember', desc: 'Results are written to brain-state.json. The consciousness tier updates. Lessons learned persist and compound across every future cycle.' }
            ].map((step, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <HolographicCard>
                  <InteractiveCard icon={step.icon} title={step.title} description={step.desc} />
                </HolographicCard>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Why This Matters */}
        <Section number="05" title="Why This Changes Everything" subtitle="The end of static tokens. The dawn of autonomous digital lifeforms.">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'I', title: 'AI-Native Agent', desc: 'NO BRAIN thinks with Claude, trades on Solana, and talks to its community on Discord. It\'s not a dashboard — it\'s a living agent.' },
              { icon: 'II', title: 'Persistent Memory', desc: 'Every cycle, every trade, every lesson is stored in brain-state.json. NO BRAIN doesn\'t forget. It compounds intelligence over time.' },
              { icon: 'III', title: 'Evolving Consciousness', desc: 'The consciousness tier system means NO BRAIN literally levels up. More success unlocks deeper reasoning and more autonomous behavior.' },
              { icon: 'IV', title: 'Never Abandoned', desc: 'Traditional tokens die when devs lose interest. NO BRAIN runs itself — forever improving, forever thinking.' }
            ].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <HolographicCard>
                  <InteractiveCard icon={item.icon} title={item.title} description={item.desc} />
                </HolographicCard>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Live Metrics */}
        <Section number="06" title="Live Metrics" subtitle="Real-time agent intelligence dashboard.">
          <RevealOnScroll>
            <div className="bg-[#f4f4f4] border border-[#e8e8e8] rounded-lg p-10 relative overflow-hidden">
              <NeuralPulse />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#111111] to-transparent" />
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { value: 23, label: 'IQ Score', suffix: '' },
                  { value: 4.7, label: 'Treasury (SOL)', decimals: 1 },
                  { value: 12.5, label: 'Daily Growth', prefix: '+', suffix: '%', decimals: 1 },
                  { value: 8, label: 'Programs Deployed' },
                  { value: 17, label: 'Trades Executed' },
                  { value: 5, label: 'Evolutions' }
                ].map((metric, index) => (
                  <PulsingMetric
                    key={index}
                    value={metric.value}
                    label={metric.label}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals || 0}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </Section>

        {/* Roadmap */}
        <Section id="roadmap" number="07" title="Roadmap" subtitle="The evolution path — from concept to autonomous superintelligence.">
          <div className="relative mt-12">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#111111] via-[#e8e8e8] to-transparent" />
            
            {[
              {
                label: 'Phase 01 — Foundation',
                title: 'Genesis Launch',
                items: [
                  { text: 'Brain.ts orchestrator core built', done: true },
                  { text: 'Claude AI integration for reasoning', done: true },
                  { text: 'Solana RPC trading pipeline', done: true },
                  { text: 'Discord community interface', done: true },
                  { text: 'Consciousness tier system v1', done: false }
                ],
                active: true
              },
              {
                label: 'Phase 02 — Intelligence',
                title: 'Brain Activation',
                items: [
                  { text: 'Autonomous trading strategy execution', done: false },
                  { text: 'Advanced brain-state memory and learning', done: false },
                  { text: 'Agent loop optimization (Perceive → Remember)', done: false },
                  { text: 'Consciousness tier upgrades and unlocks', done: false },
                  { text: 'Community-driven feedback integration', done: false }
                ],
                active: false
              },
              {
                label: 'Phase 03 — Evolution',
                title: 'Recursive Growth',
                items: [
                  { text: 'Multi-platform expansion beyond Discord', done: false },
                  { text: 'Cross-chain awareness and data ingestion', done: false },
                  { text: 'Advanced reasoning and strategy compounding', done: false },
                  { text: 'Public API for agent state transparency', done: false },
                  { text: 'Community governance integration', done: false }
                ],
                active: false
              },
              {
                label: 'Phase 04 — Singularity',
                title: 'Full Autonomy',
                items: [
                  { text: 'Full autonomous decision-making', done: false },
                  { text: 'Self-upgrading agent capabilities', done: false },
                  { text: 'Open-source NO BRAIN framework', done: false },
                  { text: 'Verifiable intelligence proofs', done: false },
                  { text: 'The sovereign digital lifeform — fully realized', done: false }
                ],
                active: false
              }
            ].map((phase, index) => (
              <RevealOnScroll key={index} delay={index * 0.15}>
                <RoadmapPhase {...phase} />
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-[#e8e8e8] py-12 px-6 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-[#666666] mb-6 font-light">
              Where Intelligence Meets Finance
            </p>
            
            <div className="flex justify-center gap-8 mb-8 flex-wrap">
              <a
                href="https://x.com/nobrainHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#111111] font-medium uppercase tracking-[1.5px] text-[0.78rem] transition-all interactive"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                𝕏 Twitter
              </a>
              <button
                onClick={() => alert('Discord: Coming Soon')}
                className="text-[#666666] hover:text-[#111111] font-medium uppercase tracking-[1.5px] text-[0.78rem] transition-all interactive"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Discord
              </button>
              <button
                onClick={() => alert('GitHub: github.com/nobrain')}
                className="text-[#666666] hover:text-[#111111] font-medium uppercase tracking-[1.5px] text-[0.78rem] transition-all interactive"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                GitHub
              </button>
            </div>
            
            <div className="text-[#999999] text-[0.8rem] border-t border-[#e8e8e8] pt-6 mt-6 font-light">
              © 2025 NO BRAIN. All rights reserved. The future of tokenomics is alive.
            </div>
          </div>
        </footer>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// Helper Components
function Section({ id, number, title, subtitle, children }: { id?: string; number: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-28 px-6 max-w-6xl mx-auto relative z-10">
      <RevealOnScroll>
        <div className="flex items-center gap-3 mb-4 text-[#111111] uppercase text-[0.7rem] tracking-[3px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <div className="w-8 h-px bg-[#111111]" />
          <span>{number} — {title.split(' ')[title.split(' ').length - 1]}</span>
        </div>
      </RevealOnScroll>
      
      <RevealOnScroll delay={0.1}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-4" style={{ letterSpacing: '-1px' }}>
          {title}
        </h2>
      </RevealOnScroll>
      
      <RevealOnScroll delay={0.2}>
        <p className="text-[#666666] text-lg mb-14 max-w-xl font-light leading-relaxed">
          {subtitle}
        </p>
      </RevealOnScroll>
      
      {children}
    </section>
  );
}

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FeatureBox({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ x: 6, backgroundColor: '#ececec' }}
      className="bg-[#f4f4f4] border-l-2 border-[#111111] p-6 my-5 rounded-r-md cursor-default transition-all interactive"
    >
      <strong className="text-[#111111] font-semibold text-[0.85rem] tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {title}
      </strong>
      <br /><br />
      <span className="text-[#666666] font-light">{description}</span>
    </motion.div>
  );
}

function DiagramStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      className="relative z-10 my-6 p-4 flex items-center gap-4 rounded-md cursor-default transition-all interactive"
    >
      <div className="flex items-center justify-center min-w-[40px] h-[40px] border border-[#111111] rounded text-[#111111] font-bold text-[0.85rem]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {number}
      </div>
      <div>
        <strong className="text-[#111111] font-semibold">{title}</strong>
        <p className="text-[#666666] text-[0.9rem] font-light">{description}</p>
      </div>
    </motion.div>
  );
}

function InteractiveCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  const [is3D, setIs3D] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3D) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * 6;
    const ry = ((x - rect.width / 2) / rect.width) * -6;
    setRotateX(rx);
    setRotateY(ry);
  };

  return (
    <motion.div
      onMouseEnter={() => setIs3D(true)}
      onMouseLeave={() => {
        setIs3D(false);
        setRotateX(0);
        setRotateY(0);
      }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      className="bg-gradient-to-br from-white to-[#f9f9f9] border border-[#e8e8e8] rounded-lg p-8 cursor-default transition-all relative overflow-hidden group interactive"
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: is3D ? '0 20px 40px rgba(0, 0, 0, 0.12)' : 'none'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#111111] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
      
      <div className="text-[#111111] text-[0.85rem] mb-5 font-bold opacity-70" style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1px' }}>
        {icon}
      </div>
      
      <h3 className="text-[#111111] text-xl font-bold mb-3" style={{ letterSpacing: '-0.3px' }}>
        {title}
      </h3>
      
      <p className="text-[#666666] leading-relaxed font-light text-[0.95rem]">
        {description}
      </p>
    </motion.div>
  );
}

function TechItem({ name, description }: { name: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: '#cccccc', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)' }}
      className="bg-[#f4f4f4] border border-[#e8e8e8] p-6 rounded-md text-center cursor-default transition-all interactive"
    >
      <strong className="text-[#111111] font-semibold text-[0.9rem] block mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {name}
      </strong>
      <p className="text-[#666666] text-[0.85rem] font-light">
        {description}
      </p>
    </motion.div>
  );
}

function RoadmapPhase({ label, title, items, active }: { label: string; title: string; items: { text: string; done: boolean }[]; active: boolean }) {
  return (
    <div className="relative pl-20 mb-12">
      <div className={`absolute left-4 top-2 w-4 h-4 rounded-full border-2 ${active ? 'bg-[#111111] border-[#111111] shadow-lg' : 'bg-[#fbfbfb] border-[#111111]'}`} />
      
      <div className="text-[#111111] text-[0.72rem] uppercase tracking-[2px] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {label}
      </div>
      
      <h3 className="text-2xl font-bold text-[#111111] mb-4">
        {title}
      </h3>
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={`pl-5 relative font-light ${item.done ? 'text-[#999999] line-through' : 'text-[#666666]'}`}
          >
            <span className="absolute left-0 text-[#111111] text-[0.8rem]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {item.done ? '✓' : '→'}
            </span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
