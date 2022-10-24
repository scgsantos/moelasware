import 'pages/review_quiz/ReviewAQuizPage.css';
import React from 'react';
import logo from 'assets/SVG/LOGO.svg';
import { useState, useEffect, setState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import config from 'config.js';
import { REVIEW_URL } from "urls.js";



function ReviewAQuizPage() {
  document.documentElement.style.setProperty("--base", "var(--green)");

  const [data, setQuiz] = useState({});
  //error
  const [error, setError] = useState(false);
  //loading
  const [isLoaded, setLoading] = useState(false);

  const { id } = useParams();

  const [justification, setJustification] = useState('');

  let navigate = useNavigate();

  const handleJustificationChange = event => {
    // 👇️ access textarea value
    setJustification(event.target.value);
  };

  //fetch quiz from the backend and log it to the console
  useEffect(() => {
    fetch(config.svurl + "/api/quizzes/" + id)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong", { cause: res });
        }
      })
      .then(
        (result) => {
          setLoading(true);
          setQuiz(result);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
      ).catch((error) => {
        setLoading(true);
        setError(true);
      })
  }, [])

  if (error) {
     return <div>Could not get quiz</div>;
   } else if (!isLoaded) {
     return <div>Loading...</div>;
   } else {
    return (
      <div className="ReviewAQuizPage-Container">
        <div className="centered">
          <div style={styles.middletitle}>REVIEW A QUIZ</div>
        </div>
        <div style={{ height: "20px" }}></div>

        <p style={styles.center}>{data["quiz"]["question"]}</p>

        <div className="cent">
          <ul>
            {(() => {
              var d = [];
              let j = 0;
              for (let i = 0; i < data["answers"].length; i++) {
                if (j === 0) {
                  j = 1;
                  d.push(
                    <tr className="side sep">
                      <td></td>
                      <td>
                        <h2 className="explanation" style={styles.left}>JUSTIFICATIONS</h2>
                      </td>
                    </tr>)
                }
                if (data["answers"][i]["correct"]) {
                  d.push(
                    <tr className="side sep">
                      <td>
                        <div className="answer correct_op"> {data["answers"][i]["text"]} </div>
                      </td>
                      <td>
                        <div className="explanation"> {data["answers"][i]["justification"]}</div>
                      </td>
                    </tr>)
                } else {
                  d.push(
                    <tr className="side sep">
                      <td>
                        <div className="answer"> {data["answers"][i]["text"]} </div>
                      </td>
                      <td>
                        <div className="explanation"> {data["answers"][i]["justification"]} </div>
                      </td>
                    </tr>)
                }
              }
              return d;
            })()}
          </ul>
        </div>


        <h2 className="centered">
          EVALUATION
        </h2>
        <div className="row">
          <h4>Justification</h4>
          <textarea className="justification" type="text" name="Justification" placeholder="Justification"
            value={justification}
            onChange={handleJustificationChange}></textarea>
          <div style={{ height: "40px" }}></div>

          <div className="btn_line">
            <button className="btn success" onClick={() => {
              const args = JSON.stringify({
                "quiz": "" + id,
                "reviewer": "1",
                "accepted": true,
                "comment": justification
              });
              console.log(args);
              //post to backend
              fetch(config.svurl + "/api/quizzes/review/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: args
              }).then(
                alert("Quiz Accepted")
              ).then(
                navigate(REVIEW_URL)
              )
            }}>ACCEPT</button>

              <button className="btn success" onClick={() => {
                const args = JSON.stringify({
                  "quiz": "" + id,
                  "reviewer": "1",
                  "accepted": false,
                  "comment": justification
                });
                console.log(args);
                //post to backend
                fetch(config.svurl + "/api/quizzes/review/", {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: args
                }).then(
                  alert("Quiz Rejected")
                ).then(
                  navigate(REVIEW_URL)
                )
              }}>REJECT</button>

            <button className="btn success" onClick={() => {navigate(REVIEW_URL)}}>CANCEL</button>
          </div>
         </div>
      </div>
    );
  }
}

const styles = {
  geral: {
    fontSize: 20,
  },
  center: {
    textAlign: "center",
    fontSize: 20,
  },
  middletitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  left: {
    textAlign: "left"
  },

};


export default ReviewAQuizPage;