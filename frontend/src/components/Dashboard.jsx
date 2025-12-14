import React from "react";
import Uploader from "./Uploader";
import { CircleSmall } from "lucide-react";

const Dashboard = ({ onUploadSuccess }) => {
  return (
    <div className="min-h-screen bg-[#030504] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Left: Header + Features */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-emerald-500 font-medium tracking-wide uppercase text-sm">
              ExcelGPT | Analyze Sheets with AI
            </h3>
            <h1 className="text-xl md:text-2xl font-press leading-relaxed tracking-tight">
              <span className="block bg-gradient-to-r underline decoration-emerald-400 from-emerald-400 via-teal-300 to-lime-300 bg-clip-text text-transparent mb-2">
                AI-powered insights
              </span>
              <span className="block">from your spreadsheets</span>
            </h1>
            <hr className="text-[#14532D]" />
          </div>

          <div className="flex flex-col gap-4 max-w-md">
            <Feature icon={<CircleSmall size={20} />} label="Formula Generator" />
            <Feature icon={<CircleSmall size={20} />} label="AI Assistant Analyzer" />
            <Feature icon={<CircleSmall size={20} />} label="Plot Graphs - Coming Soon" />
          </div>
        </div>
        <div className="relative flex items-center justify-center h-full min-h-[400px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,83,45,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,83,45,0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="relative w-48 h-48 md:w-64 md:h-64 animate-float">
            <div className="absolute inset-0 bg-emerald-500/30 blur-3xl transform" />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-300 via-emerald-400 to-lime-300 rounded-[3rem] shadow-[inset_2px_2px_20px_rgba(255,255,255,0.5),0_20px_50px_rgba(0,0,0,0.5)] transform flex items-center justify-center border-t border-l border-white/40">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-300 via-emerald-400 to-lime-300 rounded-[3rem] shadow-[inset_2px_2px_20px_rgba(255,255,255,0.5),0_20px_50px_rgba(0,0,0,0.5)] transform flex items-center justify-center border-t border-l border-white/40 animate-ping opacity-10" />
              <Uploader onUploadSuccess={onUploadSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, label }) => {
  return (
    <button className="group flex items-center justify-between w-full px-6 py-4 rounded-full border border-gray-500 backdrop-blur-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        {icon}
        <span className="font-medium text-lg">{label}</span>
      </div>
    </button>
  );
};

export default Dashboard;
