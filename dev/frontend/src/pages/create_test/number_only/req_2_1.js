import React, { useState } from "react";
import IncDecCounter from "components/input_number";
import logo from "logo.png";
import "../req_2_1.css";

import { useNavigate } from "react-router-dom";

import { CREATE_RANDOM_TEST_URL, MENU_URL, PREVIEW_URL } from "urls.js";
import history from "history.js";

function CreateRandomTest() {
  const [num, setNum] = useState(1);
  const [isPage1, setIsPage1] = useState(true);
  const [text, setText] = useState("");

  const [quizzes, setQuizzes] = useState([]);

  if (history.location.state != null && quizzes.length == 0) {
    setNum(history.location.state.quizzes?.length);
    setText(history.location.state.name);
    setQuizzes(history.location.state?.quizzes);
  }

  let navigate = useNavigate();

  function getFirstQuiz() {
    fetch("http://localhost:8000/api/quizzes/gen/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num_quizzes: num }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data.quizzes);
      });
  }

  function handleCreateButtonChange() {
    setIsPage1(false);

    if (quizzes.length != num) {
      getFirstQuiz();
    }
  }

  function handleNameChange(e) {
    setText(e.target.value);
  }

  function handleNextButtonChange() {
    if (text.length != 0) {
      history.push(CREATE_RANDOM_TEST_URL);

      navigate(PREVIEW_URL, {
        state: {
          name: text,
          quizzes: quizzes,
          previous_path: CREATE_RANDOM_TEST_URL,
        },
      });
      window.location.reload();
    }
  }

  function handleGoBackChange() {
    setIsPage1(true);
  }

  function handleGoBackToMenu() {
    navigate(MENU_URL);
  }

  if (isPage1) {
    return (
      <div className="req-2-1-firstPage">
        <img src={logo} className="req-2-1-logo" alt="logo" />
        <h1 className="req-2-1-title">Create a Test</h1>
        <h2 className="req-2-1-subTitle">Random Test</h2>

        <IncDecCounter
          num={num}
          setNum={setNum}
          label={"Choose the number of quizzes you want in your test"}
        />
        <div className="req-2-1-Publish-GoBack-buttons">
          <div className="req-2-1-buttonCreate">
            <button onClick={handleGoBackToMenu}>Go Back</button>
          </div>
          &ensp;&ensp;
          <div className="req-2-1-buttonCreate">
            <button onClick={handleCreateButtonChange}>Next</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="req-2-1-secondPage">
        <img src={logo} className="req-2-1-logo" alt="logo" />

        <h1 className="req-2-1-title">Create a Test</h1>
        <h2 className="req-2-1-subTitle">Random Test</h2>

        <div className="req-2-1-inputDiv">
          <h1 className="req-2-1-inputTitle">{"Name your test"}</h1>
          <input
            className="req-2-1-inputText"
            type="text"
            name="name"
            onChange={handleNameChange}
          />
          <h2 className="req-2-1-errorInput">
            {text.length > 0 ? "" : "Name is mandatory"}
          </h2>
        </div>

        <h3 className="req-2-1-title"> Chosen Quizzes: </h3>
        <ul className="req-2-1-quizList">
          {quizzes.map((quiz) => (
            <li className="quiz">{quiz.question}</li>
          ))}
        </ul>

        <div className="req-2-1-Publish-GoBack-buttons">
          <button className="req-2-1-GoBackbutton" onClick={handleGoBackChange}>
            Go Back
          </button>

          <button className="req-2-1-GoBackbutton" onClick={getFirstQuiz}>
            Reroll Quizzes
          </button>

          <button
            className="req-2-1-NextButton"
            onClick={handleNextButtonChange}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default CreateRandomTest;
