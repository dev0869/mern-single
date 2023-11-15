import React from "react";
import "../pages.css";
import Carousel from "react-bootstrap/Carousel";
import { Stack } from "@mui/material";
import AboutCard from "../../components/AboutCard";
import { useSelector } from "react-redux";
const About = () => {
  const site = useSelector((st) => st.site.data);
  return (
    <div id="about">
      <br />
      <br />
      <div className="headerbackground" >
        <h2 className="overview-heading   h2-heading-std">ABOUT US</h2>
        <p className="text-lg">A brief introduction of {site?.name}</p>
      </div>

      <div className="container">
        {site?.aboutus?.firstpara && (
          <Stack
          
            display={"flex"}
            flexDirection={"row"}
            mt={4}
            flexWrap={"wrap"}
          >
            <Stack className="aboutshadow" display={"flex"} flex={6}>
              <h1 className="About_head text-4xl text-center ">Welcome to {site?.name}</h1>
              <p className="About_headp">{site?.aboutus?.firstpara}</p>
            </Stack>

            <Stack display={{xs:'none',sm:'flex'}} flex={4}>
              <Carousel interval={1500} className="col-12 rounded mt-2">
                {site?.aboutus?.images?.map((ele, i) => (
                  <Carousel.Item key={i}>
                    <div className="flex items-center justify-center">
                      <img
                        style={{ borderRadius: "10px" }}
                        src={ele}
                        width={380}
                        height={380}
                        alt={`banner${i + 1}`}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Stack>
          </Stack>
        )}
        <br />
        <br />
        {/* eeeeeeeeeee */}
        {site?.aboutus?.vision && (
          <div className="bannerimg">
            <div className="headerbackground ">
              <h2 className="overview-heading   h2-heading-std">OUR VISION</h2>
            </div>
            <p className="sp-content">{`" ${site?.aboutus?.vision} "`}</p>
          </div>
        )}
      </div>

      {site?.aboutus?.mission && (
        <div className="bannerimg">
          <div className="headerbackground ">
            <h2 className="overview-heading   h2-heading-std">OUR MISSION</h2>
          </div>
          <p className="sp-content2">{site?.aboutus?.mission}</p>
        </div>
      )}

      <div className="bannerimg">
        <div className="headerbackground ">
          <h2 className="overview-heading   h2-heading-std">OUR VALUES</h2>
        </div>
        <AboutCard />
      </div>

      {site?.aboutus?.secondpara && (
        <div className="container">
          <Stack
            display={"flex"}
            flexDirection={"row"}
            mt={2}
            flexWrap={"wrap"}
          >
            <Stack className="aboutshadow" display={"flex"} flex={6}>
              <h1 className="About_head">Designed for Indians</h1>
              <p className="About_headp">{site?.aboutus?.secondpara}</p>
            </Stack>

            <Stack display={{xs:'none',sm:'flex'}} flex={4}>
              <Carousel interval={1500} className="col-12 rounded mt-2">
                {site?.aboutus?.designimg?.map((ele, i) => (
                  <Carousel.Item key={i}>
                    <div className="flex items-center justify-center">
                      <img
                        style={{ borderRadius: "10px" }}
                        src={ele}
                        width={380}
                        height={380}
                        alt={`banner${i + 1}`}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Stack>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default About;
