/*
  Warnings:

  - A unique constraint covering the columns `[formId,name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_formId_name_key" ON "Event"("formId", "name");
