import { useDispatch } from "react-redux";
import {
  decrementItem,
  deleteFromCart,
  incrementItem,
} from "../../redux/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { useContext, useState } from "react";
import MyContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartItem = ({ items }) => {
  const context = useContext(MyContext);
  const { mode } = context;
  const { id, title, quantity, description, imageUrl } = items;
  const [expandItem, setExpandItem] = useState(null);
  const dispatch = useDispatch();

  // Handle incrementing quantity
  const handleIncrement = () => {
    dispatch(incrementItem({ id }));
  };

  // Handle decrementing quantity
  const handleDecrement = () => {
    dispatch(decrementItem({ id }));
  };

  // Handle removing item from cart
  const handleRemove = () => {
    dispatch(deleteFromCart({ id }));
    toast.success("Deleted item from cart");
  };

  const toggleReadMore = () => {
    setExpandItem((prev) => (prev === id ? null : id));
  };

  const navi = useNavigate();

  return (
    <div
      className={`cart-item p-0 m-0 mb-4 rounded-lg shadow-lg`}
      style={{
        border: mode === "dark" ? "2px solid #ffffff" : "1px solid #000000",
      }}
    >
      <div className="flex p-4">
        <img
          onClick={() => navi(`/productinfo/${id}`)}
          src={imageUrl}
          alt="productImage"
          className="mr-5"
          style={{
            width: "auto",
            height: "150px",
            objectFit: "contain",
            borderRadius: "20px",
          }}
        />
        <div className="cart-item-info">
          <h1 className="text-lg font-bold">{title}</h1>
          <p>
            {expandItem === id ? description : `${description.slice(0, 60)}...`}
            <button onClick={toggleReadMore} className="text-blue-500 ml-2">
              {expandItem === id ? "Read Less" : "Read More"}
            </button>
          </p>
          <div className="flex justify-between cart-item-controls">
            <div className="flex items-center">
              <button
                onClick={handleDecrement}
                disabled={quantity === 1}
                className={`p-1 rounded ${
                  quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaMinus size={20} />
              </button>
              <p className="text-lg text-center w-8 mx-2">{quantity}</p>
              <button onClick={handleIncrement} className="p-1 rounded">
                <FaPlus size={20} />
              </button>
            </div>
            <button onClick={handleRemove} className="p-2 rounded">
              <MdDeleteOutline size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
