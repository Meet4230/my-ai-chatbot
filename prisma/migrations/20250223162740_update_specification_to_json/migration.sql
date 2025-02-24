/*
  Warnings:

  - Changed the type of `specification` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "tags" SET NOT NULL,
ALTER COLUMN "tags" SET DATA TYPE TEXT,
DROP COLUMN "specification",
ADD COLUMN     "specification" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "Product_name_category_tags_idx" ON "Product"("name", "category", "tags");
