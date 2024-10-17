import { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import Filter from "../../components/filter/filter";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Allproducts.css";
import { useNavigate } from "react-router-dom";

function Allproducts() {
  const context = useContext(myContext);
  const { mode, products, loading, searchkey, filterType, filterPrice } =
    context;
  const navigater = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter logic
  const filteredProducts = products
    .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
    .filter((obj) =>
      filterType
        ? obj.category.toLowerCase() === filterType.toLowerCase()
        : true
    )
    .filter((obj) => (filterPrice ? obj.price <= filterPrice : true));

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <div className="flexCon container-fluid">
        <Filter />
        <section className="flex min-h-screen text-gray-600 body-font w-full">
          <div className="container-fluid px-2 py-4 mx-auto">
            <div className="lg:w-2/2 w-full mb-4 lg:mb-6">
              <h1
                className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Our Dishes
              </h1>
              <div className="h-1 w-20 bg-orange-600 rounded"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {loading ? (
                <div className="flex justify-center w-full">
                  <Spinner animation="border" variant="danger" size="lg" />
                </div>
              ) : (
                filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 drop-shadow-lg"
                    onClick={(e) => {
                      if (currentUser) {
                        e.stopPropagation();
                        navigate(`/productinfo/${item.id}`);
                      } else {
                        handleLoginRedirect();
                      }
                    }}
                  >
                    <div
                      className={`h-full flex flex-col justify-between border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden ${
                        mode === "dark" ? "bg-gray-800 text-white" : "bg-white"
                      }`}
                    >
                      <div className="flex justify-center cursor-pointer">
                        <img
                          className="rounded-2xl w-full h-48 p-4 hover:scale-105 transition-transform duration-300 ease-in-out"
                          src={item.imageUrl}
                          alt={item.title}
                          style={{
                            objectFit: "cover",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                      <div className="flex-grow p-4 flex flex-col">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 mt-0">
                          {item.brand}
                        </h2>
                        <h1 className="title-font text-lg font-medium mb-1">
                          {item.title}
                        </h1>
                        <p className="leading-relaxed mb-1">₹ {item.price}</p>
                        <div className="flex justify-center mt-2 mb-0 pb-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentUser) {
                                addCart(item);
                              } else {
                                navigater("/login");
                              }
                            }}
                            type="button"
                            className=" w-full "
                            style={{
                              padding: "12px",
                              color: mode === "dark" ? "black" : "white",
                              backgroundColor:
                                mode === "dark" ? "white" : "black",
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
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Allproducts;
