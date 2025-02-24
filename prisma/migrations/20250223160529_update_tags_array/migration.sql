/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The `tags` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `features` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `brand` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Product_name_category_tags_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdAt",
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "brand" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL,
DROP COLUMN "features",
ADD COLUMN     "features" TEXT[],
ALTER COLUMN "specification" SET DATA TYPE TEXT;
