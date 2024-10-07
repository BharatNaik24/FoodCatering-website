import { useContext } from "react";
import myContext from "../../context/data/myContext";
import { IoSearchSharp } from "react-icons/io5";

function Filter() {
  const context = useContext(myContext);
  const {
    mode,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    products,
  } = context;

  // Function to reset all filters to default values
  const handleResetFilters = () => {
    setSearchkey("");
    setFilterType("");
    setFilterPrice("");
  };

  // Extract unique categories and prices from products
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  const uniquePrices = [...new Set(products.map((product) => product.price))];

  return (
    <div
      className="mt-4"
      style={{
        maxWidth: "auto",
        minWidth: "240px",
        maxHeight: "700px",
        minHeight: "auto",
      }}
    >
      <div className="mx-auto px-3 mt-5 h-full">
        <div
          className={`flex flex-col justify-center p-3 rounded-lg h-full border border-gray-200 shadow-md 
            ${
              mode === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black"
            }`}
        >
          {/* Search Input */}
          <div className="relative">
            <div className="absolute flex items-center ml-2 h-full">
              <IoSearchSharp size={20} />
            </div>
            <input
              type="text"
              name="searchkey"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              id="searchkey"
              placeholder="Search here"
              className={`px-8 py-3 w-full rounded-md border-transparent outline-0 text-sm 
                ${mode === "dark" ? "bg-gray-700 text-white" : "bg-white"}`}
            />
          </div>

          <div className="flex items-center justify-between mt-4 mb-0">
            <p className="font-medium">Filters</p>
          </div>

          <div className="grid gap-3 mt-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-4 py-3 w-full rounded-md border-transparent outline-0 text-sm 
                ${mode === "dark" ? "bg-gray-700 text-white" : "bg-gray-50"}`}
            >
              <option value="">Select Category</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className={`px-4 py-3 w-full rounded-md border-transparent outline-0 text-sm 
                ${mode === "dark" ? "bg-gray-700 text-white" : "bg-gray-50"}`}
            >
              <option value="">Select Price</option>
              {uniquePrices.map((price) => (
                <option key={price} value={price}>
                  ₹ {price}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filter Button */}
          <div>
            <button
              onClick={handleResetFilters}
              className={`px-4 mt-3 mx-auto py-3 rounded-md text-sm font-medium 
                ${
                  mode === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-50 text-gray-800 hover:bg-gray-200"
                }`}
              style={{ width: "100%" }}
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
