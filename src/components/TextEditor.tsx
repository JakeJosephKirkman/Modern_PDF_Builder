import React from 'react';
import { Bold, Italic, Type } from 'lucide-react';
import { FormattingOptions } from '../types';

interface TextEditorProps {
  text: string;
  onTextChange: (text: string) => void;
  formatting: FormattingOptions;
  onFormattingChange: (formatting: FormattingOptions) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  text,
  onTextChange,
  formatting,
  onFormattingChange,
}) => {
  const handleFormatToggle = (format: keyof FormattingOptions, value?: any) => {
    if (format === 'heading') {
      onFormattingChange({
        ...formatting,
        heading: value || 'none',
      });
    } else {
      onFormattingChange({
        ...formatting,
        [format]: !formatting[format],
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-[#E0E0E0]">
          Content
        </label>
        
        <div className="flex items-center space-x-2">
          <div className="flex border border-[#00E5FF]/30 rounded-md overflow-hidden bg-[#1A1A1A]/80 shadow-[0_0_10px_rgba(0,229,255,0.1)]">
            <button
              type="button"
              onClick={() => handleFormatToggle('bold')}
              className={`p-2 hover:bg-[#00E5FF]/20 transition-colors duration-150 ${
                formatting.bold ? 'bg-[#00E5FF] text-[#0D0D0D] shadow-[0_0_10px_rgba(0,229,255,0.5)]' : 'text-[#E0E0E0]'
              }`}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            
            <button
              type="button"
              onClick={() => handleFormatToggle('italic')}
              className={`p-2 hover:bg-[#00E5FF]/20 transition-colors duration-150 border-l border-[#00E5FF]/30 ${
                formatting.italic ? 'bg-[#00E5FF] text-[#0D0D0D] shadow-[0_0_10px_rgba(0,229,255,0.5)]' : 'text-[#E0E0E0]'
              }`}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
          </div>
          
          <select
            value={formatting.heading}
            onChange={(e) => handleFormatToggle('heading', e.target.value)}
            className="px-3 py-2 border border-[#00E5FF]/30 rounded-md text-sm focus:ring-2 focus:ring-[#00E5FF] focus:border-[#00E5FF] transition-colors duration-150 bg-[#1A1A1A]/80 text-[#E0E0E0] shadow-[0_0_10px_rgba(0,229,255,0.1)]"
          >
            <option value="none">Normal Text</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Start typing your content here... You can format text using the controls above and add images below."
          className="w-full h-64 p-4 border border-[#00E5FF]/30 rounded-lg resize-none focus:ring-2 focus:ring-[#00E5FF] focus:border-[#00E5FF] transition-all duration-300 bg-[#0D0D0D]/80 text-[#E0E0E0] leading-relaxed placeholder-[#8A8A8A] shadow-[0_0_15px_rgba(0,229,255,0.1)] focus:shadow-[0_0_25px_rgba(0,229,255,0.2)]"
          style={{
            fontWeight: formatting.bold ? 'bold' : 'normal',
            fontStyle: formatting.italic ? 'italic' : 'normal',
            fontSize: formatting.heading === 'h1' ? '1.5rem' :
                      formatting.heading === 'h2' ? '1.25rem' :
                      formatting.heading === 'h3' ? '1.125rem' : '1rem',
          }}
        />
        
      </div>
      
      <div className="text-right text-sm text-[#8A8A8A]">
        {text.length} characters
      </div>
    </div>
  );
};

export default TextEditor;