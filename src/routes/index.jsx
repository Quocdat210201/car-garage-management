// Routes config
import routesConfig from '../config';

// Pages
import Home from '../Pages/Home';
import Login from '../Layout/Login';
import Register from '../Layout/Register';
import Introduce from '../pages/Introduce/introduce'
import Appointment from '../pages/Appointment/appointment'
import Contact from '../pages/Contact/contact'
import Service from '../pages/Services/services'
import Profile from '../pages/profile/profile';

// Public Routes
const publciRoutes = [
    { path: routesConfig.home, component: Home },
    // { path: routesConfig.login, component: Login },
    // { path: routesConfig.register, component: Register },
    { path: routesConfig.aboutUs, component: Introduce },
    { path: routesConfig.appointment, component: Appointment },
    { path: routesConfig.contact, component: Contact },
    { path: routesConfig.services, component: Service },
    { path: routesConfig.profile, component: Profile },
];

// Pivate Routes
const privateRoutes = [];

export { publciRoutes, privateRoutes };