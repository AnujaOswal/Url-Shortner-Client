import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBar({ login }) {
  const [show, setShow] = useState(false);

  return (
    <div className="navbar">
      <div className="header">
        <h2>Url Shortener.</h2>

        {login ? (
          <GiHamburgerMenu className="ham" onClick={() => setShow(!show)} />
        ) : (
          ""
        )}
      </div>

      {login ? (
        <ul className={show ? "open" : "close"} onClick={() => setShow(!show)}>
          <li>
            <Link to="/urlshortener">Url Shortener</Link>
          </li>
          <li>
            <Link to="/urls">Url(s)</Link>
          </li>
          <li>
            <Link to="/logout">Sign-Out</Link>
          </li>
        </ul>
      ) : (
        <ul className="btnlogin">
          <li>
            <Link to="/login">Sign-In</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
