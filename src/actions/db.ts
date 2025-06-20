"use server";

import prismaDB from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";

export const createDocument = async (
  fileName: string,
  fileSize: number,
  fileKey: string
) => {
  const user = await currentUser();

  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized");
  }

  const document = await prismaDB.document.create({
    data: {
      userId: user.id,
      userName: user.firstName,
      fileName,
      fileSize,
      fileKey,
    },
  });

  revalidatePath("/documents");

  return { document };
};

export const getDocument = async (documentId: string) => {
  const user = await currentUser();

  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized");
  }

  const document = await prismaDB.document.findUnique({
    where: {
      id: documentId,
      userId: user.id,
    },
  });

  return { document };
};

export const updateDocument = async (documentId: string, formData: FormData) => {
  const user = await currentUser();

  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized");
  }

  const fileName = formData.get("documentName") as string;

  const document = await prismaDB.document.update({
    where: {
      id: documentId,
      userId: user.id,
    },
    data: {
      fileName
    },
  });

  revalidatePath("/documents");
};
