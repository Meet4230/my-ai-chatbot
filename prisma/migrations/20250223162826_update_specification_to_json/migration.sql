/*
  Warnings:

  - The `tags` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE INDEX "Product_name_category_tags_idx" ON "Product"("name", "category", "tags");
