/*
  Warnings:

  - You are about to drop the `Moduler_Per_Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Moduler_Per_Role" DROP CONSTRAINT "Moduler_Per_Role_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Moduler_Per_Role" DROP CONSTRAINT "Moduler_Per_Role_roleId_fkey";

-- DropTable
DROP TABLE "Moduler_Per_Role";

-- CreateTable
CREATE TABLE "Modules_Per_Role" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Modules_Per_Role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Modules_Per_Role" ADD CONSTRAINT "Modules_Per_Role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules_Per_Role" ADD CONSTRAINT "Modules_Per_Role_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
