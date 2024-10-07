import React, { useContext, useEffect, useState } from "react";
import {
  FaStar,
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaHeart,
} from "react-icons/fa"; // Importing icons from react-icons
import { MdAddShoppingCart } from "react-icons/md"; // Importing additional icons
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../firebase/firebaseConfig";

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [products, setProducts] = useState("");
  const params = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));

      setProducts(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (products) => {
    dispatch(addToCart(products));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {products && (
            <div className="lg:w-4/5 mx-auto flex flex-wrap ">
              <div className="">
                <img
                  alt="ecommerce"
                  className="lg:w-1/3 w-full lg:h-auto object-cover  object-center rounded"
                  src={products.imageUrl}
                  style={{
                    width: "400px",
                    height: "auto",
                  }}
                />
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {products.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <FaStar className="w-4 h-4 text-indigo-500" />
                    <FaStar className="w-4 h-4 text-indigo-500" />
                    <FaStar className="w-4 h-4 text-indigo-500" />
                    <FaStar className="w-4 h-4 text-indigo-500" />
                    <FaStar className="w-4 h-4 text-indigo-500 opacity-50" />
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                    <a className="text-gray-500">
                      <FaFacebookF className="w-5 h-5" />
                    </a>
                    <a className="text-gray-500">
                      <FaTwitter className="w-5 h-5" />
                    </a>
                    <a className="text-gray-500">
                      <FaPinterestP className="w-5 h-5" />
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                  {products.description}
                </p>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{products.price}
                  </span>
                  <button
                    onClick={() => addCart(products)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    <MdAddShoppingCart className="mr-2" />
                    Add To Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <FaHeart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
