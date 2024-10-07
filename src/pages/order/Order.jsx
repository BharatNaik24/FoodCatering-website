import { useContext, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { FaLink } from "react-icons/fa";

import { MdDeleteOutline } from "react-icons/md";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useContext(myContext);
  const { mode, loading, orders, deleteOrder } = context; // Make sure setOrders is included

  const userOrders = orders?.filter((order) => order.userId === userid) || [];
  console.log("User Orders:", userOrders);

  // State to keep track of the currently expanded item
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleShowDis = (itemId) => {
    setExpandedItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  const handleDeleteOrder = (orderId) => {
    console.log("Deleting order with ID:", orderId); // Check if this logs the correct order ID
    deleteOrder(orderId);
  };

  return (
    <Layout>
      {loading && <Loader />}

      {userOrders.length === 0 ? (
        <h2 className="text-center text-2xl text-red-500">No Orders</h2>
      ) : (
        <div
          className={`h-screen-auto p-10 ${
            mode === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="mx-auto max-w-5xl mb-3 justify-between px-auto md:space-x-0 xl:px-0"
            >
              {order.cartItems.map((item) => (
                <div key={item.id} className="rounded-lg md:w-4/4 flex">
                  <div
                    className={`justify-between mb-6 mx-2 rounded-lg p-6 shadow-md sm:flex sm:justify-start ${
                      mode === "dark"
                        ? "bg-gray-800 text-white border border-gray-600"
                        : "bg-white text-black border border-gray-300"
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt="product-image"
                      className="w-full h-auto rounded-lg sm:w-20"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-0 sm:mt-0">
                        <h2
                          className={`text-lg font-bold ${
                            mode === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </h2>
                        <div>
                          <p
                            className={`mt-1 text-md ${
                              mode === "dark" ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {expandedItemId !== item.id
                              ? `${item.description.slice(0, 150)}...`
                              : item.description}{" "}
                            <button
                              onClick={() => handleShowDis(item.id)}
                              className="text-primary"
                            >
                              {expandedItemId === item.id
                                ? "Read Less"
                                : "Read More"}
                            </button>
                          </p>
                        </div>
                        <p
                          className={`mt-1 text-lg ${
                            mode === "dark" ? "text-white" : "text-gray-700"
                          }`}
                        >
                          ₹ {item.price}
                        </p>
                      </div>
                    </div>
                    <FaLink size={30} className="m-auto" />
                    <div
                      style={{
                        minWidth: "20px",
                        maxWidth: "auto",
                        borderRadius: "20px",
                        marginLeft: "10px",
                      }}
                    >
                      <p>
                        Customer Name: {order.addressInfo.name.toUpperCase()}
                      </p>
                      <p>Contact: {order.addressInfo.phoneNumber}</p>
                      <div className="flex justify-end mt-2">
                        <button onClick={() => deleteOrder(order.paymentId)}>
                          <MdDeleteOutline size={30} />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.paymentId)}
                        >
                          Delete Order
                        </button>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Order;
