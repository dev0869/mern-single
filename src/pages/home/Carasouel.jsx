import Carousel from "react-bootstrap/Carousel";
import { bycicle, telephone, setting } from "../../assets/images/icon";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export const BannerCarousal = () => {

  const banner = useSelector((st) => st.site.data.homepagebanner);

  return (
    <div className=" overflow-y-hidden border-3 md:h-[80vh] mt-1">
      <Carousel className='md:h-full' interval={1000}>
        {banner?.map((ele, i) => (
          <Carousel.Item key={i}>
            <img
              style={{ borderRadius: "10px" }}
              src={ele}
              className=" object-contain h-full"
              alt={`banner${i + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export const HelpSection = () => {
  const user = useSelector((s) => s.auth.user);
  const help = [
    {
      path: user ? '/appointment' : '/login',
      img: bycicle,
      text: "Book Appointment",
    },

    {
      path: "/callback",
      img: telephone,
      text: `Quotation`,
    },
    {
      img: setting,
      path: "/contact",
      text: "Customer Support",
    },
  ];
  return (
    <div className=" container p-4 ">
      <div className="col-12 mt-9  d-flex flex-col md:flex-row justify-center gap-4 md:gap-0 ">
        <div className=" justify-center  py-4 d-flex flex-col">
          <h1
            className="text-start h2 md:h1 text-uppercase col-12 text-[2rem] md:text-[3rem]  italic"
            style={{ fontWeight: "1000", fontFamily: "speed", color: "red" }}
          >
            How we can help You ?
          </h1>
          <div className="col-12 justify-center flex mt-8">
            {help.map((e, i) => {
              return (
                <Link
                  to={e.path}
                  key={i}
                  className="help-box w-[33%] md:w-[200px]"
                >
                  <div className="help-icon w-24 h-24">
                    <img src={e.img} className="w-20" alt="" />
                  </div>
                  <p className="help-label mt-2 md:text-[20px]  text-center font-[500] md:font-[550] md:text-2xl">
                    {e.text}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
