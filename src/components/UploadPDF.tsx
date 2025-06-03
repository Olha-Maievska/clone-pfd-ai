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
import { UploadIcon } from "lucide-react";

const UploadPDF = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="orange">
            <UploadIcon className="w-4 h-4 mr-1" style={{ strokeWidth: "3" }} />
            Upload
          </Button>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Upload a document</DialogTitle>
            <DialogDescription className='hidden'> This is a description </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
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
                className="font-light"
                placeholder="https://cdn.openai.com/papers/gpt-4.pdf"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="orange">Upload</Button>
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
