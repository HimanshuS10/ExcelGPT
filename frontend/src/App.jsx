import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import MainTab from "./components/MainTab";

function App() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showTalkAI, setShowTalkAI] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Trigger MainTab view 2s after success
  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => {
        setShowTalkAI(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [uploadSuccess]);

  const handleUploadSuccess = (fileData) => {
    setUploadedFile(fileData);
    setUploadSuccess(true);
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setShowTalkAI(false);
    setUploadSuccess(false);
  };

  return (
    <div className="min-h-screen w-full">
      {showTalkAI ? (
        <MainTab fileName={uploadedFile?.filename} onDelete={handleDeleteFile} />
      ) : (
        <Dashboard onUploadSuccess={handleUploadSuccess} />
      )}
    </div>
  );
}

export default App;
