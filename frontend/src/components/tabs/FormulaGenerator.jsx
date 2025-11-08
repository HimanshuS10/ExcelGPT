import React, { useState } from 'react';
import { Copy, Loader } from 'lucide-react';

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
    <div className="min-h-full bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
        {/* Left Side - Input */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Formula Generator</h2>
          <p className="text-gray-600 text-sm mb-6">Describe what you want to calculate:</p>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., Sum all values in column A where column B contains 'Active'"
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg mb-6 focus:outline-none focus:border-green-500 resize-none"
          />
          
          <button
            onClick={handleGenerateFormula}
            disabled={loading || !input}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              loading || !input
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                ✎ Generate Formula
              </>
            )}
          </button>
        </div>

        {/* Right Side - Output */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Formula</h2>
          
          {response ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Formula:</p>
                <p className="text-lg font-mono font-semibold text-gray-900 break-words">
                  {response}
                </p>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors hover:cursor-pointer"
              >
                <Copy size={18} />
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  💡 <strong>Tip:</strong> This formula uses the columns in your data. Make sure the column references match your spreadsheet.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p>Enter a description and click "Generate Formula" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaGenerator;