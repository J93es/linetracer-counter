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

  const func = async () => {
    try {
      const response = await fetch(`${uri}/user/`);
      if (response.status !== 200) {
        throw new Error(`code: ${response.status} Failed to fetch`);
      }
      const data = await response.json();
      setLiveData(data);
      setTimeout(func, 5 * 1000);
    } catch (e) {
      console.error(e);
      setTimeout(func, 5 * 1000);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    func();
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <header className="App-header">
                <Header
                  title={liveData?.title}
                  isLoading={isLoading}
                  onClickedSection="home"
                />
              </header>
              <div className="App-body">
                <Home />
              </div>
            </div>
          }
        ></Route>

        <Route
          path="/live"
          element={
            <div className="App">
              <header className="App-header">
                <Header
                  title={liveData?.title}
                  isLoading={isLoading}
                  onClickedSection="live"
                />
              </header>
              <div className="App-body">
                <Live data={liveData} isLoading={isLoading} />
              </div>
            </div>
          }
        ></Route>

        <Route
          path="/sponser"
          element={
            <div className="App">
              <header className="App-header">
                <Header
                  title={liveData?.title}
                  isLoading={isLoading}
                  onClickedSection="sponser"
                />
              </header>
              <div className="App-body">
                <Sponser />
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
