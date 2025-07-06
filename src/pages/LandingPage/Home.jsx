import React from "react";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Testimonial from "./components/Testimonial";
import CTA from "./components/CTA";
import Pricing from "../Pricing";

const Home = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <Pricing />
      <Testimonial />
      <CTA />
    </div>
  );
};

export default Home;
