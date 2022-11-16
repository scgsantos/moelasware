import React, { useState } from "react";
import IncDecCounter from "components/input_number";
import "../req_2_1.css";

import { useNavigate } from "react-router-dom";

import {
  CREATE_TEST_URL,
  TEST_MENU_URL,
  TEST_PREVIEW_URL,
  CREATE_TEST_WITH_TAGS_URL,
} from "urls.js";
import history from "history.js";

function CreateRandomTestWithSpecs() {
  document.body.style = "background: var(--pink)";
  const [num, setNum] = useState(1);
  const [isPage1, setIsPage1] = useState(true);
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);

  const [is_reload, setReload] = useState(false);
  const [prev_tags, setPrevTags] = useState([]);

  const [quizzes, setQuizzes] = useState([]);
  const [quizzes_count, setQuizzesCount] = useState(-1);

  if( quizzes_count == -1){
    getQuizzesCount();
  }

  if (history.location.state != null && quizzes?.length == 0) {
    setNum(history.location.state?.quizzes?.length);
    setText(history.location.state?.name);
    setQuizzes(history.location.state?.quizzes);
    setTags(history.location.state?.tags);
    setPrevTags(history.location.state?.tags);

    setReload(true);
  }

  let navigate = useNavigate();

  function genQuizzes() {
    fetch("http://localhost:8000/api/quizzes/gen/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num_quizzes: num, tags: tags }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data.quizzes);
      });
  }

  function getQuizzesCount(){
    fetch("http://localhost:8000/api/quizzes/count/")
    .then((response) => response.json())
    .then((data) => {
      setQuizzesCount(data.quizzes_count);
    });
  }

  function handleCreateButtonChange() {
    if (num <= quizzes_count) {
      setIsPage1(false);
    }

    if (quizzes.length !== num || (is_reload && tags !== prev_tags)) {
      genQuizzes();
    }
  }

  function handleNameChange(e) {
    setText(e.target.value);
  }

  function handleTagsChange(e) {
    setTags(e.target.value.split(" "));
  }

  function handleNextButtonChange() {
    if (text.length != 0) {
      history.push(CREATE_TEST_WITH_TAGS_URL);

      navigate(TEST_PREVIEW_URL, {
        state: {
          tags: tags,
          name: text,
          quizzes: quizzes,
          previous_path: CREATE_TEST_WITH_TAGS_URL,
        },
      });
      window.location.reload();
    }
  }

  function handleGoBackChange() {
    setIsPage1(true);
  }

  function handleGoBackToMenu() {
    navigate(TEST_MENU_URL);
  }

  if (isPage1) {
    return (
      <div className="req-2-1-firstPage">
        <h1 className="req-2-1-title">Create a Test</h1>
        <h2 className="req-2-1-subTitle">Random Test with Specifications</h2>

        <IncDecCounter
          num={num}
          setNum={setNum}
          label={"Choose the number o quizzes you want in your test"}
        />
        <h2 className="req-2-1-errorQuizzesCounter">
          {num > quizzes_count
            ? "The number chosen is greater than the number of existing quizzes"
            : ""}
        </h2>
        <div className="req-2-1-inputDiv">
          <h1 className="req-2-1-inputTitle">
            {"Specify the tags you must have in the quizzes"}
          </h1>
          <input
            className="req-2-2-inputText"
            type="text"
            name="name"
            value={tags?.join(" ")}
            onChange={handleTagsChange}
          />
        </div>
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
        <h1 className="req-2-1-title">Create a Test</h1>
        <h2 className="req-2-1-subTitle">Random Test with Specifications</h2>

        <div className="req-2-1-inputDiv">
          <h1 className="req-2-1-inputTitle">{"Name your test"}</h1>
          <input
            className="req-2-1-inputText"
            type="text"
            name="name"
            value={text}
            onChange={handleNameChange}
          />
          <h2 className="req-2-1-errorInput">
            {text?.length > 0 ? "" : "Name is mandatory"}
          </h2>
        </div>

        <h3 className="req-2-1-title"> Chosen Quizzes: </h3>
        <ul>
          {quizzes.map((quiz) => (
            <li className="quiz">{quiz.question}</li>
          ))}
        </ul>

        <div className="req-2-1-Publish-GoBack-buttons">
          <button className="req-2-1-GoBackbutton" onClick={handleGoBackChange}>
            Go Back
          </button>

          <button className="req-2-1-GoBackbutton" onClick={genQuizzes}>
            Reroll Quizzes
          </button>

          <button
            className="req-2-1-CreateButton"
            onClick={handleNextButtonChange}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default CreateRandomTestWithSpecs;