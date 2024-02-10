-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "actionType" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moduler_Per_Role" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Moduler_Per_Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activeAccount" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment_Types" (
    "id" SERIAL NOT NULL,
    "needUnits" BOOLEAN NOT NULL DEFAULT false,
    "labelUnits" TEXT,
    "value" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Payment_Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "paymentType" INTEGER NOT NULL,
    "paymentAmount" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timesheets" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "payPeroidStart" TIMESTAMP(3) NOT NULL,
    "payPeroidEnd" TIMESTAMP(3) NOT NULL,
    "checkDate" TIMESTAMP(3) NOT NULL,
    "checkNumber" BIGINT NOT NULL,
    "grossPayroll" BIGINT NOT NULL,
    "remarks" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "Timesheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees_Per_Timesheets" (
    "id" SERIAL NOT NULL,
    "timsheetId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "units" INTEGER,
    "grossWages" BIGINT NOT NULL,

    CONSTRAINT "Employees_Per_Timesheets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moduler_Per_Role" ADD CONSTRAINT "Moduler_Per_Role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moduler_Per_Role" ADD CONSTRAINT "Moduler_Per_Role_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_paymentType_fkey" FOREIGN KEY ("paymentType") REFERENCES "Payment_Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheets" ADD CONSTRAINT "Timesheets_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees_Per_Timesheets" ADD CONSTRAINT "Employees_Per_Timesheets_timsheetId_fkey" FOREIGN KEY ("timsheetId") REFERENCES "Timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees_Per_Timesheets" ADD CONSTRAINT "Employees_Per_Timesheets_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
