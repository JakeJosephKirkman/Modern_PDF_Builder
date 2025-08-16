import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-[#8A8A8A] border-t-[#00E5FF] rounded-full animate-spin shadow-[0_0_15px_rgba(0,229,255,0.5)]"></div>
        <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-[#FF00A0] rounded-full animate-spin animation-delay-150 shadow-[0_0_15px_rgba(255,0,160,0.3)]"></div>
      </div>
      <span className="ml-3 text-[#E0E0E0] font-medium">Generating PDF...</span>
    </div>
  );
};

export default LoadingSpinner;