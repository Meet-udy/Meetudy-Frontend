import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage.tsx";
import SignUpPage from "./pages/Auth/SignUpPage.tsx";
import LoginPage from "./pages/Auth/LoginPage.tsx"; 
import FindAccountPage from "./pages/Auth/FindAccountPage.tsx";
import KakaoRedirectHandler from "./pages/Auth/KakaoRedirectHandler.tsx";
import AdditionalInfoPage from "./pages/Auth/AdditionalInfoPage.tsx";
import StudyGroupPage from "./pages/Study/StudyGroupPage.tsx";
import CreateStudyGroupPage from "./pages/Study/CreateStudyGroupPage.tsx"
import LeaderStudyGroupPage from "./pages/Study/LeaderStudyGroupPage.tsx";
import MemberStudyGroupPage from "./pages/Study/MemberStudyGroupPage.tsx";
import ChatRoomListPage from "./pages/Chat/ChatRoomListPage.tsx";
import ChatRoomPage from "./pages/Chat/ChatRoomPage.tsx";
import PostListPage from "./pages/Community/PostListPage.tsx";
import PostDetailPage from "./pages/Community/PostDetailPage.tsx";

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
          <Route path="/additional-info" element={<AdditionalInfoPage />} />
          <Route path="/study-groups" element={<StudyGroupPage />} />
          <Route path="/study-groups/create" element={<CreateStudyGroupPage />} />
          <Route path="/study-groups/leader" element={<LeaderStudyGroupPage />} />
          <Route path="/study-groups/member" element={<MemberStudyGroupPage />} />
          <Route path="/chat-rooms" element={<ChatRoomListPage />} />
          <Route path="/chat/:roomId" element={<ChatRoomPage />} />
          <Route path="/community" element={<PostListPage/>} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;