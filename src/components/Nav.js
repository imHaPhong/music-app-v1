import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Nav = ({ setIsOpen }) => {
  const navClick = () => {
    setIsOpen((p) => !p);
  };
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={navClick}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
