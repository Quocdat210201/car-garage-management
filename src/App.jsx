import Login from "./Layout/Login/login";
import Register from "./Layout/Register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routerConfig from "./config";
import Header from "./components/Header/header";
function App() {
  return (
    <>
    <div className="app">
    <BrowserRouter>
        <Header />
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
