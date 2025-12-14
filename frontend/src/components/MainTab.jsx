import React, { useState } from 'react';
import { Zap, MessageSquare, BarChart3, X, FileSpreadsheet, ChevronRight } from 'lucide-react';
import AskAIAssistant from './tabs/AskAIAssistant';
import FormulaGenerator from './tabs/FormulaGenerator';
import PlotGraph from './tabs/PlotGraph';

const TalkAI = ({ fileName, onDelete }) => {
  const [activeTab, setActiveTab] = useState('formula');

  const tabs = [
    { id: 'formula', label: 'Formula Generator', icon: Zap, component: FormulaGenerator },
    { id: 'ask', label: 'Ask AI Assistant', icon: MessageSquare, component: AskAIAssistant },
    { id: 'graph', label: 'Plot Graph', icon: BarChart3, component: PlotGraph },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <div className="min-h-screen bg-[#030504] text-white p-6 relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND EFFECTS (Matches Dashboard) --- */}
      {/* Top Center Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,83,45,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,83,45,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />


      {/* --- MAIN CONTAINER --- */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* 1. FILE HEADER CARD */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4">
            {/* File Icon Box */}
            <div className="p-3 rounded-xl">
              <FileSpreadsheet className="w-10 h-10 text-emerald-400" />
            </div>
            
            <div>
              <p className="text-emerald-500/60 text-xs font-mono tracking-wider uppercase mb-1">Active Workspace</p>
              <h2 className="text-lg font-press md:text-lg font-semibold text-white tracking-tight">{fileName}</h2>
            </div>
          </div>

          <button
            onClick={onDelete}
            className="group flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-all duration-300 hover:cursor-pointer hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-medium">Close File</span>
          </button>
        </div>


        {/* 2. TABS & CONTENT WRAPPER */}
        <div className="flex flex-col gap-6">
          
          {/* Custom Tab Switcher */}
          <div className="flex flex-wrap gap-2 p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm w-fit">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:cursor-pointer
                    ${isActive 
                      ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <IconComponent size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 3. ACTIVE COMPONENT AREA */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 min-h-[500px] shadow-2xl relative overflow-hidden">
             {/* Subtle internal gradient for depth */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />
            
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               {ActiveComponent && <ActiveComponent fileName={fileName} />}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TalkAI;