-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('individual', 'company');

-- CreateEnum
CREATE TYPE "PlatformRole" AS ENUM ('customer', 'admin', 'superadmin');

-- CreateEnum
CREATE TYPE "EntityStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('draft', 'pending_payment', 'paid', 'cancelled', 'expired', 'refunded');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'succeeded', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "SubStatus" AS ENUM ('pending', 'active', 'expired', 'cancelled');

-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('issued', 'sent', 'activated', 'revoked', 'expired');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('invoice', 'receipt', 'credit_note');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('percent', 'fixed');

-- CreateEnum
CREATE TYPE "SubEventType" AS ENUM ('create', 'renew', 'upgrade', 'downgrade', 'cancel', 'expire');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "authId" TEXT,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "accountType" "AccountType" NOT NULL DEFAULT 'individual',
    "role" "PlatformRole" NOT NULL DEFAULT 'customer',
    "status" "EntityStatus" NOT NULL DEFAULT 'active',
    "taxId" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "mobileVerifiedAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "companyId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "businessRegNo" TEXT,
    "taxId" TEXT,
    "msicCode" TEXT,
    "address" TEXT,
    "contactPerson" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "status" "EntityStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyMember" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "tier" TEXT,
    "status" "EntityStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackagePrice" (
    "id" UUID NOT NULL,
    "packageId" UUID NOT NULL,
    "durationMonths" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'MYR',
    "unitPrice" DECIMAL(18,2) NOT NULL,
    "status" "EntityStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PackagePrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "discountType" "DiscountType" NOT NULL,
    "discountValue" DECIMAL(18,2) NOT NULL,
    "minAmount" DECIMAL(18,2),
    "maxUses" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "perUserLimit" INTEGER DEFAULT 1,
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "status" "EntityStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoRedemption" (
    "id" UUID NOT NULL,
    "promoCodeId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "orderId" UUID,
    "amountDiscounted" DECIMAL(18,2) NOT NULL,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL,
    "orderNo" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "companyId" UUID,
    "status" "OrderStatus" NOT NULL DEFAULT 'draft',
    "currency" TEXT NOT NULL DEFAULT 'MYR',
    "subtotal" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "discountTotal" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "taxTotal" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "grandTotal" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "promoCodeId" UUID,
    "billingSnapshot" JSONB,
    "referralSource" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "packagePriceId" UUID NOT NULL,
    "descriptionSnapshot" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(18,2) NOT NULL,
    "lineTotal" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'mock',
    "amount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'MYR',
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "method" TEXT,
    "providerRef" TEXT,
    "providerTxnId" TEXT,
    "signature" TEXT,
    "rawResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentEvent" (
    "id" UUID NOT NULL,
    "paymentId" UUID,
    "eventType" TEXT,
    "payload" JSONB,
    "signatureValid" BOOLEAN,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dedupeKey" TEXT NOT NULL,

    CONSTRAINT "PaymentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "type" "DocumentType" NOT NULL,
    "docNo" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'MYR',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueAt" TIMESTAMP(3),
    "filePath" TEXT,
    "einvoiceUuid" TEXT,
    "einvoiceStatus" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "companyId" UUID,
    "orderId" UUID NOT NULL,
    "packagePriceId" UUID NOT NULL,
    "status" "SubStatus" NOT NULL DEFAULT 'pending',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "startDate" DATE,
    "endDate" DATE,
    "autoRenew" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionEvent" (
    "id" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "type" "SubEventType" NOT NULL,
    "fromPackagePriceId" UUID,
    "toPackagePriceId" UUID,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriptionEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License" (
    "id" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "activationToken" TEXT NOT NULL,
    "qrPayload" TEXT,
    "status" "LicenseStatus" NOT NULL DEFAULT 'issued',
    "assignedEmail" TEXT,
    "zimperiumActivationId" TEXT,
    "zimperiumDeviceId" TEXT,
    "activatedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginHistory" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "loginTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "deviceInfo" TEXT,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "actorUserId" UUID,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" UUID,
    "oldValue" JSONB,
    "newValue" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLog" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "orderId" UUID,
    "type" TEXT,
    "toEmail" TEXT,
    "status" TEXT,
    "providerMessageId" TEXT,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_companyId_idx" ON "User"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMember_companyId_userId_key" ON "CompanyMember"("companyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PackagePrice_packageId_durationMonths_currency_key" ON "PackagePrice"("packageId", "durationMonths", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "PromoCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNo_key" ON "Order"("orderNo");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "Payment_orderId_idx" ON "Payment"("orderId");

-- CreateIndex
CREATE INDEX "Payment_providerRef_idx" ON "Payment"("providerRef");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentEvent_dedupeKey_key" ON "PaymentEvent"("dedupeKey");

-- CreateIndex
CREATE UNIQUE INDEX "Document_docNo_key" ON "Document"("docNo");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "License_activationToken_key" ON "License"("activationToken");

-- CreateIndex
CREATE INDEX "License_subscriptionId_idx" ON "License"("subscriptionId");

-- CreateIndex
CREATE INDEX "License_activationToken_idx" ON "License"("activationToken");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackagePrice" ADD CONSTRAINT "PackagePrice_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoRedemption" ADD CONSTRAINT "PromoRedemption_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoRedemption" ADD CONSTRAINT "PromoRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_packagePriceId_fkey" FOREIGN KEY ("packagePriceId") REFERENCES "PackagePrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentEvent" ADD CONSTRAINT "PaymentEvent_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_packagePriceId_fkey" FOREIGN KEY ("packagePriceId") REFERENCES "PackagePrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionEvent" ADD CONSTRAINT "SubscriptionEvent_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
