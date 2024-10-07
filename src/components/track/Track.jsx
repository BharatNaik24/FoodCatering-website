import { useContext } from "react";
import myContext from "../../context/data/myContext";

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdLocalDining, MdOutlineDeliveryDining } from "react-icons/md";

function Track() {
  const context = useContext(myContext);
  const { mode } = context;

  const cardData = [
    {
      icon: <MdLocalDining className="w-12 h-12 mb-3 inline-block" />,
      title: "Delicious Meals",
      description: "Explore a wide variety of dishes prepared by top chefs.",
    },
    {
      icon: (
        <MdOutlineDeliveryDining className=" w-12 h-12 mb-3 inline-block" />
      ),
      title: "Fast Delivery",
      description: "Enjoy quick delivery to your doorstep, hot and fresh.",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-12 h-12 mb-3 inline-block" />,
      title: "Affordable Prices",
      description: "Get great value for your money with our exclusive offers.",
    },
  ];

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-5 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            {cardData.map((card, index) => (
              <div key={index} className="p-4 md:w-1/3 sm:w-1/2 w-full">
                <div
                  className="border-2 hover:cursor-pointer hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div style={{ color: "#FF5722" }}>{card.icon}</div>
                  <h2
                    className="title-font font-medium text-lg text-gray-900"
                    style={{
                      color: mode === "dark" ? "white" : "",
                      flexGrow: "1",
                    }}
                  >
                    {card.title}
                  </h2>
                  <p
                    className="leading-relaxed"
                    style={{
                      flexGrow: "1",
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Track;
