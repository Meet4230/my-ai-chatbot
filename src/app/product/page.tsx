import ProductList from "@/components/product-list";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <ProductList />
    </Suspense>
  );
};
export default page;
