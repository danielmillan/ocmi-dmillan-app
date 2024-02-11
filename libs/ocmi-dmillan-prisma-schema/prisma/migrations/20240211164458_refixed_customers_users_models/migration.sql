/*
  Warnings:

  - You are about to drop the column `email` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Customers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customers" DROP COLUMN "email",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "customerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
