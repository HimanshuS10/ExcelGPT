import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function FileUploader({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);


    // const handleUploadSuccess = (fileData) => {
    //     setUploadedFile(fileData);
    //     setUploadSuccess(true);
    // };


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
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
            onUploadSuccess(data);
            setFile(null);
        } catch (err) {
            setError('An error occurred during upload. Make sure your backend is running.');
        } finally {
            setLoading(false);
        }
    };


    
    return (
        <div className="min-h-full p-6 flex justify-center">
            <div className="w-full max-w-[1000px] max-h-screen">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Drag and Drop Zone */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${dragActive
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                            }`}
                    >
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-input"
                            disabled={loading}
                        />
                        <label htmlFor="file-input" className="cursor-pointer">
                            <div className="flex justify-center mb-3">
                                <Upload className="w-10 h-10 text-green-600" />
                            </div>
                            <p className="text-gray-900 font-semibold mb-1">Drop your file here</p>
                            <p className="text-sm text-gray-600">or click to select</p>
                            <p className="text-xs text-gray-500 mt-2">.xlsx, .xls, .csv</p>
                        </label>
                    </div>

                    {/* File Info */}
                    {file && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-gray-900">Selected file:</p>
                            <p className="text-sm text-blue-700 truncate">{file.name}</p>
                            <p className="text-xs text-gray-600 mt-1">
                                {(file.size / 1024).toFixed(2)} KB
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${!file || loading
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg active:scale-95'
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                Upload File
                            </>
                        )}
                    </button>

                    {response && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-green-900 text-sm">Upload successful!</p>
                                    <p className="text-sm text-green-700 mt-1">
                                        <strong>File:</strong> {response.filename}
                                    </p>
                                    <div className="mt-3">
                                        <p className="text-xs font-semibold text-green-900 mb-2">Columns detected:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {response.columns.map((col, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                                                    {col}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-red-900 text-sm">Upload failed</p>
                                    <p className="text-sm text-red-700 mt-1">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-gray-600 mt-6">
                    Max file size: 25MB • Supported: Excel & CSV files
                </p>
            </div>
        </div>
    );
}