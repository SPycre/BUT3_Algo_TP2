/*
  Warnings:

  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE order_id_seq;
ALTER TABLE "Order" ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('order_id_seq'),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE order_id_seq OWNED BY "Order"."id";

-- AlterTable
CREATE SEQUENCE orderline_id_seq;
ALTER TABLE "OrderLine" ALTER COLUMN "id" SET DEFAULT nextval('orderline_id_seq');
ALTER SEQUENCE orderline_id_seq OWNED BY "OrderLine"."id";
