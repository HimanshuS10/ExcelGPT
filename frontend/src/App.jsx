// src/App.jsx
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [instruction, setInstruction] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !instruction) return alert("File and instruction required");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("instruction", instruction);

    try {

      console.log("Running");

      const res = await fetch("http://127.0.0.1:5170/api/process_excel", {
        method: "POST",
        body: formData,
      });
      console.log("Running 2");

      const data = await res.json();
      console.log("Running 3");
      if (data.file) {
        // create a URL for download
        const url = `http://127.0.0.1:5170/uploads/${data.file}`;
        const link = document.createElement("a");
        link.href = url;
        link.download = data.file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Error updating Excel");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Excel GPT Upload</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Instruction (e.g., Add A1 + B1 → A3)"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          className="border p-1"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Submit
        </button>
      </form>

      {downloadUrl && (
        <div className="mt-4">
          <a
            href={downloadUrl}
            download
            className="text-green-600 underline"
          >
            Download Updated Excel
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
