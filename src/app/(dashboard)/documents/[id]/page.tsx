import { getDocument } from "@/actions/db";
import Chat from "@/components/Chat";
import PDFViewer from "@/components/PDFViewer";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const ChatPage = async ({ params: { id } }: Props) => {
  const { document } = await getDocument(id);

  if (!document) {
    return redirect("/documents");
  }

  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_S3_BUCKET_REGION;
  const fileKey = document.fileKey;

  if (!bucket || !region || !fileKey) {
    console.error("Missing S3 config or fileKey");
    return redirect("/documents");
  }

  const s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`;
  return (
    <div className="flex">
      <PDFViewer url={s3Url} />
      <Chat document={document} />
    </div>
  );
};

export default ChatPage;
