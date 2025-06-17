import { PrismaClient } from '@prisma/client';
const prismaDB = globalThis.prisma || new PrismaClient();

declare global {
	var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaDB;

export default prismaDB;