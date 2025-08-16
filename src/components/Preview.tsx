import React from 'react';
import { Eye } from 'lucide-react';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const renderPreview = (text: string) => {
    if (!text.trim()) {
      return (
        <div className="text-[#8A8A8A] italic text-center py-8">
          Your content preview will appear here...
        </div>
      );
    }

    // Split by double newlines to create paragraphs
    const paragraphs = text.split(/\n\s*\n/);
    
    return paragraphs.map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      // Check if it's a list (lines starting with -, *, or numbers)
      const lines = trimmed.split('\n');
      const isListItem = (line: string) => /^\s*[-*]\s/.test(line) || /^\s*\d+\.\s/.test(line);
      
      if (lines.length > 1 && lines.some(isListItem)) {
        // Render as list
        const listItems = lines
          .filter(line => isListItem(line))
          .map((line, i) => (
            <li key={i} className="mb-1">
              {line.replace(/^\s*[-*]\s/, '').replace(/^\s*\d+\.\s/, '')}
            </li>
          ));
        
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-1 text-[#E0E0E0] leading-relaxed">
            {listItems}
          </ul>
        );
      } else {
        // Render as paragraph
        return (
          <p key={index} className="mb-4 text-[#E0E0E0] leading-relaxed">
            {trimmed}
          </p>
        );
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="h-5 w-5 text-[#00E5FF]" />
        <label className="block text-sm font-semibold text-[#E0E0E0]">
          Content Preview
        </label>
      </div>
      
      <div className="bg-[#0D0D0D]/60 border border-white/10 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
        <div className="prose prose-invert max-w-none">
          {renderPreview(content)}
        </div>
      </div>
      
      <p className="text-xs text-[#8A8A8A]">
        This is a simplified preview. The actual PDF may have different formatting.
      </p>
    </div>
  );
};

export default Preview;