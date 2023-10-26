// Routes config
import routesConfig from '../config';

// Pages
import Home from '../Pages/Home';
import Login from '../Layout/Login';
import Register from '../Layout/Register';
import Introduce from '../Pages/Introduce'
import Appointment from '../Pages/Appointment'
import Contact from '../Pages/Contact'
import Service from '../Pages/Services'

// Public Routes
const publciRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.login, component: Login },
    { path: routesConfig.register, component: Register },
    { path: routesConfig.aboutUs, component: Introduce },
    { path: routesConfig.appointment, component: Appointment },
    { path: routesConfig.contact, component: Contact },
    { path: routesConfig.services, component: Service },
];

// Pivate Routes
const privateRoutes = [];

export { publciRoutes, privateRoutes };