import { Link } from "react-router-dom";
import "../styles/usernav.css";
import { AiOutlineSetting } from "react-icons/ai";
import { useLogout } from "../hooks/useLogout";

import { useStore } from "../store/store";

const Navbar = () => {
  const { user } = useStore();
  const { logout } = useLogout();

  return (
    <nav className="usernav">
      <Link to={`/user/${user.user._id}`}>
        <h1>LINKBIO USER</h1>
      </Link>
      <div className="links">
        <Link to={`/user/${user.user._id}/bio`}>bio</Link>
        <Link to={`/user/${user.user._id}/settings`}>settings</Link>
        <Link to={`/user/${user.user._id}`}>user</Link>
      </div>
    </nav>
  );
};

export default Navbar;
