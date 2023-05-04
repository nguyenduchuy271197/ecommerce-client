import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [q, setQ] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", { q: searchParams.get("q") }],
    queryFn: () => {
      if (searchParams.get("q")) {
        return axios.get(`/products/search?q=${searchParams.get("q")}`);
      }
      return axios.get("/products");
    },
    select: (res) => res.data,
  });

  return (
    <div className="container mx-auto">
      <div className="flex">
        <input
          className="w-full py-5 px-12 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="text"
          placeholder="Search products..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
          }}
        />
        <button
          className="block py-5 px-10 h-full w-full xl:w-auto text-xl text-white font-medium tracking-tighter font-heading bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
          onClick={() => setSearchParams({ q: q })}
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-4 gap-6 py-10">
          {products.length === 0 ? (
            <div>No items found!</div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                thumbnail={product.thumbnail}
                price={product.price}
                category={product.category}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
