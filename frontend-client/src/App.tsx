import { uri } from "config";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "pages/header/Index";
import Home from "pages/body/home/Index";
import Live from "pages/body/live/Index";
import Sponser from "pages/body/sponser/Index";

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
        <Header title={liveData?.title} isLoading={isLoading} />
      </header>
      <div className="App-body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route
              path="/live"
              element={<Live data={liveData} isLoading={isLoading} />}
            ></Route>

            <Route path="/sponser" element={<Sponser />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
