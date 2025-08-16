import React from 'react';
import { FileText } from 'lucide-react';

interface OptionsPanelProps {
  title: string;
  onTitleChange: (title: string) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  title,
  onTitleChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-[#00E5FF]" />
        <label className="block text-sm font-semibold text-[#E0E0E0]">
          Document Title
        </label>
      </div>
      
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="pdf-title" className="block text-sm font-medium text-[#E0E0E0]">
          Document Title (Optional)
        </label>
        <input
          id="pdf-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter document title..."
          className="w-full px-3 py-2 bg-[#0D0D0D]/80 border border-white/10 rounded-lg text-[#E0E0E0] placeholder-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all duration-200"
        />
        <p className="text-xs text-[#8A8A8A]">Optional title for your document</p>
      </div>
    </div>
  );
};

export default OptionsPanel;