"use client";

import { embedPDFToPinecone } from '@/actions/pinecone';
import { generatePreSignedURL } from "@/actions/s3";
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
import { getPDFNameFromURL, showToast } from '@/lib/utils';
import { Loader2, UploadCloud, UploadIcon, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles[0];

    if (!pdfFile) {
      showToast("Please upload only PDF file.");
      return;
    }

    if (pdfFile.size > 10 * 1024 * 1024) {
      showToast("Max file size: 10 MB");
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
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsButtonEnabled(false);
  };

  const resetForm = () => {
    setFile(null);
    setUrl("");
    setIsButtonEnabled(false);
  };

  const handleOpenDialog = () => {
    setIsOpen(!isOpen);
    resetForm();
  };

  const uploadPDFToS3 = async (file: File | Blob, putUrl: string) => {
    try {
      const uploadResponse = await fetch(putUrl, {
        body: file,
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
    } catch (error: any) {
      showToast(error.message);
    } finally {
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      if (file) {
        console.log("File:", file);

        const { putUrl, fileKey } = await generatePreSignedURL(
          file.name,
          file.type
        );

        await uploadPDFToS3(file, putUrl);

        const docs = await embedPDFToPinecone(fileKey);
        console.log("Docs:", docs);

      } else if (url) {
        const proxyUrl = `https://corsproxy.io/?url=${url}`
        const response = await fetch(proxyUrl);

        const fileName = getPDFNameFromURL(url);
        const fileSize = Number(response.headers.get("Content-Length"));
        const fileType = response.headers.get("Content-Type");

        if (!fileName || fileType !== "application/pdf") {
          throw new Error("Invalid file type or filename");
        }

        const { putUrl, fileKey } = await generatePreSignedURL(
          fileName,
          fileType
        );

        const blob = await response.blob();
        await uploadPDFToS3(blob, putUrl);

        const docs = await embedPDFToPinecone(fileKey);
        console.log("Docs:", docs);

      }
    } catch (error: any) {
      showToast(error.message);
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialog}>
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl">
            <div className="border-dashed border-2 bg-gray-50 flex flex-col h-36 w-full rounded-md">
              {file ? (
                <div className="flex justify-center items-center h-full text-black/70">
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-[200px]">
                    {file?.name}
                  </span>
                  <button
                    className="ml-1 cursor-pointer"
                    onClick={handleRemoveFile}
                  >
                    <X className="w-4 h-4 hover:text-[#FF612E] transition-colors" />
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  <input name="file" {...getInputProps()} />
                  <UploadCloud className="w-10 h-10 text-[#FF612E]" />
                  <p className="text-slate-400 text-sm mt-2">
                    Drag and drop a PDF file here or click
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 uppercase text-gray-600 text-xs">
              OR
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700" htmlFor="url">
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
            <Button variant="orange" disabled={!isButtonEnabled || isLoading} type="submit">
              {isLoading ? (<Loader2 className='h-5 w-5 text-white/80 animate-spin' style={{strokeWidth: '3'}}/>) : (`Upload`)}
              
            </Button>
            <DialogTrigger asChild>
              <Button variant="light">Cancel</Button>
            </DialogTrigger>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPDF;
