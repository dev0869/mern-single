import { useSelector } from "react-redux";
import DataTable from "usereactable";

const UserMain = () => {
    const user = useSelector((state) => state.auth.user?.user);
    const users = useSelector((state) => state.auth.user?.appointments);
    const actual = [...users].reverse()

    const cols = [
        {
            field: "time",
            headerName: "Date & Time",
        },
        {
            field: "name",
            headerName: "Name",
        },
        {
            field: "mobile",
            headerName: "Mobile",
        },
        {
            field: "service",
            headerName: "Service",
        },]


    return (
        <>
            <section className=" bg-blueGray-50">
                <div className="w-full  px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex items-center gap-2">
                                <img
                                    src="data:image/jpeg;base64,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"
                                    alt=""
                                    width={60}
                                />
                                <h6 className="text-blueGray-700 text-xl font-bold">
                                    {user?.name}
                                </h6>
                            </div>
                        </div>
                        <hr className="mx-6 border-b-1 border-blueGray-300" />
                        {/* <div className="flex-auto mt-3 px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                disabled
                                                placeholder={user?.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                disabled
                                                placeholder={user?.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Mobile Number
                                            </label>
                                            <input
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                disabled
                                                placeholder={user?.mobile}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                GST Number
                                            </label>
                                            <input
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                disabled
                                                placeholder={user?.gstNo}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                PAN Number
                                            </label>
                                            <input
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                disabled
                                                placeholder={user?.panNo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>



                        </div> */}
                        {
                            actual.length > 0 &&
                            <DataTable
                                title="Latest Appointment"
                                data={actual}
                                cols={cols}
                                searchAble={false}
                            />
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserMain;
