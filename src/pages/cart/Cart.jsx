import { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { clearCart, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { FaMinus, FaPlus } from "react-icons/fa6";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted item from cart");
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [expandItem, setExpandItem] = useState(null);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, eachItem) => acc + parseInt(eachItem.price, 10),
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  const shippingCost = cartItems.length * 40;
  const grandTotal = totalAmount + shippingCost;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleReadMore = (item) => {
    if (expandItem === item.id) {
      setExpandItem(null);
    } else {
      setExpandItem(item.id);
    }
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("Please fill all the fields");
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    var options = {
      key: "rzp_test_CrdCRb7KBGfMc3",
      key_secret: "FY2QdJwV1VstLKUJwLzG84ip",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "Bharat",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userId: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
        };

        try {
          const orderRef = collection(fireDB, "order");
          addDoc(orderRef, orderInfo);
          dispatch(clearCart());
          localStorage.removeItem("cart");
        } catch (error) {
          console.log(error);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  const [itemsValue, setItem] = useState(1);

  const onClickIncrement = () => {
    setItem(itemsValue + 1);
  };

  const onClickDecrement = () => {
    if (itemsValue > 1) {
      setItem(itemsValue - 1);
    } else {
      setItem(1);
    }
  };

  return (
    <Layout>
      <div
        className={`h-screen-auto pt-5 pb-5 ${
          mode === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className={`justify-between mb-6 rounded-lg border drop-shadow-xl p-6 sm:flex sm:justify-start ${
                    mode === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <img
                    src={item.imageUrl || "https://dummyimage.com/400x400"}
                    alt={item.title || "product-image"}
                    className="w-full h-40 rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold">
                        {item.title || "Product Title"}
                      </h2>
                      <h2 className="text-sm">
                        {expandItem === item.id
                          ? item.description
                          : `${item.description.slice(0, 100)}...`}
                        <button
                          className="text-blue-500"
                          onClick={() => toggleReadMore(item)}
                        >
                          {expandItem === item.id
                            ? "...Read Less"
                            : "Read More"}
                        </button>
                      </h2>
                      <p className="mt-1 text-xs font-semibold">
                        ₹{item.price}
                      </p>
                      <div className="flex">
                        <button onClick={onClickDecrement}>
                          <FaMinus />
                        </button>
                        <p>{itemsValue}</p>
                        <button onClick={onClickIncrement}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <button
                        onClick={() => deleteCart(item)}
                        aria-label={`Delete ${item.title || "product"}`}
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>

          <div
            className={`mt-6 h-full rounded-lg border p-6 shadow-md md:mt-0 md:w-1/3 ${
              mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <div className="mb-2 flex justify-between">
              <p>Subtotal</p>
              <p>₹{totalAmount * itemsValue}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹{shippingCost}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold">Total</p>
              <p className="mb-1 text-lg font-bold">₹{grandTotal}</p>
            </div>
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
