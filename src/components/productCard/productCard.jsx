import { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard() {
  const context = useContext(myContext);
  const { mode, products, loading, searchkey, filterType, filterPrice } =
    context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  // Filter logic
  const filteredProducts = products
    .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
    .filter((obj) =>
      filterType
        ? obj.category.toLowerCase() === filterType.toLowerCase()
        : true
    )
    .filter((obj) => (filterPrice ? obj.price <= filterPrice : true));

  // Get only the first 4 products
  const recentProducts = filteredProducts.slice(0, 4);

  return (
    <section className="flex min-h-screen text-gray-600 body-font w-full">
      <div className="container-fluid px-2 py-8 md:py-16 mx-auto">
        <div className="lg:w-2/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-orange-600 rounded"></div>
        </div>

        <div className="flex flex-wrap mx-auto -m-4">
          {loading ? (
            <div className="flex justify-center w-full">
              <Spinner animation="border" variant="danger" size="lg" />
            </div>
          ) : (
            recentProducts.map((eachItem) => (
              <div
                onClick={() => {
                  if (currentUser) {
                    navigate(`/productinfo/${eachItem.id}`);
                  } else {
                    handleLoginRedirect();
                  }
                }}
                key={eachItem.id}
                className="p-4 lg:w-1/4 md:w-1/2 sm:w-full drop-shadow-lg"
                style={{
                  minHeight: "400px",
                }}
              >
                <div
                  className="h-full flex flex-col justify-between border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="flex justify-center cursor-pointer">
                    <img
                      className="rounded-2xl w-full h-80 p-4 hover:scale-110 transition-transform duration-300 ease-in-out mb-0"
                      src={eachItem.imageUrl}
                      alt={eachItem.title}
                      style={{
                        maxWidth: "100%",
                        objectFit: "cover", // Ensures the image covers the space
                        borderRadius: "60px",
                      }}
                    />
                  </div>
                  <div
                    className="flex-grow p-4 flex flex-col justify-end"
                    style={{ marginTop: "auto" }}
                  >
                    <h1
                      className="title-font text-lg font-medium text-gray-900 mb-1 mt-5"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {eachItem.title}
                    </h1>
                    <p
                      className="leading-relaxed mb-1 flex-grow mt-auto"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      ₹ {eachItem.price}
                    </p>
                    <div className="flex justify-center mt-3 mb-0 pb-0">
                      <button
                        onClick={(e) => {
                          if (currentUser) {
                            e.stopPropagation();
                            addCart(eachItem);
                          } else {
                            handleLoginRedirect();
                          }
                        }}
                        type="button"
                        className="btn btn-dark w-full btnnnnn"
                        style={{
                          padding: "12px",
                          color: mode === "dark" ? "black" : "white",
                          backgroundColor: mode === "dark" ? "white" : "black",
                          borderRadius: "12px",
                        }}
                      >
                        {currentUser ? "Add To Cart" : "Login to Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/allproducts")} // Adjust the route as needed
            type="button"
            className=""
            style={{
              padding: "12px",
              color: mode === "dark" ? "black" : "white",
              backgroundColor: mode === "dark" ? "white" : "black",
              borderRadius: "12px",
            }}
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
