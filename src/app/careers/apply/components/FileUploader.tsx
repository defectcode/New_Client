'use client';
import React, { useRef, useState } from 'react';

const FileUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatus('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('position', 'Full Time');
    formData.append('email', 'paladuta05@gmail.com');
    formData.append('fullName', 'Constantin Paladuta');
    formData.append('phone', '060086711');
    formData.append('country', 'Moldova');
    formData.append('linkedin', 'https://www.linkedin.com/in/cons');
    formData.append('portfolio', 'nexusthecode.com');

    try {
      const response = await fetch('/api/uploadFile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`Upload successful! File URL: ${data.fileUrl}`);
      } else {
        setStatus('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setStatus('An error occurred during upload.');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />
      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
};

export default FileUploader;
