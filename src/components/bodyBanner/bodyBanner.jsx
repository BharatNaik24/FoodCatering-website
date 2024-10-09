import Carousel from "react-bootstrap/Carousel";
import "./bodyBanner.css";
import { useContext } from "react";
import MyContext from "../../context/data/myContext";

function BodyBanner() {
  const context = useContext(MyContext);
  const { mode } = context;
  const slides = [
    {
      src: "https://images.squarespace-cdn.com/content/v1/612d4825ee7c3b7ba3e215b7/33a0e76c-d670-4bd8-b150-64b450896b99/Delicious+food.png?format=2500w",
      title: "Taste of South",
      description: "Flavors of the South, Crafted with Spice and Tradition",
    },
    {
      src: "https://img.freepik.com/premium-photo/indian-cuisine-diwali_1279525-1512.jpg?w=1380",
      title: "Indian Cuisine",
      description: "A Symphony of Spices, A Journey of Flavors.",
    },
    {
      src: "https://img.freepik.com/free-photo/close-up-appetizing-ramadan-meal_23-2151182547.jpg?t=st=1728065451~exp=1728069051~hmac=6744ad25e71352919ecbaf7ac8d5ea946b4092baa927f42aa1f8f8ee410f1939&w=1380",
      title: "Taste the Arabian",
      description: "Rich Traditions, Bold Flavors, Timeless Delights.",
    },
    {
      src: "https://img.freepik.com/free-photo/close-up-appetizing-ramadan-meal_23-2151182438.jpg?t=st=1728065367~exp=1728068967~hmac=a210c6331ea836a2b1c6f1f08e6da2bf3c66b57a8c459d6f3a5a924254a9f8a4&w=1380",
      title: "Taste of Middle East",
      description: "Nourishing the Soul, Sharing the Blessings.",
    },
  ];

  return (
    <Carousel data-bs-theme="dark" className="container-fluid mt-2">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-image rounded-3xl"
            src={slide.src}
            alt={`${slide.title}`}
          />
          <Carousel.Caption>
            <h5
              style={{
                color: mode === "dark" ? "#ffffff" : "#ffffff",
                fontFamily: "sans-serif",
                fontSize: "24px",
                "font-weight": "bold",
              }}
            >
              {slide.title}
            </h5>
            <p
              style={{
                color: mode === "dark" ? "#ffffff" : "#ffffff",
                fontFamily: "sans-serif",
                fontSize: "18px",
                "font-weight": "bold",
              }}
            >
              {slide.description}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BodyBanner;
