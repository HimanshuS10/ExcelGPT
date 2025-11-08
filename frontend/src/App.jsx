import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./components/Navbar"
import Uploader from "./components/Uploader";
import MainTab from "./components/MainTab";

function App() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showTalkAI, setShowTalkAI] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

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


    <div className="min-h-screen w-full relative bg-white">
      {/* Ocean Abyss Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />


      {/* Content Layer */}
      <div className="relative z-10 p-6">
        <Navbar />
        {showTalkAI ? (
          <MainTab fileName={uploadedFile?.filename} onDelete={handleDeleteFile} />
        ) : (
          <Uploader onUploadSuccess={handleUploadSuccess} />
        )}
      </div>
    </div>
  );
}

export default App;