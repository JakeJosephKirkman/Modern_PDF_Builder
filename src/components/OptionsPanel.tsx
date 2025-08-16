import React from 'react';
import { Settings } from 'lucide-react';
import { PDFOptions } from '../types';

interface OptionsPanelProps {
  options: PDFOptions;
  onOptionsChange: (options: PDFOptions) => void;
  title: string;
  onTitleChange: (title: string) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  options,
  onOptionsChange,
  title,
  onTitleChange,
}) => {
  const handleOptionChange = (key: keyof PDFOptions, value: any) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  const handleMarginChange = (side: keyof PDFOptions['margins'], value: string) => {
    onOptionsChange({
      ...options,
      margins: {
        ...options.margins,
        [side]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-[#00E5FF]" />
        <label className="block text-sm font-semibold text-[#E0E0E0]">
          PDF Options
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
        <p className="text-xs text-[#8A8A8A]">Used as filename when downloading</p>
      </div>

      {/* Page Size */}
      <div className="space-y-2">
        <label htmlFor="page-size" className="block text-sm font-medium text-[#E0E0E0]">
          Page Size
        </label>
        <select
          id="page-size"
          value={options.pageSize}
          onChange={(e) => handleOptionChange('pageSize', e.target.value as PDFOptions['pageSize'])}
          className="w-full px-3 py-2 bg-[#0D0D0D]/80 border border-white/10 rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all duration-200"
        >
          <option value="A4">A4 (210 × 297 mm)</option>
          <option value="Letter">Letter (8.5 × 11 in)</option>
          <option value="Legal">Legal (8.5 × 14 in)</option>
        </select>
      </div>

      {/* Orientation */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E0E0E0]">
          Orientation
        </label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="orientation"
              value="portrait"
              checked={options.orientation === 'portrait'}
              onChange={(e) => handleOptionChange('orientation', e.target.value)}
              className="w-4 h-4 text-[#00E5FF] bg-[#0D0D0D] border-white/20 focus:ring-[#00E5FF]/50 focus:ring-2"
            />
            <span className="text-sm text-[#E0E0E0]">Portrait</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="orientation"
              value="landscape"
              checked={options.orientation === 'landscape'}
              onChange={(e) => handleOptionChange('orientation', e.target.value)}
              className="w-4 h-4 text-[#00E5FF] bg-[#0D0D0D] border-white/20 focus:ring-[#00E5FF]/50 focus:ring-2"
            />
            <span className="text-sm text-[#E0E0E0]">Landscape</span>
          </label>
        </div>
      </div>

      {/* Margins */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#E0E0E0]">
          Margins (mm)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="margin-top" className="block text-xs text-[#8A8A8A] mb-1">
              Top
            </label>
            <input
              id="margin-top"
              type="number"
              min="0"
              max="50"
              value={parseInt(options.margins.top)}
              onChange={(e) => handleMarginChange('top', `${e.target.value}mm`)}
              className="w-full px-2 py-1 bg-[#0D0D0D]/80 border border-white/10 rounded text-[#E0E0E0] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="margin-right" className="block text-xs text-[#8A8A8A] mb-1">
              Right
            </label>
            <input
              id="margin-right"
              type="number"
              min="0"
              max="50"
              value={parseInt(options.margins.right)}
              onChange={(e) => handleMarginChange('right', `${e.target.value}mm`)}
              className="w-full px-2 py-1 bg-[#0D0D0D]/80 border border-white/10 rounded text-[#E0E0E0] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="margin-bottom" className="block text-xs text-[#8A8A8A] mb-1">
              Bottom
            </label>
            <input
              id="margin-bottom"
              type="number"
              min="0"
              max="50"
              value={parseInt(options.margins.bottom)}
              onChange={(e) => handleMarginChange('bottom', `${e.target.value}mm`)}
              className="w-full px-2 py-1 bg-[#0D0D0D]/80 border border-white/10 rounded text-[#E0E0E0] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="margin-left" className="block text-xs text-[#8A8A8A] mb-1">
              Left
            </label>
            <input
              id="margin-left"
              type="number"
              min="0"
              max="50"
              value={parseInt(options.margins.left)}
              onChange={(e) => handleMarginChange('left', `${e.target.value}mm`)}
              className="w-full px-2 py-1 bg-[#0D0D0D]/80 border border-white/10 rounded text-[#E0E0E0] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsPanel;