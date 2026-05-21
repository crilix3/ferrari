import style from "./Breadcrumb.module.css";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div
          className={style.crumb}
          key={crumb}
        >
          <Link to={currentLink}>{crumb.split("%20").join(" ").toUpperCase()}</Link>
        </div>
      );
    });
  return <div className={style.breadcrumb}>{crumbs}</div>;
};

export default Breadcrumb;
