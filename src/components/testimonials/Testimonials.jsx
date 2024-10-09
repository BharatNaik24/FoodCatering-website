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
    image:
      "data:image/jpeg;base64,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",
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
    dots: false,
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
