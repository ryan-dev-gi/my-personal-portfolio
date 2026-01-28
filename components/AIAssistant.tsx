
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/gemini';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I'm the AI Digital Twin of Ryan Cerda. Ask me anything about my experience, projects, or technical expertise.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiHistory = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const aiResponse = await sendMessageToAI(inputValue, apiHistory);
      
      const modelMessage: Message = {
        role: 'model',
        text: aiResponse || "I'm sorry, I couldn't process that. Can you try again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Error connecting to my neural network. Please check your connection.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-twin" className="py-20 lg:py-24 bg-gray-950/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 lg:mb-12">
            <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[9px] lg:text-[10px] mb-4 block">Neural Ryan</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">Interactive <span className="text-indigo-500 italic">Twin</span></h2>
            <p className="text-gray-400 text-sm lg:text-base">Ask contextual questions about my career, tech stack, or creative process.</p>
          </div>

          <div className="glass-card rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[550px] lg:h-[650px] border border-white/10">
            {/* Header */}
            <div className="p-4 lg:p-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <i className="fas fa-microchip animate-pulse"></i>
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight text-sm lg:text-base">RYAN.AI v2.1</h3>
                  <span className="text-[8px] lg:text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-green-500 animate-ping"></span>
                    Synchronized
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setMessages([messages[0]])}
                className="text-gray-500 hover:text-white transition-colors p-2"
                title="Reset Conversation"
              >
                <i className="fas fa-undo-alt"></i>
              </button>
            </div>

            {/* Chat History */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-5 lg:space-y-6 scroll-smooth">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[90%] lg:max-w-[85%] p-4 lg:p-5 rounded-2xl lg:rounded-[1.5rem] shadow-xl ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white/5 text-gray-100 rounded-tl-none border border-white/10'
                  }`}>
                    <p className="text-xs lg:text-sm leading-relaxed font-medium">{msg.text}</p>
                    <span className="text-[8px] lg:text-[9px] mt-3 block opacity-40 font-bold uppercase tracking-widest">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                      <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 lg:p-6 bg-black/40 border-t border-white/5 backdrop-blur-xl">
              <div className="flex gap-2 lg:gap-3 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/5 border border-white/5 rounded-xl lg:rounded-2xl px-5 py-3 lg:py-4 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white transition-all placeholder:text-gray-600 font-medium"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-600 hover:bg-indigo-500 rounded-xl lg:rounded-2xl flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:grayscale shadow-xl shadow-indigo-500/20 active:scale-95"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
