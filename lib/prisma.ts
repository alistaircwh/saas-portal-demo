import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 connects through a driver adapter. The pg adapter takes a standard
// postgres:// connection string (e.g. your Supabase / hosted Postgres URL).
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Reuse the client across hot reloads / serverless invocations.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
