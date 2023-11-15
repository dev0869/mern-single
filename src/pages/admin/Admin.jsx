import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getalltestride } from "../../features/testride";
import { logout } from "../../features/auth/authSlice";
import { getallcalls } from "../../features/callback";
import { getalldealrship } from "../../features/dealership";
import { getallUserList } from "./../../features/userList/index";
import Accordion from "react-bootstrap/Accordion";
import { getEnquiries } from "../../features/enquiry/enquirySlice";
import { getAllProducts } from "../../features/Product/productSlice";
import { getBlogs } from "../../features/blogs/blogeSlice";
import { adminRoutes } from "./Routes";
import "./Admin.css"
import { getAllAppointments } from "../../features/appointment/appointmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const Admin = () => {
  const site = useSelector((st) => st.site.data);
  const [open, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!open);
  };

  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((st) => st.auth.user);
  useEffect(() => {
    dispatch(getalltestride());
    dispatch(getAllAppointments());
    dispatch(getallcalls());
    dispatch(getalldealrship());
    dispatch(getallUserList());
    dispatch(getEnquiries());
    dispatch(getAllProducts());
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <>
      <nav className="flex bg-white z-[99] items-center sticky border shadow-sm top-0 p-3 gap-4 justify-between">
        <div className="flex gap-2  items-center">
          <AiOutlineMenu
            onClick={toggleSidebar}
            className="cursor-pointer"
            fontSize={30}
          />
          <Link to={"/"}>
            <img
              src={site?.logo}
              alt="logo"
              style={{
                width: "100px",
                aspectRatio: 2 / 1,
                objectFit: "cover",
              }}
              className="ml-4"
            />
          </Link>
        </div>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            dispatch(logout()).then(unwrapResult).then(()=>{
            navigate('/login')
            })
          
          }}
        >
          Logout
        </button>
      </nav>

      <div className="col-12 md:flex justify-end min-h-[92vh]">
        <div
          className={`col-12 col-md-2 adminS shadow transition-all z-[9] overflow-y-auto top-[86px] delay-600 ${
            open ? "left-[00vw]" : "left-[-200vw] fixed"
          } `}
        >
          {adminRoutes.map((itm, i) => {
            if (itm.view?.includes(user?.role)) {
              return (
                <div key={i}>
                  {itm.children ? (
                    <Accordion
                      className="sidebar-acc text-md flex items-center gap-2 border-b-2 w-full"
                      defaultActiveKey="1"
                    >
                      <Accordion.Item
                        className="w-full border-none"
                        eventKey="1"
                      >
                        <Accordion.Header className="w-full">
                          {itm.icon} <p className="ml-2">{itm.txt}</p>
                        </Accordion.Header>
                        <Accordion.Body className="py-0">
                          {itm?.children.map((childRoute, j) => (
                            <NavLink
                              key={j}
                              to={`/admin${childRoute.path}`}
                              className="text-md flex items-center gap-2 py-2 w-full"
                            >
                              {childRoute.icons} {childRoute.txt}
                            </NavLink>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ) : (
                    <NavLink
                      to={itm.children ? path : `/admin${itm.path}`}
                      className="p-4 text-md flex items-center gap-2 border-b-2 py-2 w-full"
                    >
                      {itm.icon} {itm.txt}
                    </NavLink>
                  )}
                </div>
              );
            }
          })}
        </div>
        <div className="w-full p-4">
          <Routes>
            {adminRoutes.map((route, i) => {
              if (route.view?.includes(user?.role)) {
                return (
                  <React.Fragment key={i}>
                    {route?.children ? (
                      route.children.map((childRoute, j) => (
                        <Route
                          key={j}
                          path={childRoute.path}
                          element={childRoute.element}
                        />
                      ))
                    ) : (
                      <Route path={route.path} element={route.element} />
                    )}
                  </React.Fragment>
                );
              }
            })}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
