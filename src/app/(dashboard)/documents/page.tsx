import UploadPDF from "@/components/UploadPDF";
import { documents } from "@/const/documents";
import { File, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Documents = () => {
  return (
    <section className="bg-[#faf9f6] min-h-screen">
      <div className="section-container">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Documents</h1>
          <UploadPDF />
        </div>

        <div className="bg-white rounded w-full overflow-x-scroll">
          <table className="min-w-full">
            <tbody>
              {documents.map((doc, index) => (
                <tr
                  key={doc.id}
                  className={
                    index === documents.length - 1
                      ? ""
                      : "border-b border-gray-200"
                  }
                >
                  <td className="p-4 flex items-center text-left">
                    <File
                      className="w-4 h-4 mr-2"
                      style={{ strokeWidth: "3" }}
                    />
                    <Link href="/documents/1">
                      <span className="text-ellipsis overflow-hidden whitespace-normal max-w-[300px] text-sm font-medium">
                        {doc.filename}
                      </span>
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap text-right w-20">
                    {doc.size}
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap text-right w-20">
                    {doc.date}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Documents;
