import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Admin from "pages/admin/Index";
import DisplayBoard from "pages/display_board/Index";
import Login from "pages/login/Index";

import { AuthController } from "pages/login/controller/authController";

const authController = new AuthController();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const [isSerialSupported, setIsSerialSupported] = useState<boolean>(false);

  useEffect(() => {
    if ("serial" in navigator) {
      setIsSerialSupported(true);
    } else {
      setIsSerialSupported(false);
    }

    const func = async () => {
      try {
        const isAuthenticated = await authController.isAuthenticated();
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    func();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hello login!</div>}></Route>

        <Route
          path="/login"
          element={
            <Login
              redirectUrl="/admin"
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        ></Route>

        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              isSerialSupported ? (
                <Admin />
              ) : (
                <div>Serial not supported</div>
              )
            ) : (
              <Login
                redirectUrl="/admin"
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        ></Route>

        <Route
          path="/display-board"
          element={
            isAuthenticated ? (
              <DisplayBoard />
            ) : (
              <Login
                redirectUrl="/display-board"
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
