import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage.tsx";
import SignUpPage from "./pages/Auth/SignUpPage.tsx";
import LoginPage from "./pages/Auth/LoginPage.tsx"; 
import FindAccountPage from "./pages/Auth/FindAccountPage.tsx";
import KakaoRedirectHandler from "./pages/Auth/KakaoRedirectHandler.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/find-account" element={<FindAccountPage />} />
          <Route path="/oauth2/callback/kakao" element={<KakaoRedirectHandler />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;