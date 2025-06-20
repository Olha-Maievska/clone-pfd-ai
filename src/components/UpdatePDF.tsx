"use client";

import { updateDocument } from "@/actions/db";
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
import { Document } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

interface Props {
  document: Document;
}

const UpdatePDF = ({ document }: Props) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [documentName, setDocumentName] = useState("");

  const handleOpenDialog = () => {
    setIsOpen(!isOpen);
    setDocumentName(document.fileName);
  };

  const handleDocumentName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
    setIsButtonEnabled(e.target.value !== "");
  };

  const updateDocumentWithID = updateDocument.bind(null, document.id);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Pencil
          className="w-4 h-4 cursor-pointer"
          style={{ strokeWidth: "3" }}
        />
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Update document</DialogTitle>
          <DialogDescription className="sr-only">
            {" "}
            This is a description{" "}
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-6"
          action={(data) => {
            updateDocumentWithID(data).then(() => setIsOpen(false));
          }}
        >
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-gray-700"
              htmlFor="documentName"
            >
              Name
            </Label>
            <Input
              id="documentName"
              name="documentName"
              value={documentName}
              className="font-light"
              onChange={handleDocumentName}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SubmitButton title="Update" isButtonEnabled={isButtonEnabled} />
            <DialogTrigger asChild>
              <Button variant="light">Cancel</Button>
            </DialogTrigger>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePDF;
