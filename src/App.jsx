import Login from "./Layout/Login/login";
import Register from "./Layout/Register/register";
import Appointment from "./pages/Appointment/appointment";
import Service from "./pages/Services/services";
import Contact from "./pages/Contact/contact";
import Introduce from "./pages/Introduce/introduce";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routerConfig from "./config";
import Header from "./components/Header/header";
import Home from "./pages/Home/home";
function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter> 
          <Header />
          <Routes>
            <Route exact path={routerConfig.home} element={<Home />} />
            <Route exact path={routerConfig.appointment} element={<Appointment />} />
            <Route exact path={routerConfig.services} element={<Service />} />
            <Route exact path={routerConfig.aboutUs} element={<Introduce />} />
            <Route exact path={routerConfig.contact} element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/* <div className="app">
        <div
        className="text-white h-[100vh] flex justify-center items-center bg-no-repeat bg-cover object-cover"
        style={{
          backgroundImage: "url('../src/assets/images/bg-login.png')",
        }}>
        
        <Routes>
            <Route exact path={routerConfig.login} element={<Login />} />
            <Route exact path={routerConfig.register} element={<Register />} />
          </Routes>
        </div>
      </div> */}
    </>
  );
}

export default App;
