import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { uri } from "config";

import Admin from "pages/admin/Index";
import DisplayBoard from "pages/displayBoard/Index";
import Login from "pages/login/Index";

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
        const res = await fetch(`${uri}/admin/check-auth`, {
          method: "GET",
          credentials: "include",
        });
        if (res.status !== 200) {
          throw new Error("Failed to check auth");
        }
        setIsAuthenticated(true);
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

        <Route path="/login" element={<Login />}></Route>

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
              <Navigate replace to="/login" />
            )
          }
        ></Route>

        <Route
          path="/display-board"
          element={
            isAuthenticated ? (
              <DisplayBoard />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
