"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, UploadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles[0];

    if (!pdfFile) {
      alert("Please upload only PDF file.");
      return;
    }

    if (pdfFile.size > 10 * 1024 * 1024) {
      alert("Max file size: 10 MB");
      return;
    }

    setFile(pdfFile);
    setUrl("");
    setIsButtonEnabled(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop,
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	setUrl(e.target.value);
	setFile(null);
	setIsButtonEnabled(true);
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="orange">
            <UploadIcon className="w-4 h-4 mr-1" style={{ strokeWidth: "3" }} />
            Upload
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload a document</DialogTitle>
            <DialogDescription className="sr-only">
              {" "}
              This is a description{" "}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div
              {...getRootProps({
                className:
                  "p-8 border-dashed border-2 bg-gray-50 flex flex-col items-center justify-center rounded-md cursor-pointer",
              })}
            >
              <input name="file" {...getInputProps()} />
              <UploadCloud className="w-10 h-10 text-[#FF612E]" />
              <p className="text-slate-400 text-sm mt-2">
                Drag and drop a PDF file here or click
              </p>

              <span className="mt-2 overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-[200px]">
                {file?.name}
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 uppercase text-gray-600 text-xs">
                OR
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-gray-700"
                htmlFor="url"
              >
                Import from URL
              </Label>
              <Input
                id="url"
                name="url"
                value={url}
                className="font-light"
                placeholder="https://cdn.openai.com/papers/gpt-4.pdf"
                onChange={handleUrlChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="orange" disabled={!isButtonEnabled}>
                Upload
              </Button>
              <DialogTrigger asChild>
                <Button variant="light">Cancel</Button>
              </DialogTrigger>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default UploadPDF;
