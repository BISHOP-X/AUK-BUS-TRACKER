import { X, Code } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal = ({ onClose }: WelcomeModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md m-4 p-8 text-center transform animate-scale-in">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:scale-110 transition-all"
          aria-label="Close welcome screen"
        >
          <X className="w-7 h-7" />
        </button>
        
        <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-slate-100 rounded-full">
          <Code className="w-16 h-16 text-slate-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
        <p className="text-md text-gray-500 mb-6">to the AUK Bus Tracker App</p>
        
        <div className="my-6 h-px w-full bg-gray-200"></div>

        <p className="text-gray-500 text-sm">Lead Programmer</p>
        <p className="text-xl font-medium text-gray-800 tracking-wide mt-1">abdulkarim kabir kofa</p>
      </div>
    </div>
  );
}; 