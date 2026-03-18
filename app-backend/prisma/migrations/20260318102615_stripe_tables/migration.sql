-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PLACED', 'PAID', 'IN_PROGRESS', 'OUT_FOR_DELIVERY', 'DELIVERED');

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PLACED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseProduct" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PurchaseProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryDetails" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "addressLine1" TEXT,
    "city" TEXT,

    CONSTRAINT "DeliveryDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryDetails_purchaseId_key" ON "DeliveryDetails"("purchaseId");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryDetails" ADD CONSTRAINT "DeliveryDetails_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
