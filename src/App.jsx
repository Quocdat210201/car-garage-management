import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Appointment from "./pages/Appointment/appointment";
import SendAppoint from "./pages/Appointment/sendAppoint";
import Service from "./pages/Services/services";
import ServiceDetails from "./pages/Services/servicesDetails";
import Contact from "./pages/Contact/contact";
import Introduce from "./pages/Introduce/introduce";
import Profile from "./pages/profile/profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routerConfig from "./config";
import Header from "./components/Header/header";
import Home from "./pages/Home/home";
import Footer from "./components/Footer/footer";
import { useState } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import TopBar from "./pages/dashboard/screens/global/topBar";
import Dashboard from "./pages/dashboard/screens/dashboard";
import SideBar from "./pages/dashboard/screens/global/sideBar";
import Star from "./pages/dashboard/screens/star";
import Car from "./pages/dashboard/screens/car";
import ProfileAdmin from "./pages/dashboard/screens/profile";
import Accounts from "./pages/dashboard/screens/accounts";
import CalendarWork from "./pages/dashboard/screens/calendarwork";
import AppointmentAdmin from "./pages/dashboard/screens/appointments";
import Customer from "./pages/dashboard/screens/customers";
import Bill from "./pages/dashboard/screens/bill";
import CouponBill from "./pages/dashboard/screens/couponBill";
import Pie from "./pages/dashboard/screens/pie";
import WareHouse from "./pages/dashboard/screens/warehouse";
import ScheduleStaff from "./pages/dashboard/screens/ScheduleStar";
import NotifyDetail from "./pages/notify/notifyDetail";
import Payment from "./pages/payment/payment"

function App() {
  const [user, setUser] = useState("user");

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const roles = localStorage.getItem("roles");

  return (
    <div className="">
      <div className="app">
        {roles === "System Administrator" ||
        roles === "Gara Administrator" ||
        roles === "Staff" ? (
          <BrowserRouter>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app flex">
                  <SideBar />
                  <main className="content">
                    <TopBar />
                    <Routes>
                      <Route path="/admin" element={<Dashboard />} />
                      <Route path="/admin/profile" element={<ProfileAdmin />} />
                      <Route path="/admin/car" element={<Car />} />
                      <Route
                        path="/admin/apointments"
                        element={<AppointmentAdmin />}
                      />
                      <Route path="/admin/star" element={<Star />} />
                      <Route path="/admin/customer" element={<Customer />} />
                      {/* <Route
                        path="/admin/calendar"
                        element={<CalendarWork />}
                      /> */}
                      <Route path="/admin/accounts" element={<Accounts />} />
                      <Route
                        path="/staff/schedule"
                        element={<ScheduleStaff />}
                      />
                      <Route path="/admin/bill" element={<Bill />} />
                      <Route
                        path="/admin/coupon-bill"
                        element={<CouponBill />}
                      />
                      <Route path="/admin/pie" element={<Pie />} />
                      <Route path="/admin/warehouse" element={<WareHouse />} />
                    </Routes>
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route exact path={routerConfig.login} element={<Login />} />
              <Route
                exact
                path={routerConfig.register}
                element={<Register />}
              />
            </Routes>
            <Header />
            <Routes>
              <Route exact path={routerConfig.home} element={<Home />} />
              <Route
                exact
                path={routerConfig.appointment}
                element={<Appointment />}
              />
              <Route
                exact
                path={routerConfig.sendAppointment}
                element={<SendAppoint />}
              />
              <Route exact path={routerConfig.services} element={<Service />} />
              <Route
                path={routerConfig.servicesDetails}
                element={<ServiceDetails />}
              />
              <Route
                exact
                path={routerConfig.aboutUs}
                element={<Introduce />}
              />
              <Route exact path={routerConfig.contact} element={<Contact />} />
              <Route exact path={routerConfig.profile} element={<Profile />} />
              <Route exact path={routerConfig.payment} element={<Payment />} />
              <Route
                path={routerConfig.notifyDetails}
                element={<NotifyDetail />}
              />
            </Routes>
            
            <Footer />
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
