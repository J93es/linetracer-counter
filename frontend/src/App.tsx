import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

import { postParticipant } from "util/postParticipant";
import { getParticipant } from "util/getParticipant";
import Participant from "model/Participant";

function App() {
  const [participant, setParticipant] = useState(
    new Participant({
      id: "",
      title: "",
      contestLog: [],
      driveLog: [],
      remainingContestTime: 0,
    })
  );
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            const func = async () => {
              const participant = await getParticipant("template.json");
              setParticipant(participant);
            };
            func();
          }}
        >
          {JSON.stringify(participant)}
        </button>

        <button
          onClick={() => {
            const func = async () => {
              const response = await postParticipant(
                "template.json",
                participant
              );
              console.log(response);
            };
            func();
          }}
        >
          Post
        </button>
      </header>
    </div>
  );
}

export default App;
