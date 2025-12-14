import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader, FileSpreadsheet, X } from 'lucide-react';

export default function FileUploader({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    // --- Handlers (Logic remains the same) ---
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            setFile(droppedFile);
            setError(null);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
        }
    };

    const clearSelection = () => {
        setFile(null);
        setResponse(null);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);

        const formData = new FormData();
        formData.append('file', file);

        try {

            const res = await fetch('http://127.0.0.1:5170/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Upload failed');
                return;
            }

            setResponse(data);
            if (onUploadSuccess) onUploadSuccess(data);
            // We don't clear file here immediately so the user sees the success state
        } catch (err) {
            setError('Backend error. Is server running?');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div
            className="w-full h-full flex items-center justify-center p-4"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <div className={`relative w-full h-full flex flex-col items-center justify-center text-center transition-all duration-300
        ${dragActive ? 'scale-105' : 'scale-100'}
      `}>

                {/* 1. IDLE STATE: No File Selected */}
                {!file && !response && (
                    <>
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-input"
                            disabled={loading}
                        />
                        <label
                            htmlFor="file-input"
                            className="cursor-pointer flex flex-col items-center group text-black"
                        >
                            <div className={`p-4 rounded-full mb-4 transition-all duration-300 ${dragActive ? 'bg-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-white/35 group-hover:bg-white/20'}`}>
                                <Upload className={`w-8 h-8 text-black ${dragActive ? 'text-black' : 'text-black'}`} />
                            </div>
                            <p className="text-black font-press text-sm drop-shadow-md">
                                {dragActive ? "Drop it!" : "Upload File"}
                            </p>
                            <p className="text-black/45 text-xs mt-2 max-w-[150px]">
                                .xlsx files only, max 5MB
                            </p>
                        </label>
                    </>
                )}

                {file && !response && !loading && (
                    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="relative p-3 bg-white/70 text-black/65 rounded-xl border border-white/10 mb-4 w-full max-w-[200px]">
                            <button onClick={clearSelection} className="absolute -top-2 -right-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full p-1 transition-colors hover:cursor-pointer">
                                <X size={12} />
                            </button>
                            <div className="flex items-center gap-3">
                                <FileSpreadsheet className="text-emerald-400 w-6 h-6 flex-shrink-0" />
                                <div className="text-left overflow-hidden">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-black/45 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleUpload}
                            className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-2 px-6 rounded-sm hover:cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform active:scale-95 text-sm"
                        >
                            Analyze Data
                        </button>

                        {error && (
                            <div className="mt-3 text-red-300 bg-red-900/20 px-3 py-1 rounded-md text-xs border border-red-500/20 flex items-center gap-2">
                                <AlertCircle size={12} /> {error}
                            </div>
                        )}
                    </div>
                )}

                {/* 3. LOADING STATE */}
                {loading && (
                    <div className="flex flex-col items-center animate-pulse">
                        <Loader className="w-10 h-10 text-emerald-400 animate-spin mb-3" />
                        <p className="text-emerald-100 font-medium">Processing...</p>
                        <p className="text-emerald-200/50 text-xs mt-1">Reading columns</p>
                    </div>
                )}

                {response && (
                    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-2 mb-2 text-white">
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-bold text-white">Success!</span>

                        </div>
                        <div className="flex items-center gap-2 mb-2 text-white">
                            <Loader className="w-6 h-6 animate-spin " />
                            <span className="font-bold text-white">Loading Please Wait</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-3">{response.filename}</div>

                        {/* Compact Column View */}
                        <div className="w-full max-h-[100px] overflow-y-auto pr-1 custom-scrollbar">
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {response.columns?.slice(0, 5).map((col, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-emerald-500 border border-emerald-500 text-emerald-100 text-[10px] rounded-md">
                                        {col}
                                    </span>
                                ))}
                                {response.columns?.length > 5 && (
                                    <span className="px-2 py-0.5 bg-emerald-500  text-gray-300 text-[10px] rounded-md">
                                        +{response.columns.length - 5} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}