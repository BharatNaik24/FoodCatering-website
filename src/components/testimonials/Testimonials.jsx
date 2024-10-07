import { useContext } from "react";
import Slider from "react-slick";
import myContext from "../../context/data/myContext";
/* In your main CSS file */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample data for customer testimonials
const testimonials = [
  {
    name: "Bharat Naik Badavath",
    position: "FrontEnd Developer",
    review: "The food is absolutely delicious! Best service in town.",
    image:
      "https://i.postimg.cc/xCBTFPV2/ab262296-87d5-4d0a-b118-66d4f87a4d2f.jpg",
  },
  {
    name: "John Doe",
    position: "Food Critic",
    review:
      "An amazing experience! The flavors were exquisite and the presentation was top-notch.",
    image: "https://cdn-icons-png.flaticon.com/128/2763/2763444.png",
  },
  {
    name: "Jane Smith",
    position: "CTO",
    review:
      "Great value for money. The meals are well-prepared and delightful.",
    image:
      "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Alice Johnson",
    position: "Food Blogger",
    review:
      "The vegan options here are incredible! I can't get enough of the lentil burger.",
    image:
      "https://images.unsplash.com/photo-1708467374959-e5588da12e8f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bob Martin",
    position: "Chef",
    review:
      "As a chef, I appreciate the quality of ingredients used here. Truly outstanding!",
    image:
      "https://plus.unsplash.com/premium_photo-1669879825881-6d4e4bde67d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
  },
  {
    name: "Charlie Brown",
    position: "Restaurant Manager",
    review:
      "The ambiance complements the delicious food perfectly. A must-visit!",
    image:
      "https://plus.unsplash.com/premium_photo-1664392248318-4e1d9361726e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Diana Prince",
    position: "Nutritionist",
    review: "Healthy and tasty! This place proves you can have both.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Edward Elric",
    position: "Anime Fan",
    review:
      "The themed dishes are fun and flavorful! I loved the alchemist special.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fiona Gallagher",
    position: "Artist",
    review:
      "Every dish is a work of art. The plating is just as impressive as the taste.",
    image:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "George Washington",
    position: "Historical Chef",
    review:
      "The classic recipes are made with a modern twist, and it works beautifully!",
    image:
      "https://images.unsplash.com/photo-1508179522353-11ba468c4a1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Hannah Baker",
    position: "Food Photographer",
    review:
      "Perfect lighting for food photos! Every dish looks Instagram-worthy.",
    image:
      "https://images.unsplash.com/photo-1519419691348-3b3433c4c20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjAxfHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Ian Malcolm",
    position: "Paleontologist",
    review: "The flavors are Jurassic-sized! A true culinary adventure.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEzfHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Jack Sparrow",
    position: "Captain",
    review: "A feast fit for a pirate! The seafood dishes are amazing.",
    image:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI3fHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Katie Holmes",
    position: "Actress",
    review: "I had a fantastic dining experience! The desserts are to die for.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Liam Neeson",
    position: "Actor",
    review: "Exceptional service and flavors that leave a lasting impression.",
    image:
      "https://images.unsplash.com/photo-1461800919507-79b16743b257?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMyfHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Mia Thermopolis",
    position: "Princess",
    review: "The royal treatment with every meal. I felt like a queen!",
    image:
      "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI4fHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Nina Simone",
    position: "Musician",
    review: "The soulful flavors resonate with my love for music. Pure bliss!",
    image:
      "https://images.unsplash.com/photo-1526927071144-dbe4c41835e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM1fHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Oscar Wilde",
    position: "Playwright",
    review: "A culinary experience that is both witty and delightful.",
    image:
      "https://images.unsplash.com/photo-1496346236646-50e985b31ea4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzE0fHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Peter Parker",
    position: "Photographer",
    review: "Swinging by for the best slices in town! Never disappoints.",
    image:
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjk3fHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Quinn Fabray",
    position: "Vocalist",
    review: "The perfect place to relax with friends over a delicious meal.",
    image:
      "https://images.unsplash.com/photo-1517480625158-292a09aee755?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYwfHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Ron Swanson",
    position: "Parks Director",
    review: "This place understands meat. A carnivore's paradise!",
    image:
      "https://images.unsplash.com/photo-1496360166961-10a51d5f367a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzMxfHxyYW5kb20lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Steve Rogers",
    position: "Super Soldier",
    review:
      "Even superheroes need good food! Fueling my adventures, one meal at a time.",
    image:
      "https://plus.unsplash.com/premium_photo-1682097238346-3f2a677ccfe6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJteXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

function Testimonial() {
  const context = useContext(myContext);
  const { mode } = context;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <h1
            className="text-center text-3xl font-bold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Testimonial
          </h1>
          <h2
            className="text-center text-2xl font-semibold mb-10"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            What our <span style={{ color: "#FF5722" }}>customers</span> are
            saying
          </h2>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="h-full  text-center p-4">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full mx-auto  border-2 border-gray-200 bg-gray-100"
                  src={testimonial.image}
                />
                <p
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className="leading-relaxed"
                >
                  {testimonial.review}
                </p>
                <span className="inline-block h-1 w-10 rounded bg-orange-600 mt-6 mb-4" />
                <h2
                  style={{ color: mode === "dark" ? "#FF5722" : "" }}
                  className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
                >
                  {testimonial.name}
                </h2>
                <p
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className="text-gray-500"
                >
                  {testimonial.position}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
