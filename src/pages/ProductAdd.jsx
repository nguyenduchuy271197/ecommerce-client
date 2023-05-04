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
    mutationFn: (newProduct) =>
      axios.post("http://localhost:4000/products/add", newProduct),
    onSuccess: () => reset(),
  });

  function onSubmit(data) {
    console.log(data);
    addProductMutation.mutate(data);
  }

  return (
    <form
      className="max-w-md lg:max-w-7xl mx-auto py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap gap-8 justify-center -mx-2">
        <div className="w-full px-2 mb-5 lg:mb-0">
          <input
            className="w-full py-5 px-12 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
        </div>
        <div className="w-full px-2 mb-5 lg:mb-0">
          <input
            className="w-full py-5 px-12 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
        </div>
        <div className="w-full px-2 mb-5 lg:mb-0">
          <textarea
            className="w-full h-80 py-5 px-12 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Description"
            {...register("description")}
          />
        </div>
        <div className="w-full px-2 mb-5 lg:mb-0">
          <input
            className="w-full py-5 px-12 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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

        <div className="w-full lg:w-auto px-2">
          <button className="block py-5 px-10 h-full w-full xl:w-auto text-xl text-white font-medium tracking-tighter font-heading bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
            {addProductMutation.isLoading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
