import React, { useState } from 'react';
import { Copy, Loader, Sparkles, ChevronRight, Zap } from 'lucide-react';

const FormulaGenerator = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateFormula = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5170/api/formula', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
        }),
      });

      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      setResponse('Error generating formula');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full min-h-[250px] p-8">

      {/* Header Section */}
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <Zap className="text-emerald-400 w-6 h-6" fill="currentColor" fillOpacity={0.2} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Formula Generator</h2>
          <p className="text-gray-400 text-sm">Transform plain English into complex Excel formulas instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">

        {/* --- LEFT: Input Section --- */}
        <div className="flex flex-col h-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col shadow-lg backdrop-blur-sm">
            <label className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 block">
              Describe your calculation
            </label>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Sum column A if column B says 'Paid' and date is after Jan 1st 2024..."
              className="w-full flex-1 bg-black/40 text-white p-4 rounded-xl border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none resize-none placeholder-gray-600 custom-scrollbar text-base leading-relaxed mb-6 transition-all"
            />

            <button
              onClick={handleGenerateFormula}
              disabled={loading || !input}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:cursor-pointer
                ${loading || !input
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5'
                }
              `}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span className="tracking-wide">Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span className="tracking-wide">Generate Formula</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- RIGHT: Output Section --- */}
        <div className="flex flex-col h-full">
          <div className="bg-black/20 border border-white/10 rounded-2xl p-6 h-full flex flex-col shadow-inner relative overflow-hidden">

            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              Generated Result
              {response && <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] rounded uppercase tracking-wider">Success</span>}
            </h3>

            {response ? (
              <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Code Block */}
                <div className="relative group bg-[#0F1110] border border-white/10 rounded-xl p-5 mb-4 shadow-lg overflow-hidden">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={handleCopy}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-colors hover:cursor-pointer"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  <p className="font-mono text-emerald-400 text-lg break-all leading-relaxed">
                    {response}
                  </p>
                </div>

                <button
                  onClick={handleCopy}
                  className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all duration-300 mb-6 hover:cursor-pointer
                    ${copied
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Copy size={18} />
                  {copied ? 'Copied to Clipboard!' : 'Copy Formula'}
                </button>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
                  <Sparkles className="w-8 h-8 text-emerald-500" />
                </div>
                <p className="text-white font-medium mb-1">Ready to Generate</p>
                <p className="text-sm text-gray-400 max-w-xs">
                  Your generated formula will appear here instantly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaGenerator;