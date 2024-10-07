import { Fragment, useContext, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiShoppingCart, FiSun } from "react-icons/fi";
import myContext from "../../context/data/myContext";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "./Navbar.css";

const promoMessages = [
  "Get free delivery on orders over ₹300",
  "10% off on your first order! Use code: FIRST10",
  "Order now and get a complimentary dessert on orders over ₹500",
  "Happy Hour Special: Buy one, get one free on beverages from 3-5 PM",
  "Try our new vegan dishes! Healthy, tasty, and 100% plant-based",
  "Free side dish on all dine-in orders above ₹400",
  "Family Combo Offer: Get 20% off on group orders of 4 or more",
  "Daily Special: Enjoy chef's pick of the day at a 15% discount",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { toggleMode, mode } = context;

  const user = JSON.parse(localStorage.getItem("user"));

  const getColor = (mode) => (mode === "dark" ? "text-white" : "text-gray-900");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    document.body.className =
      mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  }, [mode]);

  return (
    <div
      className={`sticky top-0 z-50 ${
        mode === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className={`relative flex w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl ${
                  mode === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                <div className="flex ml-auto px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross2
                      size={30}
                      style={{
                        color: mode === "dark" ? "#fff" : "#000",
                      }}
                    />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6 flex flex-col">
                  {user ? (
                    <Link
                      to="/allproducts"
                      className="text-sm font-medium"
                      style={{ color: getColor(mode) }}
                    >
                      All Products
                    </Link>
                  ) : (
                    ""
                  )}
                  {user && (
                    <Link
                      to="/order"
                      className="text-sm font-medium"
                      style={{ color: getColor(mode) }}
                    >
                      Order
                    </Link>
                  )}
                  {user?.user?.email === "bbnaik05@gmail.com" && (
                    <Link
                      to="/dashboard"
                      className="text-sm font-medium"
                      style={{ color: getColor(mode) }}
                    >
                      Admin
                    </Link>
                  )}
                  {user && (
                    <a
                      onClick={logout}
                      className="text-sm font-medium cursor-pointer"
                      style={{ color: getColor(mode) }}
                    >
                      Logout
                    </a>
                  )}
                  {user && (
                    <div className="flow-root">
                      <Link
                        to="/"
                        className="-m-2 block p-2 font-medium cursor-pointer"
                      >
                        <img
                          className="inline-block w-10 h-10 rounded-full"
                          src="https://i.postimg.cc/xCBTFPV2/ab262296-87d5-4d0a-b118-66d4f87a4d2f.jpg"
                          alt="User"
                        />
                      </Link>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-base font-medium"
                      style={{ color: getColor(mode) }}
                    >
                      INDIA
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
                <div className="border-t border-gray-200 px-4 py-6">
                  {!user ? (
                    <Link className="-m-2 flex items-center" to={"/login"}>
                      <div className="-m-1 flex items-center">
                        <FaRegUser size={25} />
                        <span className="ml-3 block text-base font-medium">
                          Login
                        </span>
                      </div>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header
        className={`relative ${
          mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <nav aria-label="Top" className={`px-4 sm:px-6 lg:px-8 shadow-xl`}>
          <div>
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
                style={{
                  backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                }}
              >
                <span className="sr-only">Open menu</span>
                <GiHamburgerMenu size={30} />
              </button>

              <div className="ml-4 flex lg:ml-0">
                <Link to="/" className="flex">
                  <img
                    src="https://img.freepik.com/premium-vector/bharat-hindi-creative-calligraphy-lettering-text_684790-29.jpg"
                    alt="WebsiteLogo"
                    style={{
                      width: "100px",
                      borderRadius: "10px",
                    }}
                  />
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <Link
                      to="/allproducts"
                      className="text-sm font-medium"
                      style={{ color: getColor(mode) }}
                    >
                      All Products
                    </Link>
                  ) : (
                    ""
                  )}
                  {user && (
                    <Link
                      to="/order"
                      className="text-sm font-medium"
                      style={{ color: getColor(mode) }}
                    >
                      Order
                    </Link>
                  )}
                  {user?.user?.email === "bbnaik05@gmail.com" && (
                    <Link
                      to="/dashboard"
                      className="text-sm font-medium"
                      style={{ color: getColor(mode) }}
                    >
                      Admin
                    </Link>
                  )}
                  {user && (
                    <a
                      onClick={logout}
                      className="text-sm font-medium cursor-pointer"
                      style={{ color: getColor(mode) }}
                    >
                      Logout
                    </a>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-sm font-medium"
                      style={{ color: getColor(mode) }}
                    >
                      INDIA
                    </span>
                  </a>
                </div>

                {user && (
                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="flex items-center">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://i.postimg.cc/xCBTFPV2/ab262296-87d5-4d0a-b118-66d4f87a4d2f.jpg"
                        alt="user"
                      />
                    </a>
                  </div>
                )}

                <button onClick={toggleMode} className="ml-4">
                  {mode === "dark" ? (
                    <FiSun size={30} className="text-orange-600" />
                  ) : (
                    <BsFillCloudSunFill size={30} className="text-black" />
                  )}
                </button>

                {user ? (
                  <Link to="/cart" className="ml-4">
                    <FiShoppingCart size={30} />
                    <span className="absolute top-5 right-5 bg-black text-white text-xs font-bold rounded-full px-1">
                      {cartItems.length}
                    </span>
                  </Link>
                ) : null}

                {!user ? (
                  <Link className="ml-4" to={"/login"}>
                    <div>
                      <FaRegUser size={25} />
                    </div>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </nav>
        <div className="bg-black h-10 flex items-center overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content">
              {promoMessages.map((message, index) => (
                <p key={index} className="text-white text-sm font-medium px-4">
                  {message}
                </p>
              ))}
            </div>
            <div className="marquee-content">
              {promoMessages.map((message, index) => (
                <p key={index} className="text-white text-sm font-medium px-4">
                  {message}
                </p>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
