import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader, AlertCircle, Bot, User, Sparkles } from 'lucide-react';

const AskAIAssistant = ({ fileName }) => {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!fileName) {
            setError('Please upload a file first in the Upload tab');
        } else {
            setError('');
        }
    }, [fileName]);

    const handleAskQuestion = async (e) => {
        e.preventDefault();

        if (!fileName) {
            setError('Please upload a file first in the Upload tab');
            return;
        }

        if (!question.trim()) {
            return;
        }

        const userMessage = question;
        setQuestion('');
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setLoading(true);
        setError('');

        try {
            const payload = { filename: fileName, question: userMessage };

            const response = await fetch('http://127.0.0.1:5170/api/ask_ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMsg = data.error || 'Failed to get answer';
                setError(errorMsg);
                setMessages(prev => [...prev, {
                    type: 'assistant',
                    content: `Error: ${errorMsg}`
                }]);
            } else {
                setMessages(prev => [...prev, { type: 'assistant', content: data.answer }]);
            }
        } catch (err) {
            setError('Error connecting to the server. Please try again.');
            setMessages(prev => [...prev, {
                type: 'assistant',
                content: 'Error connecting to the server. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAskQuestion(e);
        }
    };

    return (
        <div className="flex flex-col h-[600px] max-h-[80vh]">
            
            {/* --- HEADER SECTION --- */}
            <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="text-emerald-400 w-6 h-6" />
                        Ask AI Assistant
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Chat naturally with your spreadsheet data</p>
                </div>

                {/* File Status Badge */}
                {fileName ? (
                    <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-medium text-emerald-300">
                            Reading: {fileName}
                        </span>
                    </div>
                ) : (
                    <div className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center gap-2">
                        <AlertCircle size={14} className="text-yellow-500" />
                        <span className="text-xs font-medium text-yellow-500">No File</span>
                    </div>
                )}
            </div>

            {/* --- CHAT HISTORY AREA --- */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/20">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                        <Bot size={48} className="text-emerald-500 mb-4" />
                        <p className="text-lg text-white font-medium">No messages yet</p>
                        <p className="text-sm text-gray-400">Ask a question to start analyzing your data.</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {/* Avatar (Left for AI) */}
                        {msg.type === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/5">
                                <Bot size={16} className="text-emerald-400" />
                            </div>
                        )}

                        {/* Message Bubble */}
                        <div
                            className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
                                msg.type === 'user'
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none border border-emerald-500/30'
                                    : 'bg-white/5 text-gray-200 rounded-bl-none border border-white/10'
                            }`}
                        >
                            <p className="whitespace-pre-wrap break-words">
                                {msg.content}
                            </p>
                        </div>

                        {/* Avatar (Right for User) */}
                        {msg.type === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                                <User size={16} className="text-emerald-400" />
                            </div>
                        )}
                    </div>
                ))}

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex justify-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/5">
                            <Bot size={16} className="text-emerald-400" />
                        </div>
                        <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-3">
                            <Loader size={16} className="animate-spin text-emerald-400" />
                            <span className="text-gray-400 text-xs animate-pulse">Thinking...</span>
                        </div>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="flex justify-center mt-4">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-red-400 text-xs flex items-center gap-2">
                            <AlertCircle size={14} />
                            {error}
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* --- INPUT AREA --- */}
            <div className="p-6 bg-white/5 border-t border-white/10 backdrop-blur-md">
                <form onSubmit={handleAskQuestion} className="flex gap-4 items-end">
                    <div className="relative flex-1">
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={fileName ? "Ask about trends, summaries, or specific rows..." : "Upload a file first..."}
                            disabled={loading || !fileName}
                            className="w-full bg-black/40 text-white placeholder-gray-500 px-4 py-3 rounded-xl border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none resize-none min-h-[50px] max-h-32 transition-all custom-scrollbar disabled:opacity-50 disabled:cursor-not-allowed"
                            rows="1"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading || !fileName || !question.trim()}
                        className="h-[50px] w-[50px] bg-emerald-600 hover:bg-emerald-500 disabled:bg-white/10 disabled:text-gray-500 text-white rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-95"
                    >
                        {loading ? (
                            <Loader size={20} className="animate-spin" />
                        ) : (
                            <Send size={20} className={!fileName || !question.trim() ? 'opacity-50' : 'opacity-100'} />
                        )}
                    </button>
                </form>

                <div className="flex justify-between items-center mt-3 px-1">
                    <p className="text-[10px] text-gray-500">
                        Press <span className="text-emerald-400">Shift + Enter</span> for new line
                    </p>
                    <p className="text-[10px] text-red-400/60 font-medium">
                        Note: History clears on tab switch
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AskAIAssistant;