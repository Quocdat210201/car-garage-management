// Routes config
import routesConfig from '../config';

// Pages
import Home from '../Pages/Home';
import Login from '../Layout/Login';
import Register from '../Layout/Register';

// Public Routes
const publciRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.login, component: Login },
    { path: routesConfig.register, component: Register },
];

// Pivate Routes
const privateRoutes = [];

export { publciRoutes, privateRoutes };