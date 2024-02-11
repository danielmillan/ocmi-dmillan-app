/*
  Warnings:

  - You are about to drop the column `payPeroidEnd` on the `Timesheets` table. All the data in the column will be lost.
  - You are about to drop the column `payPeroidStart` on the `Timesheets` table. All the data in the column will be lost.
  - Added the required column `payPeriodEnd` to the `Timesheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payPeriodStart` to the `Timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timesheets" DROP COLUMN "payPeroidEnd",
DROP COLUMN "payPeroidStart",
ADD COLUMN     "payPeriodEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payPeriodStart" TIMESTAMP(3) NOT NULL;
