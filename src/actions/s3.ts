"use server";

import { auth } from "@clerk/nextjs";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { needToUpgrade } from '@/lib/subscription';

export const generatePreSignedURL = async (
  filename: string,
  fileType: string
) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const reachedQuota = await needToUpgrade();

  if (reachedQuota) {
    throw new Error("Reached free quota. Please upgrade!");
  }

  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
    },
  });

  if (!fileType || !filename) {
    throw new Error("Invalid file type or filename");
  }

  const fileKey = `users/${userId}/${Date.now()}-${filename}`;

  const putCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: fileKey,
    ContentType: fileType,
  });

  const putUrl = await getSignedUrl(client, putCommand, {
    expiresIn: 60,
  });

  return { putUrl, fileKey };
};

export const deleteS3PDF = async (fileKey: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
    },
  });

  if (!fileKey) {
    throw new Error("Could not find file!");
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: fileKey,
  });

  await client.send(command);
};
