import Login from "./Layout/Login/login";
import Register from "./Layout/Register/register";
import Appointment from "./pages/Appointment/appointment";
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
import Car from "./pages/dashboard/screens/car"
import Accounts from "./pages/dashboard/screens/accounts"

function App() {
  const [user, setUser] = useState(false);

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="">
      <div className="app">
        <BrowserRouter>
          {/* <Header />
          <Routes>
            <Route exact path={routerConfig.home} element={<Home />} />
            <Route
              exact
              path={routerConfig.appointment}
              element={<Appointment />}
            />
            <Route exact path={routerConfig.services} element={<Service />} />
            <Route exact path={routerConfig.servicesDetails} element={<ServiceDetails />} />
            <Route exact path={routerConfig.aboutUs} element={<Introduce />} />
            <Route exact path={routerConfig.contact} element={<Contact />} />
            <Route exact path={routerConfig.profile} element={<Profile />} />
          </Routes>
          <Footer /> */}

          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app flex">
                <SideBar/>
                <main className="content">
                  <TopBar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/car" element={<Car />} />
                    <Route path="/accounts" element={<Accounts />} />
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
