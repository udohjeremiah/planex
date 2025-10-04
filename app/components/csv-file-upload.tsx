"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";

export default function CSVFileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed">
      <FileUpload title="Upload CSV Files" onChange={handleFileUpload} />
      {files.length > 0 && (
        <div className="flex items-center justify-center px-10 pb-10">
          <Button className="w-full max-w-xl">Submit</Button>
        </div>
      )}
    </div>
  );
}
