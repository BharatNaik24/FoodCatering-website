import { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import CartItem from "../cartItem/CartItem";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (acc, eachItem) => acc + eachItem.price * eachItem.quantity,
      0
    );
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
  }, [cartItems]);

  const shippingCost = calculateTotalQuantity() * 40;
  const grandTotal = totalAmount + shippingCost;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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
                <CartItem key={index} items={item} />
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
              <p>₹{totalAmount}</p>
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
