import Layout from "../../components/layout/Layout";

import BodyBanner from "../../components/bodyBanner/bodyBanner";
import Filter from "../../components/filter/filter";
import ProductCard from "../../components/productCard/productCard";
import Testimonial from "../../components/testimonials/Testimonials";
import Track from "../../components/track/Track";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import "./home.css";

function Home() {
  return (
    <Layout className="">
      <BodyBanner />
      <div className="flexPlay container-fluid">
        <Filter />
        <ProductCard />
      </div>
      <Track />
      <Testimonial />
    </Layout>
  );
}

export default Home;
