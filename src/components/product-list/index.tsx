"use client";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@prisma/client";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
export default function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(searchQuery);

  const updateSearchParamPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?page=${newPage}`);
  };

  useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    return params.toString();
  }, [page, searchParams]);

  useEffect(() => {
    fetchProducts(debouncedSearch, page);
  }, [debouncedSearch, page]);

  const fetchProducts = async (query: string = "", page: number = 1) => {
    setLoading(true);
    setError("");
    try {
      const url = query
        ? `${API_BASE_URL}/products/search?q=${encodeURIComponent(
            query
          )}&page=${page}`
        : `${API_BASE_URL}/products?page=${page}`;
      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data.products)) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } else {
        setProducts([]);
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Input
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full"
      />
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="cursor-pointer hover:shadow-lg">
                <CardContent className="p-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">${product.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => {
            const newPage = Math.max(page - 1, 1);
            setPage(newPage);
            updateSearchParamPage(newPage);
          }}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => {
            const newPage = Math.min(page + 1, totalPages);
            setPage(newPage);
            updateSearchParamPage(newPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
