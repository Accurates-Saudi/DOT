-- CreateEnum
CREATE TYPE "CmsRole" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "CmsContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CmsContentType" AS ENUM ('SITE', 'NAVIGATION', 'FOOTER', 'PAGE', 'PRODUCT', 'NEWS', 'CERTIFICATE', 'SHARED');

-- CreateEnum
CREATE TYPE "CmsMediaType" AS ENUM ('IMAGE', 'DOCUMENT', 'VIDEO', 'OTHER');

-- CreateTable
CREATE TABLE "CmsUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "CmsRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmsUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastSeenAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmsSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsContentEntry" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "CmsContentType" NOT NULL,
    "status" "CmsContentStatus" NOT NULL DEFAULT 'DRAFT',
    "slug" TEXT,
    "latestVersionNumber" INTEGER NOT NULL DEFAULT 0,
    "currentVersionId" TEXT,
    "publishedVersionId" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmsContentEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsContentVersion" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,
    "changeSummary" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "CmsContentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsMediaAsset" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "CmsMediaType" NOT NULL DEFAULT 'IMAGE',
    "latestVersionNumber" INTEGER NOT NULL DEFAULT 0,
    "currentVersionId" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmsMediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsMediaVersion" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "originalFilename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt" JSONB,
    "metadata" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CmsMediaVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CmsUser_email_key" ON "CmsUser"("email");

-- CreateIndex
CREATE INDEX "CmsUser_role_idx" ON "CmsUser"("role");

-- CreateIndex
CREATE INDEX "CmsUser_isActive_idx" ON "CmsUser"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "CmsSession_tokenHash_key" ON "CmsSession"("tokenHash");

-- CreateIndex
CREATE INDEX "CmsSession_userId_idx" ON "CmsSession"("userId");

-- CreateIndex
CREATE INDEX "CmsSession_expiresAt_idx" ON "CmsSession"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "CmsContentEntry_key_key" ON "CmsContentEntry"("key");

-- CreateIndex
CREATE INDEX "CmsContentEntry_type_idx" ON "CmsContentEntry"("type");

-- CreateIndex
CREATE INDEX "CmsContentEntry_status_idx" ON "CmsContentEntry"("status");

-- CreateIndex
CREATE INDEX "CmsContentEntry_slug_idx" ON "CmsContentEntry"("slug");

-- CreateIndex
CREATE INDEX "CmsContentEntry_updatedAt_idx" ON "CmsContentEntry"("updatedAt");

-- CreateIndex
CREATE INDEX "CmsContentVersion_entryId_createdAt_idx" ON "CmsContentVersion"("entryId", "createdAt");

-- CreateIndex
CREATE INDEX "CmsContentVersion_isPublished_idx" ON "CmsContentVersion"("isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "CmsContentVersion_entryId_versionNumber_key" ON "CmsContentVersion"("entryId", "versionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CmsMediaAsset_key_key" ON "CmsMediaAsset"("key");

-- CreateIndex
CREATE INDEX "CmsMediaAsset_type_idx" ON "CmsMediaAsset"("type");

-- CreateIndex
CREATE INDEX "CmsMediaAsset_updatedAt_idx" ON "CmsMediaAsset"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "CmsMediaVersion_storageKey_key" ON "CmsMediaVersion"("storageKey");

-- CreateIndex
CREATE INDEX "CmsMediaVersion_assetId_createdAt_idx" ON "CmsMediaVersion"("assetId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CmsMediaVersion_assetId_versionNumber_key" ON "CmsMediaVersion"("assetId", "versionNumber");

-- AddForeignKey
ALTER TABLE "CmsSession" ADD CONSTRAINT "CmsSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "CmsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsContentEntry" ADD CONSTRAINT "CmsContentEntry_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "CmsUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsContentEntry" ADD CONSTRAINT "CmsContentEntry_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "CmsUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsContentEntry" ADD CONSTRAINT "CmsContentEntry_currentVersionId_fkey" FOREIGN KEY ("currentVersionId") REFERENCES "CmsContentVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsContentEntry" ADD CONSTRAINT "CmsContentEntry_publishedVersionId_fkey" FOREIGN KEY ("publishedVersionId") REFERENCES "CmsContentVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsContentVersion" ADD CONSTRAINT "CmsContentVersion_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "CmsContentEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsContentVersion" ADD CONSTRAINT "CmsContentVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "CmsUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsMediaAsset" ADD CONSTRAINT "CmsMediaAsset_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "CmsUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsMediaAsset" ADD CONSTRAINT "CmsMediaAsset_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "CmsUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsMediaAsset" ADD CONSTRAINT "CmsMediaAsset_currentVersionId_fkey" FOREIGN KEY ("currentVersionId") REFERENCES "CmsMediaVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsMediaVersion" ADD CONSTRAINT "CmsMediaVersion_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "CmsMediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsMediaVersion" ADD CONSTRAINT "CmsMediaVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "CmsUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
