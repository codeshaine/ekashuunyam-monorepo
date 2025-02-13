import { PrismaClient } from "./generated/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
