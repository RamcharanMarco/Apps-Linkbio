import { Link } from "react-router-dom";
import { useState } from "react";
import '../styles/linkbionavbar.css'
import { useStore } from "../store/store";

const LinkBioNavbar = () => {
  const [type, setType] = useState<string>("");

  const {user} = useStore()

  return (
    <nav className="linkbionavbar">
      <Link to={`/user/${user.user._id}/bio`}>
        <h1>MY LINKBIO</h1>
      </Link>
      <div className="links">
        <Link to={`/user/${user.user._id}/bio/edit`}>edit bio</Link>
      <Link to={`/user/${user.user._id}/bio/settings`}>bio settings</Link>
      <Link to={`/user/${user.user._id}/bio/analytics`}>bio_analytics</Link>
      <Link to={`/user/${user.user._id}`}>user</Link>
      </div>
    </nav>
  );
};

export default LinkBioNavbar;
