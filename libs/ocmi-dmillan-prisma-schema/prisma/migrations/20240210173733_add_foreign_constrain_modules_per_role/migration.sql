/*
  Warnings:

  - A unique constraint covering the columns `[moduleId,roleId]` on the table `Modules_Per_Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Modules_Per_Role_moduleId_roleId_key" ON "Modules_Per_Role"("moduleId", "roleId");
