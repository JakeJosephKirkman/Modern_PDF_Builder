import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

const ConfigBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6 mb-6">
      <div className="flex items-start gap-4">
        <AlertTriangle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">
            Configuration Required
          </h3>
          <p className="text-[#E0E0E0] mb-4 leading-relaxed">
            To use the AI PDF Generator, you need to configure your n8n webhook URL. 
            Follow these steps:
          </p>
          
          <div className="space-y-3 text-sm">
            <div className="bg-[#0D0D0D]/60 rounded-lg p-4 border border-white/10">
              <p className="text-[#00E5FF] font-medium mb-2">1. Create environment file:</p>
              <code className="block bg-[#0D0D0D] p-2 rounded text-[#00FF85] text-xs font-mono">
                cp .env.example .env
              </code>
            </div>
            
            <div className="bg-[#0D0D0D]/60 rounded-lg p-4 border border-white/10">
              <p className="text-[#00E5FF] font-medium mb-2">2. Set your n8n webhook URL:</p>
              <code className="block bg-[#0D0D0D] p-2 rounded text-[#00FF85] text-xs font-mono">
                VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/generate-pdf
              </code>
            </div>
            
            <div className="bg-[#0D0D0D]/60 rounded-lg p-4 border border-white/10">
              <p className="text-[#00E5FF] font-medium mb-2">3. Optional - Add authentication token:</p>
              <code className="block bg-[#0D0D0D] p-2 rounded text-[#00FF85] text-xs font-mono">
                VITE_PDF_TOKEN=your-optional-token
              </code>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>CORS Note:</strong> If you encounter CORS errors, make sure to add your site's origin 
              in the n8n Webhook node settings under "Allowed Origins\" and enable POST/OPTIONS methods.
            </p>
          </div>
          
          <div className="mt-4">
            <a
              href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#00E5FF] hover:text-[#00FF85] transition-colors text-sm"
            >
              Learn more about n8n webhooks
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigBanner;