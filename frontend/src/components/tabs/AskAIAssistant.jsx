import React, { useState, useEffect, useRef } from 'react'
import { Send, Loader, AlertCircle } from 'lucide-react'

const AskAIAssistant = ({ fileName }) => {
    const [question, setQuestion] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (!fileName) {
            setError('Please upload a file first in the Upload tab')
        } else {
            setError('')
        }
    }, [fileName])

    const handleAskQuestion = async (e) => {
        e.preventDefault()
        
        if (!fileName) {
            setError('Please upload a file first in the Upload tab')
            return
        }

        if (!question.trim()) {
            return
        }

        const userMessage = question
        setQuestion('')
        setMessages(prev => [...prev, { type: 'user', content: userMessage }])
        setLoading(true)
        setError('')

        try {
            const payload = { filename: fileName, question: userMessage }

            const response = await fetch('http://127.0.0.1:5170/api/ask_ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Failed to get answer')
                setMessages(prev => [...prev, { 
                    type: 'assistant', 
                    content: `Error: ${data.error || 'Failed to get answer'}` 
                }])
            } else {
                setMessages(prev => [...prev, { type: 'assistant', content: data.answer }])
            }
        } catch (err) {
            setError('Error connecting to the server. Please try again.')
            setMessages(prev => [...prev, { 
                type: 'assistant', 
                content: 'Error connecting to the server. Please try again.' 
            }])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleAskQuestion(e)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col">
            <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200 p-6">
                    <h1 className="text-3xl font-bold text-gray-900">Ask AI Assistant</h1>
                    <p className="text-gray-600 mt-1">Chat about your data</p>
                    
                    {/* File Status */}
                    {fileName ? (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg inline-block">
                            <p className="text-sm text-green-700">
                                ✓ File loaded: <strong>{fileName}</strong>
                            </p>
                        </div>
                    ) : (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2 max-w-md">
                            <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-yellow-900">No file uploaded</p>
                                <p className="text-sm text-yellow-700">Please upload a file in the Upload tab first</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto max-h-screen p-6 space-y-4 bg-gradient-to-br from-green-50 to-emerald-50">
                    {messages.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center text-gray-400">
                                <p className="text-lg">No messages yet</p>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg ${
                                    msg.type === 'user'
                                        ? 'bg-green-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-900 shadow-md rounded-bl-none'
                                }`}
                            >
                                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                                    {msg.content}
                                </p>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white text-gray-900 shadow-md px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                                <Loader size={18} className="animate-spin text-green-600" />
                                <span className="text-sm">Thinking...</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex justify-center">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm max-w-md">
                                {error}
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Section */}
                <div className="bg-white border-t-4 border-green-600 p-6">
                    <form onSubmit={handleAskQuestion} className="flex gap-3">
                        

                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={fileName ? "Ask a question about your data..." : "Upload a file first..."}
                            disabled={loading || !fileName}
                            className="flex-1 px-4 py-3 border-2 border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600 resize-none max-h-32"
                            rows="2"
                        />
                        <button
                            type="submit"
                            disabled={loading || !fileName || !question.trim()}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg px-4 py-3 flex items-center justify-center transition-colors flex-shrink-0"
                        >
                            {loading ? (
                                <Loader size={20} className="animate-spin" />
                            ) : (
                                <Send size={20} />
                            )}
                        </button>
                    </form>
                    <p className="text-xs text-green-700 mt-2">Press Shift+Enter for new line, Enter to send</p>
                    <p className="text-xs text-red-700 mt-2 font-bold">Warning: Switching to another tab (e.g., Plot Graph) will clear your chat history.</p>
                </div>
            </div>
        </div>
    )
}

export default AskAIAssistant