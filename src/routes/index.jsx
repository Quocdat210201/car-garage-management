// Routes config
import routesConfig from '../config';

// Pages
import Home from '../Pages/Home';
import Login from '../pages/Login/login';
import Register from '../pages/Register/register';
import Introduce from '../pages/Introduce/introduce'
import Appointment from '../pages/Appointment/appointment'
import SendAppoint from '../pages/Appointment/sendAppoint'
import Contact from '../pages/Contact/contact'
import Service from '../pages/Services/services'
import ServiceDetails from '../pages/Services/servicesDetails'
import Profile from '../pages/profile/profile';
import NotifyDetail from '../pages/notify/notifyDetail';
import Payment from "../pages/payment/payment"

// Public Routes
const publciRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.login, component: Login },
    { path: routesConfig.register, component: Register },
    { path: routesConfig.aboutUs, component: Introduce },
    { path: routesConfig.appointment, component: Appointment },
    { path: routesConfig.sendAppointment, component: SendAppoint },
    { path: routesConfig.contact, component: Contact },
    { path: routesConfig.services, component: Service },
    { path: routesConfig.servicesDetails, component: ServiceDetails },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.notifyDetails, component: NotifyDetail },
    { path: routesConfig.payment, component: Payment },
];

// Pivate Routes
const privateRoutes = [];

export { publciRoutes, privateRoutes };