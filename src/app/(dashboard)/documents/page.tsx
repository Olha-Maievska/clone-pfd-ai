"use server";

import UploadPDF from "@/components/UploadPDF";
import { File, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { formatBytes } from '@/lib/utils';
import UpdatePDF from '@/components/UpdatePDF';

const Documents = async () => {
  const { userId } = auth();
  const documents = await prismaDB.document.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="bg-[#faf9f6] min-h-screen">
      <div className="section-container">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Documents</h1>
          <UploadPDF />
        </div>

        <div className="bg-white rounded w-full">
          <table className="min-w-full overflow-x-scroll">
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
                    <Link href={`/documents/${doc.id}`}>
                      <span className="text-ellipsis overflow-hidden whitespace-normal max-w-[300px] text-sm font-medium">
                        {doc.fileName}
                      </span>
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap text-right w-20">
                    {formatBytes(doc.fileSize)}
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap text-right w-20">
                    {formatDistanceToNow(doc.createdAt, {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="p-4 text-right w-4">
                    <UpdatePDF document={doc}/>
                  </td>
                  <td className="p-4 text-right w-4">
                    <Trash2
                      className="w-4 h-4 cursor-pointer"
                      style={{ strokeWidth: "3" }}
                    />
                  </td>
                </tr>
              ))}

              {documents.length == 0 && (
                <tr>
                  <td className="p-4 italic">None</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Documents;
