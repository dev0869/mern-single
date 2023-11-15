// import { BannerCarousal } from "./Carasouel";
import OurProucts from "./OurProucts";
import About from "../about/About";
import Contact from "../Contact/Contact";
import "./home.css";
import React from "react";
import SecondHeader from "./SecondHeader";
import Info from "./Info";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchdata = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        signal,
      });
      const data = await res.json();
      console.log(data);
      return data;
    };
    fetchdata();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <SecondHeader />
      {/* <BannerCarousal /> */}
      <div id="services">
        <OurProucts />
      </div>
      <About />

      <br />
      <Info />
      <Contact />
    </>
  );
};

export default Home;
