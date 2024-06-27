import { uri } from "config";
import React, { useEffect, useState } from "react";
import "./App.css";
import Live from "pages/body/live/Index";

import { ContestType } from "pages/body/live/model/Contest";

function App() {
  const [liveData, setLiveData] = useState<ContestType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${uri}/`)
      .then((response) => response.json())
      .then((data) => {
        setLiveData(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Live</h1>
      </header>
      <body className="App-body">
        <Live data={liveData} isLoading={isLoading} />
      </body>
    </div>
  );
}

export default App;
