import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function ProductAdd() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const addProductMutation = useMutation({
    mutationFn: (newProduct) => axios.post("/products/add", newProduct),
    onSuccess: () => reset(),
  });

  function onSubmit(data) {
    console.log(data);
    addProductMutation.mutate(data);
  }

  return (
    <form
      className="max-w-md py-10 mx-auto lg:max-w-7xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap justify-center gap-8 -mx-2">
        <div className="w-full px-2 mb-5 lg:mb-0">
          <input
            className="w-full px-12 py-5 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
        </div>
        <div className="w-full px-2 mb-5 lg:mb-0">
          <input
            className="w-full px-12 py-5 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
        </div>
        <div className="w-full px-2 mb-5 lg:mb-0">
          <textarea
            className="w-full px-12 py-5 text-xl border-2 border-blue-500 h-80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Description"
            {...register("description")}
          />
        </div>
        <div className="w-full px-2 mb-5 lg:mb-0">
          <input
            className="w-full px-12 py-5 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="text"
            placeholder="Thumbnail"
            {...register("thumbnail")}
          />
        </div>

        <div className="w-full px-2 mb-5 lg:mb-0">
          <select
            className="w-full border-2  py-5 px-12 text-xl border-blue-500 rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            {...register("category")}
            defaultValue="choose"
          >
            <option value="choose" disabled>
              Choose a country
            </option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="pc">PC</option>
            <option value="tablets">Tablets</option>
          </select>
        </div>

        <div className="w-full px-2 lg:w-auto">
          <button className="block w-full h-full px-10 py-5 text-xl font-medium tracking-tighter text-white bg-blue-500 xl:w-auto font-heading hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
            {addProductMutation.isLoading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
