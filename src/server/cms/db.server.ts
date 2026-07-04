import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  __cmsPrisma__?: PrismaClient;
};

export function getPrismaClient(): PrismaClient {
  if (globalForPrisma.__cmsPrisma__) {
    return globalForPrisma.__cmsPrisma__;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required for CMS database access.");
  }

  const adapter = new PrismaPg({
    connectionString,
    connectionTimeoutMillis: 5000,
  });

  const prisma = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.__cmsPrisma__ = prisma;
  }

  return prisma;
}
