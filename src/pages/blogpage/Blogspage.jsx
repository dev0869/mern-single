import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { singleblog } from "../../features/blogs/blogeSlice";
import ReactHtmlParser from "react-html-parser";
import { getBlogs } from "../../features/blogs/blogeSlice";
import { Stack } from "@mui/material";
function BlogCard({ data }) {
  const { _id, date, image, title, content } = data;
  const Dispatch = useDispatch();
  return (
    <div className="max-w-[370px] mx-auto mb-10  rounded shadow-sm p-2">
      <div className="rounded overflow-hidden mb-8">
        <img src={image} alt="image" className="w-full" />
      </div>
      <div>
        <h3 className=" text-xl sm:text-2xl lg:text-xl xl:text-2xl flex justify-between">
          {`${title.slice(0, 50)}..`}
        </h3>

        <p className="py-6 text-base text-body-color">
          {ReactHtmlParser(content.slice(0, 20))}
        </p>

        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          {date}
          <Link to={`/blog/${_id}`} state={data}>
            <button className="bg-primary rounded inline-block text-center py-2 px-4 text-xs font-semibold text-white mb-5">
              Read More
            </button>
          </Link>
        </Stack>
      </div>
    </div>
  );
}

function Blogspage() {
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(getBlogs());
  }, [Dispatch]);

  const Data = useSelector((state) => state.blog.blogs);

  return (
    <section className=" lg:pt-[20px] pb-10 lg:pb-20">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
              <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-[red] mb-4">
                Our Recent News
              </h2>
              <p className="text-base text-body-color">
                Subscribe and stay up to date with the latest marketing tips and
                news.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 overflow-x-hidden">
          {Data.map((ele, id) => {
            return (
              <div key={id} className="w-full md:w-1/2 lg:w-1/3 px-4 ">
                <BlogCard data={ele} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Blogspage;
