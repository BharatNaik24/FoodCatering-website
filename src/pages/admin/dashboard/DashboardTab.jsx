import { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import {
  MdDeleteOutline,
  MdEdit,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function DashboardTab() {
  const context = useContext(myContext);
  const { mode, products, deleteProduct, editEventHandle, orders, user } =
    context;

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleModal = (action) => setIsOpen(action === "open");

  const tabClass = `font-medium border-b-2 text-xl rounded-lg text-center px-5 py-1.5 ${
    mode === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700"
  }`;
  const tableClass = `w-full text-sm text-left ${
    mode === "dark" ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-200"
  }`;

  const add = () => {
    navigate("/addproduct");
  };

  return (
    <div className={`container mx-auto ${mode === "dark" ? "dark-mode" : ""}`}>
      <div className="tab container mx-auto">
        <Tabs defaultIndex={0}>
          <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
            <Tab>
              <button
                type="button"
                className={`${tabClass} border-purple-500`}
                aria-label="Products Tab"
              >
                <div className="flex gap-2 items-center">
                  <MdOutlineProductionQuantityLimits /> Products
                </div>
              </button>
            </Tab>
            <Tab>
              <button
                type="button"
                className={`${tabClass} border-pink-500`}
                aria-label="Orders Tab"
              >
                <div className="flex gap-2 items-center">
                  <AiFillShopping /> Orders
                </div>
              </button>
            </Tab>
            <Tab>
              <button
                type="button"
                className={`${tabClass} border-green-500`}
                aria-label="Users Tab"
              >
                <div className="flex gap-2 items-center">
                  <FaUser /> Users
                </div>
              </button>
            </Tab>
          </TabList>
          <TabPanel>
            <div className="px-4 md:px-0 mb-16">
              <h1 className="text-center mb-5 text-3xl font-semibold underline">
                Product Details
              </h1>
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => handleModal("open")}
                  className="focus:outline-none text-white bg-pink-600 border rounded-lg text-sm px-5 py-2.5"
                  aria-label="Add Product"
                >
                  <div className="gap-2 items-center">
                    <button onClick={add} className="flex">
                      <span
                        style={{
                          marginRight: "10px",
                          padding: "0px",
                        }}
                      >
                        Add Product
                      </span>
                      <FaCartPlus size={20} />
                    </button>
                  </div>
                </button>
              </div>
              <div className="relative">
                <table className={tableClass}>
                  <thead
                    className={`text-xs uppercase ${
                      mode === "dark"
                        ? "bg-white text-black"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <tr className="flex justify-between">
                      <th className="px-5 py-3">S.No</th>
                      <th className="px-5 py-3">Item Details</th>
                      <th className="px-5 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((eachProduct, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            backgroundColor:
                              mode === "dark" ? "#374151" : "white",
                            color: mode === "dark" ? "white" : "black",
                          }}
                        >
                          <tr className="flex justify-between">
                            <td className="px-5 py-2">{index + 1}.</td>
                            <td
                              className="px-2 py-2 flex"
                              style={{
                                marginLeft: "auto",
                              }}
                            >
                              <img
                                className=""
                                style={{
                                  width: "100px",
                                  height: "80px",
                                  objectFit: "fill",
                                }}
                                src={eachProduct.imageUrl}
                                alt={eachProduct.title}
                              />
                              <div
                                className="px-4 py-auto flex flex-col"
                                style={{
                                  minWidth: "250px",
                                  maxWidth: "auto",
                                  marginLeft: "auto",
                                }}
                              >
                                <span>Item Name: {eachProduct.title}</span>
                                <span>Price: ₹{eachProduct.price}/-</span>
                                <span>
                                  Category: {eachProduct.category.toUpperCase()}
                                </span>
                                <span>Added: {eachProduct.date}</span>
                              </div>
                            </td>
                            <td
                              className="px-6 py-2 mt-4"
                              style={{
                                marginLeft: "auto",
                                marginRight: "1%",
                              }}
                            >
                              <div className="flex gap-3 ">
                                <button
                                  className="hover:cursor-pointer"
                                  onClick={() => deleteProduct(eachProduct)}
                                >
                                  <MdDeleteOutline size={30} />
                                </button>
                                <Link to="/updateproduct">
                                  <button
                                    onClick={() => editEventHandle(eachProduct)}
                                    className="hover:cursor-pointer"
                                  >
                                    <MdEdit size={25} />
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <hr
                            style={{
                              width: "100%",
                              height: "1px",
                            }}
                          />
                        </div>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div>
              <h1
                className="text-center m-2 text-3xl font-semibold underline"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Order Details
              </h1>
            </div>
            <div
              className={`relative mb-16 ${
                mode === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {orders.map((allorder, index) => {
                return (
                  <table
                    key={index}
                    className={`w-full text-sm text-left ${
                      mode === "dark"
                        ? "text-gray-400 bg-gray-800"
                        : "text-gray-500 bg-gray-200"
                    }`}
                  >
                    <thead
                      className={`text-xs uppercase ${
                        mode === "dark"
                          ? "bg-white text-black"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <tr>
                        <th scope="col" className="px-1 py-1 text-center">
                          S.No.
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-center underline"
                        >
                          Order Details
                        </th>
                      </tr>
                    </thead>
                    {allorder.cartItems.map((item, index) => {
                      const { title, imageUrl, price } = item;
                      return (
                        <tbody key={index}>
                          <tr
                            className={`border-b ${
                              mode === "dark"
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-black"
                            }`}
                          >
                            <td className="px-auto py-4 text-center">
                              {index + 1}.
                            </td>
                            <th
                              scope="row"
                              className="px-2 py-4 font-medium whitespace-nowrap"
                            >
                              <div className="flex justify-center">
                                <img
                                  className="w-16 mb-2"
                                  src={imageUrl}
                                  alt="img"
                                />
                                <div className="flex flex-col mx-4">
                                  <span>
                                    <strong>Item: </strong> {title}
                                  </span>
                                  <span>
                                    <strong>Price:</strong> ₹{price} /-
                                  </span>
                                  <span>
                                    <strong> Customer Name: </strong>
                                    {allorder.addressInfo.name.toUpperCase()}
                                  </span>
                                  <span className="mr-3">
                                    <strong> Address: </strong>
                                    {allorder.addressInfo.address.toUpperCase()}
                                    ,{allorder.addressInfo.pincode}
                                  </span>
                                  <span>
                                    <strong> Mobile: </strong>
                                    {allorder.addressInfo.phoneNumber}
                                  </span>
                                  <span>
                                    <strong> Email: </strong>
                                    {allorder.email}
                                  </span>
                                  <span>
                                    <strong>{allorder.date}</strong>
                                  </span>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                );
              })}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="relative overflow-x-auto mb-10">
              <h1 className="text-center mb-5 text-3xl font-semibold underline">
                User Details
              </h1>
              <table className={tableClass}>
                <thead
                  className={`text-xs uppercase ${
                    mode === "dark"
                      ? "bg-white text-black"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S.No
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Uid
                    </th>
                  </tr>
                </thead>
                {user.map((item, index) => {
                  const { name, uid, email, time } = item;
                  return (
                    <tbody key={uid}>
                      <tr
                        className="bg-gray-50 border-b  dark:border-gray-700"
                        style={{
                          backgroundColor:
                            mode === "dark" ? "rgb(46 49 55)" : "",
                          color: mode === "dark" ? "white" : "",
                        }}
                      >
                        <td
                          className="px-6 py-4 text-black "
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {index + 1}.
                        </td>
                        <td
                          className="px-6 py-4 text-black "
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {name}
                        </td>
                        <td
                          className="px-6 py-4 text-black "
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {email}
                        </td>
                        <td
                          className="px-6 py-4 text-black "
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {uid}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default DashboardTab;
