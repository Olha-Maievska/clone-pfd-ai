import { Button } from "@/components/ui/button";
import { File, PencilIcon, Trash2, UploadIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Documents = () => {
  return (
    <section className="bg-[#faf9f6] min-h-screen">
      <div className="section-container">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Documents</h1>
          <Button variant="orange">
            <UploadIcon className="w-4 h-4 mr-1" style={{ strokeWidth: "3" }} />
            Upload
          </Button>
        </div>

        <div className="bg-white rounded shadow-md w-full overflow-x-scroll">
          <table className="min-w-full">
            <tbody>
              <tr>
                <td className="p-4 flex items-center text-left">
                  <File className="w-4 h-4 mr-2" style={{ strokeWidth: "3" }} />
                  <Link href="/documents/1">
                    <span className="text-ellipsis overflow-hidden whitespace-normal max-w-[300px] text-sm font-medium">
                      Book.pdf
                    </span>
                  </Link>
                </td>
                <td className="p-4 text-sm text-gray-500 whitespace-nowrap text-right w-20">
                  1 Mb
                </td>
                <td className="p-4 text-sm text-gray-500 whitespace-nowrap text-right w-20">
                  2 minutes ago
                </td>
                <td className="p-4 text-right w-4">
                  <PencilIcon
                    className="w-4 h-4 cursor-pointer"
                    style={{ strokeWidth: "3" }}
                  />
                </td>
                <td className="p-4 text-right w-4">
                  <Trash2
                    className="w-4 h-4 cursor-pointer"
                    style={{ strokeWidth: "3" }}
                  />
                </td>
              </tr>

              <tr>
                <td className="p-4 flex items-center text-left">
                  <File className="w-4 h-4 mr-2" style={{ strokeWidth: "3" }} />
                  <Link href="/documents/1">
                    <span className="text-ellipsis overflow-hidden whitespace-normal max-w-[300px] text-sm font-medium">
                      Book.pdf
                    </span>
                  </Link>
                </td>
                <td className="p-4 text-sm text-gray-500 whitespace-nowrap text-right w-20">
                  1 Mb
                </td>
                <td className="p-4 text-sm text-gray-500 whitespace-nowrap text-right w-20">
                  2 minutes ago
                </td>
                <td className="p-4 text-right w-4">
                  <PencilIcon
                    className="w-4 h-4 cursor-pointer"
                    style={{ strokeWidth: "3" }}
                  />
                </td>
                <td className="p-4 text-right w-4">
                  <Trash2
                    className="w-4 h-4 cursor-pointer"
                    style={{ strokeWidth: "3" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Documents;
