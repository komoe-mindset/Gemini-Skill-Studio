import React from 'react';

interface ToastProps {
  message: string;
  icon: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, icon, visible }) => {
  return (
    <div
      className={`fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto z-50 transition-all duration-300 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      } flex items-center justify-center`}
    >
      <div className="bg-slate-900 border border-cyan-500/80 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-cyan-950/60 flex items-center gap-3 text-xs sm:text-sm font-medium backdrop-blur-md">
        <span className="text-lg">{icon}</span>
        <span className="text-slate-100">{message}</span>
      </div>
    </div>
  );
};
