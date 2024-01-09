import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import LinkBioNavbar from "./LinkBioNavbar";

const LinkBioLayout = () => {
  return (
    <div className="linkbioLayout">
      <LinkBioNavbar/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default LinkBioLayout;
