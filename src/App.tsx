import React, { useState, useCallback } from 'react';
import { FileText, Zap, Loader2 } from 'lucide-react';
import { AppState, PDFPayload } from './types';
import { generatePDF } from './utils/pdfGenerator';
import ImagePicker from './components/ImagePicker';
import OptionsPanel from './components/OptionsPanel';

function App() {
  const [state, setState] = useState<AppState>({
    description: '',
    images: [],
    title: '',
    isGenerating: false,
    error: null,
    success: null,
  });

  // Validation
  const isDescriptionValid = state.description.length >= 20 && state.description.length <= 10000;
  const canGenerate = isDescriptionValid && !state.isGenerating;

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const clearMessages = useCallback(() => {
    updateState({ error: null, success: null });
  }, [updateState]);

  const handleDescriptionChange = useCallback((description: string) => {
    clearMessages();
    updateState({ description });
  }, [updateState, clearMessages]);

  const handleImagesChange = useCallback((images: string[]) => {
    clearMessages();
    updateState({ images });
  }, [updateState, clearMessages]);

  const handleTitleChange = useCallback((title: string) => {
    clearMessages();
    updateState({ title });
  }, [updateState, clearMessages]);

  const handleGeneratePDF = useCallback(async () => {
    if (!canGenerate) return;

    updateState({ isGenerating: true, error: null, success: null });

    const payload: PDFPayload = {
      content: state.description,
      images: state.images,
      title: state.title || undefined,
    };

    try {
      const pdfBlob = await generatePDF(payload);
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${state.title || 'document'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      updateState({ 
        isGenerating: false, 
        success: `PDF ready! Downloaded as "${state.title || 'document'}.pdf"` 
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        updateState({ success: null });
      }, 5000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      let displayError = `Couldn't generate the PDF. ${errorMessage}`;
      
      if (errorMessage.includes('HTTP')) {
        displayError += '\n\nCheck your n8n webhook URL, HTTPS, and CORS settings.';
      }
      
      updateState({ 
        isGenerating: false, 
        error: displayError 
      });
    }
  }, [canGenerate, state, updateState]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E0E0E0]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#151515]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="relative">
                <FileText className="h-10 w-10 text-[#00E5FF]" />
                <Zap className="h-5 w-5 text-[#00FF85] absolute -top-1 -right-1" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#FF00A0] bg-clip-text text-transparent">
                AI PDF Generator
              </h1>
            </div>
            <p className="text-lg text-[#8A8A8A] font-light">
              Describe it. We'll craft the PDF.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        <div aria-live="polite" className="mb-6">
          {state.success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400">
              {state.success}
            </div>
          )}
          
          {state.error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 whitespace-pre-line">
              {state.error}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Description */}
          <div className="lg:col-span-1">
            <div className="bg-[#151515]/80 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-white/5 p-6">
              <div className="space-y-4">
                <label htmlFor="description" className="block text-sm font-semibold text-[#E0E0E0]">
                  What should the PDF contain?
                </label>
                
                <div className="relative">
                  <textarea
                    id="description"
                    value={state.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Describe the content you want in your PDF. Be specific about structure, topics, and any special requirements..."
                    className="w-full h-64 px-4 py-3 bg-[#0D0D0D]/80 border border-white/10 rounded-xl text-[#E0E0E0] placeholder-[#8A8A8A] resize-none focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all duration-200"
                    disabled={state.isGenerating}
                    aria-describedby="description-help description-count"
                  />
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div id="description-help" className={`${
                    isDescriptionValid ? 'text-green-400' : 'text-[#8A8A8A]'
                  }`}>
                    {state.description.length < 20 
                      ? `${20 - state.description.length} more characters needed`
                      : 'Description looks good!'
                    }
                  </div>
                  <div id="description-count" className={`${
                    state.description.length > 9000 ? 'text-orange-400' : 'text-[#8A8A8A]'
                  }`}>
                    {state.description.length.toLocaleString()} / 10,000
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images & Options */}
          <div className="lg:col-span-1 space-y-8">
            {/* Images */}
            <div className="bg-[#151515]/80 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-white/5 p-6">
              <ImagePicker
                images={state.images}
                onImagesChange={handleImagesChange}
              />
            </div>

            {/* Options */}
            <div className="bg-[#151515]/80 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-white/5 p-6">
              <OptionsPanel
                title={state.title}
                onTitleChange={handleTitleChange}
              />
            </div>
          </div>
        </div>

        {/* Generate Button - Sticky on Mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0D0D0D]/95 backdrop-blur-sm border-t border-white/10 lg:relative lg:bg-transparent lg:border-t-0 lg:p-0 lg:mt-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleGeneratePDF}
              disabled={!canGenerate}
              className={`w-full lg:w-auto lg:mx-auto lg:block px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                canGenerate
                  ? 'bg-[#00FF85] hover:bg-[#00FF85]/90 hover:scale-105 text-[#0D0D0D] shadow-lg shadow-[#00FF85]/25'
                  : 'bg-[#8A8A8A]/30 text-[#8A8A8A] cursor-not-allowed'
              }`}
              aria-describedby="generate-help"
            >
              {state.isGenerating ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Assembling your PDF…
                </span>
              ) : (
                'Generate PDF'
              )}
            </button>
            
            {!canGenerate && !state.isGenerating && (
              <p id="generate-help" className="text-center text-sm text-[#8A8A8A] mt-2">
                {!isDescriptionValid 
                    ? 'Add a description (20-10,000 characters)'
                    : 'Ready to generate'
                }
              </p>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;