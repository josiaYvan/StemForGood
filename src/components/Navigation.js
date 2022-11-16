import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../atoms/Users";
import Logout from "./Logout";

const Navigation = () => {
  const [User, setUser] = useRecoilState(UserState);

  return (
    <nav className="black nav-wrapper ">
      <div className="container">
        <span className="brand-logo">
          <img className="image" src="stemwhite.png" alt="" />
        </span>
        <a href="" data-target="mobile-menu" className="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          {User[10] === "STAFF" ? (
            <li>
              <Link className="active" to="/">
                Home
              </Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to="/accueil">Accueil</Link>
          </li>
          {User && User[10] === "STAFF" && (
            <li>
              <Link to="/présence">Présence</Link>
            </li>
          )}

          <li>
            <Logout />
          </li>
        </ul>
        <ul className="sidenav grey lighten-2" id="mobile-menu">
          {User[10] === "STAFF" ? (
            <li>
              <Link className="active" to="/">
                Home
              </Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to="/accueil">Accueil</Link>
          </li>
          {User && User[10] === "STAFF" && (
            <li>
              <Link to="/présence">Présence</Link>
            </li>
          )}

          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
