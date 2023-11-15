import { Stack } from "@mui/material";
import { toast } from "react-toastify";

// import { Order, UserMain } from "./pages";
// import { userRoutes, logout } from "./UserRoutes";
import { Link, Route, Routes } from "react-router-dom";

// import GenerateReport from "./pages/GenerateReport";
import LftDrawer from "../components/LftDrawer";
import UserMain from "./userMain";
import { useSelector } from "react-redux";
export const UserSidebar = () => {
    const data = useSelector((st) => st.auth.user);
    const userRoutes = [
        {

            name: "Report",
            img: "https://d3juy0zp6vqec8.cloudfront.net/images/my-invoices.svg",
        },

    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
        toast.success("logout Successfull");
    };
    return (
        <>
            <Link to={"/users"}>
                <p className="text-[#212121] font-[700] text-[18px] pb-3">My Account</p>
            </Link>
            <hr />
            <div
                style={{ borderBottom: " 1px solid #ebebeb" }}
                className="mt-[25px] pb-2 "
            >
                <p className=" text-lg font-[600]">My Appointments</p>
                {userRoutes.map((ele, idx) => {
                    return (
                        <div key={idx}>
                            <div className="flex gap-2 m-2">
                                <img src={ele.img} alt="" />
                                <p>{ele.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
    );
};

const UserDetails = () => {
    return (
        <>
            <Stack
                position={"absolute"}
                backgroundColor={"#fee5e5"}
                padding={"6px"}
                width={"9%"}
                display={{ xs: "block", md: "none" }}
            >
                <LftDrawer />
            </Stack>
            <Stack display={"flex"} flexDirection={"row"}>
                <Stack
                    display={{ xs: "none", md: "block" }}
                    flex={2}
                    p={3}
                    position={"sticky"}
                    top={"19%"}
                    height={"100vh"}
                >
                    <UserSidebar />
                </Stack>

                <Stack flex={8} sx={{ backgroundColor: "white" }} p={3}>
                    <Routes>
                        <Route path="/" element={<UserMain />}></Route>
                        {/* <Route path="/orders" element={<Order />}></Route>  */}

                    </Routes>
                </Stack>
            </Stack>
        </>
    );
};

export default UserDetails;
