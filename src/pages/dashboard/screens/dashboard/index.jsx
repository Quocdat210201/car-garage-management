import PaidIcon from "@mui/icons-material/Paid";
import PeopleIcon from "@mui/icons-material/People";
import ToysIcon from "@mui/icons-material/Toys";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

import revenueData from "./data/revenueData.json";
import sourceData from "./data/sourceData.json";
import { userApi } from "../../../../service/UserService";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const role = localStorage.getItem("roles");
  const [user, setUser] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const filteredRevenueData = revenueData.filter(
    (data) => data.month === selectedMonth
  );

  const getUser = async () => {
    try {
      const { data } = await userApi();
      setUser(data);
    } catch {
      console.error();
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log({ user });

  return (
    <>
      {role === "Staff" ? (
        <>
          <div className="pl-4 mt-6 text-[#848484]">
            <strong>
              <span>{user.name}</span>
            </strong>
          </div>
          <ul className="flex justify-start pl-4 text-[#848484]">
            <li>
              <span className="mr-2">Home</span>
            </li>
            <li>
              <span className="mr-2">=</span>
            </li>
            <li> Dashboards </li>
          </ul>
        </>
      ) : (
        <div className="overflow-y-auto">
          <div className="p-6 flex justify-between">
            <div
              className="w-[330px] h-[130px] px-3 py-2 rounded-xl"
              style={{ backgroundColor: "#f1f1f1" }}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold uppercase">
                    Tổng doanh thu
                  </span>
                  <span className="text-[24px] font-bold">12.345.678</span>
                </div>
                <PaidIcon className="text-[#676de4] font-50"></PaidIcon>
              </div>
              <div className="text-[14px] mt-6">
                <span
                  style={{ color: colors.greenAccent[400] }}
                  className="font-bold">
                  +55%
                </span>
                so với hôm qua
              </div>
            </div>
            <div
              className="w-[330px] h-[130px] px-3 py-2 rounded-xl"
              style={{ backgroundColor: "#f1f1f1" }}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold uppercase">
                    Người dùng
                  </span>
                  <span className="text-[24px] font-bold">322</span>
                </div>
                <PeopleIcon className="text-[#e3b64b] font-50"></PeopleIcon>
              </div>
              <div className="text-[14px] mt-6">
                <span
                  style={{ color: colors.greenAccent[400] }}
                  className="font-bold">
                  +26%
                </span>{" "}
                so với tuần trước
              </div>
            </div>
            <div
              className="w-[330px] h-[130px] px-3 py-2 rounded-xl"
              style={{ backgroundColor: "#f1f1f1" }}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold uppercase">
                    Xe đã tiếp nhận
                  </span>
                  <span className="text-[24px] font-bold">179</span>
                </div>
                <ToysIcon className="text-[#6fc583] font-50"></ToysIcon>
              </div>
              <div className="text-[14px] mt-6">
                <span
                  style={{ color: colors.redAccent[600] }}
                  className="font-bold">
                  -35%
                </span>{" "}
                so với tháng trước
              </div>
            </div>
            <div
              className="w-[330px] h-[130px] px-3 py-2 rounded-xl"
              style={{ backgroundColor: "#f1f1f1" }}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold uppercase">
                    Xe đã giao
                  </span>
                  <span className="text-[24px] font-bold">166</span>
                </div>
                <ToysIcon className="text-[#6fc583] font-50"></ToysIcon>
              </div>
              <div className="text-[14px] mt-6">
                <span
                  style={{ color: colors.greenAccent[400] }}
                  className="font-bold">
                  +16%
                </span>{" "}
                so với tháng trước
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-4 px-6 mt-4 bg-[]">
            <div
              className="rounded-lg col-span-2"
              style={{ backgroundColor: "#f1f1f1" }}>
              <div className=" mt-4 ml-5">
                <span className="text-[18px] font-bold">Doanh Thu</span>
              </div>
              <Line
                data={{
                  labels: revenueData.map((data) => data.label),
                  datasets: [
                    {
                      label: "Doanh thu",
                      data: revenueData.map((data) => data.revenue),
                      backgroundColor: "#064FF0",
                      borderColor: "#064FF0",
                      color: " #fff",
                    },
                    // {
                    //   label: "Cost",
                    //   data: revenueData.map((data) => data.cost),
                    //   backgroundColor: "#FF3030",
                    //   borderColor: "#FF3030",
                    // },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.5,
                    },
                  },
                  plugins: {
                    title: {
                      text: "Monthly Revenue & Cost",
                    },
                  },
                }}
              />
            </div>
            <div className="rounded-lg" style={{ backgroundColor: "#f1f1f1" }}>
              <div className=" mt-4 ml-5">
                <span className="text-[18px] font-bold">Người dùng</span>
              </div>
              <Doughnut
                className="p-10"
                data={{
                  labels: sourceData.map((data) => data.label),
                  datasets: [
                    {
                      label: "Số lượng",
                      data: sourceData.map((data) => data.value),
                      backgroundColor: [
                        colors.blueAccent[400],
                        colors.greenAccent[700],
                        colors.redAccent[700],
                      ],
                      borderColor: [
                        colors.blueAccent[400],
                        colors.greenAccent[700],
                        colors.redAccent[700],
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Revenue Sources",
                    },
                  },
                }}
              />
            </div>
          </div>
          {/* <div className="px-6 mt-10">
        <div>
          <span>Danh sách xe trong gara</span>
        </div>
        <table>
          <thead
            className=""
            style={{ backgroundColor: colors.blueAccent[700] }}>
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Tên nhân viên
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Vị trí làm việc
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
        </table>
      </div> */}
        </div>
      )}
    </>
  );
}

export default Dashboard;
