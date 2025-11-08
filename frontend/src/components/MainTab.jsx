import React, { useState } from 'react';
import { Zap, MessageSquare, BarChart3, X } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto mt-8 border-2 border-gray-200 round-md">

      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Uploaded file:</p>
            <p className="text-lg font-semibold text-gray-900">{fileName}</p>
          </div>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={20} />
            Delete
          </button>
        </div>
      </div>


      {/* Tab Buttons */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 ${activeTab === tab.id
                  ? 'text-green-600 border-green-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:cursor-pointer'
                }`}
            >
              <IconComponent size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        {ActiveComponent && <ActiveComponent fileName={fileName}  />}
      </div>
    </div>
  );
};

export default TalkAI;