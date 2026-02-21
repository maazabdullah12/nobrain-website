import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name && formData.email && formData.interest) {
      toast.success('Request submitted!', {
        description: `Welcome to the revolution, ${formData.name}. You'll receive the NO BRAIN whitepaper shortly.`
      });
      setFormData({ name: '', email: '', interest: '' });
      onClose();
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[1001] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#f4f4f4] border border-[#e8e8e8] rounded-lg p-10 w-full max-w-[520px] shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#111111] mb-2" style={{ letterSpacing: '-0.5px' }}>
                    NO BRAIN Whitepaper
                  </h2>
                  <p className="text-[#666666] text-[0.95rem] font-light">
                    Get early access to the NO BRAIN whitepaper and join the autonomous intelligence revolution.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#666666] hover:text-[#111111] transition-colors ml-4"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#fbfbfb] border border-[#e8e8e8] rounded text-[#111111] text-[0.95rem] focus:outline-none focus:border-[#111111] focus:shadow-lg transition-all"
                />
                
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#fbfbfb] border border-[#e8e8e8] rounded text-[#111111] text-[0.95rem] focus:outline-none focus:border-[#111111] focus:shadow-lg transition-all"
                />
                
                <textarea
                  placeholder="Why are you interested in NO BRAIN?"
                  value={formData.interest}
                  onChange={e => setFormData({ ...formData, interest: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#fbfbfb] border border-[#e8e8e8] rounded text-[#111111] text-[0.95rem] focus:outline-none focus:border-[#111111] focus:shadow-lg transition-all resize-vertical min-h-[80px]"
                />
                
                <button
                  type="submit"
                  className="w-full bg-[#111111] text-[#fbfbfb] py-3 rounded font-bold uppercase tracking-[1.5px] text-[0.85rem] hover:shadow-2xl hover:-translate-y-0.5 transition-all mt-2"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Request Access
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
