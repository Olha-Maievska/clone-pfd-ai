"use server";

import { auth } from "@clerk/nextjs";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";

import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

import { needToUpgrade } from "@/lib/subscription";

export const embedPDFToPinecone = async (fileKey: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const reachedQuota = await needToUpgrade();

  if (reachedQuota) {
    throw new Error("Reached free quota. Please upgrade!");
  }

  const pdfFile = await fetch(
    `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${fileKey}`
  );
  const blob = new Blob([await pdfFile.arrayBuffer()]);
  const loader = new PDFLoader(blob);

  const docs = await loader.load();

  const trimeDocs = docs.map((doc) => {
    const metadata = { ...doc.metadata };
    delete metadata.pdf;
    return new Document({
      pageContent: doc.pageContent,
      metadata: metadata,
    });
  });

  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 500,
    chunkOverlap: 10,
  });

  const splitDocs = await splitter.splitDocuments(trimeDocs);

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX!);

  await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
    pineconeIndex: index,
    namespace: fileKey,
  });
};

export const deletePineconeNameSpace = async (fileKey: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!fileKey) {
    throw new Error("There was a problem deleting the namespace!");
  }

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX!);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex: index,
      namespace: fileKey,
    }
  );

  await vectorStore.delete({
    deleteAll: true,
  });
};
