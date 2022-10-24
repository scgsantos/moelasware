import React from "react";
import { Link } from "react-router-dom";

import {
  USERS_URL,
  TEST_MENU_URL,
  SELECT_TEST_URL,
  REVIEW_URL,
} from "urls.js"

const Home = () => {
  document.documentElement.style.setProperty("--base", "var(--beige)");
  return (
    <React.Fragment>
      <div className="startmenu">
        <Link to="/createquiz">
          <h1>CREATE A QUIZ</h1>
        </Link>
        <Link to={SELECT_TEST_URL}>
          <h1>SOLVE A TEST</h1>
        </Link>
        <Link to={REVIEW_URL}>
          <h1>REVIEW A QUIZ</h1>
        </Link>
        <Link to={TEST_MENU_URL}>
          <h1>CREATE A TEST</h1>
        </Link>
        <Link to={USERS_URL}>
          <h1>
            HISTORY <br></br>& <br></br>HALL OF FAME
          </h1>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Home;