'use client';
import React, { useRef, useState } from 'react';

interface FileUploaderProps {
  label?: string;
  acceptedFormats?: string;
  onFileSelect: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label = 'Click to attach document',
  acceptedFormats = '.pdf,.doc,.docx',
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      onFileSelect(file);
    } else {
      setSelectedFileName(null);
      onFileSelect(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        className="border border-[#6F6F6F] rounded-lg px-4 py-2 w-[221px] text-[16px] h-[39px]"
        onClick={handleFileButtonClick}
      >
        {label}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        className="hidden"
        onChange={handleFileChange}
      />
      {selectedFileName && (
        <p className="text-sm text-gray-600 mt-1">Selected file: {selectedFileName}</p>
      )}
    </div>
  );
};

export default FileUploader;
