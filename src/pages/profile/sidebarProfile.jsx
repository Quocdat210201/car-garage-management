import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/my-profile" activeClassName="active">
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/appointments" activeClassName="active">
            Appointments
          </NavLink>
        </li>
        <li>
          <NavLink to="/change-password" activeClassName="active">
            Change Password
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;