import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPDFNameFromURL(url: string) {
  const matches = url.match(/\/([^/?#]+)[^/]*$/);

  if (matches && matches.length > 1) {
    const fileName = matches[1];
    const fileExtension = fileName.split(".").pop();

    if (fileExtension?.toLowerCase() === "pdf") {
      return fileName;
    }
  }

  return null;
}

export const showToast = (message: string) => {
  toast(message, {
    position: "top-right",
    className: "foo-bar",
  });
};

export const formatBytes = (bytes: number, decimals: number = 2 ): string => {
  if (bytes === 0) {
    return '0 bytes';
  }
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};