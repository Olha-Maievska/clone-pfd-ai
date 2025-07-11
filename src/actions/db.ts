"use server";

import prismaDB from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";
import { needToUpgrade } from '@/lib/subscription';

export const createDocument = async (
  fileName: string,
  fileSize: number,
  fileKey: string
) => {
  const user = await currentUser();

  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized");
  }

  const reachedQuota = await needToUpgrade();

  if (reachedQuota) {
    throw new Error("Reached free quota. Please upgrade!");
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
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    }
  });

  return { document };
};

export const updateDocument = async (
  documentId: string,
  formData: FormData
) => {
  const user = await currentUser();

  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized");
  }

  const fileName = formData.get("documentName") as string;

  await prismaDB.document.update({
    where: {
      id: documentId,
      userId: user.id,
    },
    data: {
      fileName,
    },
  });

  revalidatePath("/documents");
};

export const deleteDocument = async (documentId: string) => {
  const user = await currentUser();

  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized");
  }

  await prismaDB.document.delete({
    where: {
      id: documentId,
      userId: user.id,
    },
  });

  revalidatePath("/documents");
};
