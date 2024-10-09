// import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { FaFacebookF, FaLinkedinIn, FaRegCopyright } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { SiInstagram } from "react-icons/si";

export default function Footer() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <footer
      className="text-gray-600 body-font bg-gray-300"
      style={{
        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-800"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="text-gray-600 hover:text-gray-800"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Order
                </Link>
              </li>
              <li>
                <Link
                  to="/*"
                  className="text-gray-600 hover:text-gray-800"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Local For Vocal
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-gray-800"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Cart
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Customer Service
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to={"/returnpolicy"}
                  className="text-gray-600 hover:text-gray-800"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="text-gray-600 hover:text-gray-800"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="text-gray-600 hover:text-gray-800"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Contact Us
                </Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Services
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to={"/privacypolicy"}
                  className="text-gray-600 hover:text-gray-800"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Privacy
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <img
              src="https://ecommerce-sk.vercel.app/pay.png"
              alt="paymentsImage"
            />
          </div>
        </div>
      </div>

      <div
        className="bg-gray-200"
        style={{
          backgroundColor: mode === "dark" ? "rgb(55 57 61)" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
          <Link to={"/"} className="flex">
            <div className="flex ">
              <img
                src="https://img.freepik.com/premium-vector/bharat-hindi-creative-calligraphy-lettering-text_684790-29.jpg"
                alt="Website Footer Logo"
                style={{
                  width: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
          </Link>
          <div className="flex ml-auto">
            <p
              className="flex text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4"
              style={{
                color: mode === "dark" ? "white" : "",
                fontWeight: "bold",
              }}
            >
              Copyright
              <FaRegCopyright
                style={{
                  marginLeft: "1px",
                  marginRight: "5px",
                }}
              />
              2024, All Rights Reserved Designed by{" "}
              <a
                target="_black"
                href="https://www.instagram.com/nameisbharatnaik?utm_source=qr&igsh=dTh0aW1mYmthYW0x"
                style={{
                  marginLeft: "10px",
                  color: "#01d8ff",
                  fontWeight: "bold",
                }}
              >
                BHARAT NAIK
              </a>
            </p>
          </div>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              className="text-gray-500"
              href="https://www.facebook.com"
              target="_blank"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              className="ml-3 text-gray-500"
              target="_blank"
              href="https://twitter.com/WasakiYT24"
            >
              <BsTwitterX size={20} />
            </a>
            <a
              className="ml-3 text-gray-500"
              target="_blank"
              href="https://www.instagram.com/nameisbharatnaik?utm_source=qr&igsh=dTh0aW1mYmthYW0x"
            >
              <SiInstagram size={20} />
            </a>
            <a
              className="ml-3 text-gray-500"
              href="https://www.linkedin.com/in/badavath-bharat-naik-41416b255/"
              target="_blank"
            >
              <FaLinkedinIn size={20} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
