-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "OrderLine" (
    "id" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "subtotal" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "status" "OrderStatusEnum" NOT NULL DEFAULT 'IN_PROGRESS',
    "total" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderLine_id_key" ON "OrderLine"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderLine_orderId_productId_key" ON "OrderLine"("orderId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
