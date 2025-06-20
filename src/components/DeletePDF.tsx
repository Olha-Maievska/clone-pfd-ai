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
import { Document } from "@prisma/client";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { deleteDocument } from "@/actions/db";
import { deleteS3PDF } from "@/actions/s3";
import { deletePineconeNameSpace } from "@/actions/pinecone";

interface Props {
  document: Document;
}

const DeletePDF = ({ document }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  let [isPending, startTransition] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Trash2
          className="w-4 h-4 cursor-pointer"
          style={{ strokeWidth: "3" }}
        />
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete document</DialogTitle>
          <DialogDescription className="sr-only">
            {" "}
            This is a description{" "}
          </DialogDescription>
        </DialogHeader>

        <div className="flec flex-col mb-2 text-sm ">
          <p className="mb-4 p-0">
            Do you want to delete the following document?
          </p>
          <span className="font-semibold border-black border-l-2 px-2 whitespace-nowrap w-20">
            {document.fileName}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="orange"
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                try {
                  const fileKey = document.fileKey;
                  deleteS3PDF(fileKey);
                  deletePineconeNameSpace(fileKey);
                  deleteDocument(document.id);
                  setIsOpen(false);
                } catch (error) {
                  console.log(error);

                  toast("Could not complete the process");
                }
              })
            }
          >
            {isPending ? (
              <Loader2
                className="h-5 w-5 text-white/80 animate-spin"
                style={{ strokeWidth: "3" }}
              />
            ) : (
              `Delete`
            )}
          </Button>
          <DialogTrigger asChild>
            <Button variant="light">Cancel</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePDF;
