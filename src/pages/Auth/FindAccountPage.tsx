import React, { useState } from 'react';
import { findUsername, findPassword } from "../../api/authApi.ts"; 
import Modal from '../../components/ui/Modal.tsx';
import { useModal } from '../../hooks/useModal.ts';
import './FindAccountPage.css';

const FindAccountPage = () => {
  const [activeTab, setActiveTab] = useState('find-id'); 
  const [email, setEmail] = useState(''); 
  const [username, setUsername] = useState(''); 
  const [message, setMessage] = useState(''); 
  const { isModalOpen, setIsModalOpen, handleCloseModal, handleGoHome, handleGoLogin } = useModal(); 

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFindId = async () => {
    try {
      const response = await findUsername(email); 
      if (response.isSuccess) {
        setMessage(`회원님의 아이디는 ${response.result} 입니다.`);
      } else {
        setMessage('등록된 아이디가 없습니다.');
      }
    } catch (error) {
      setMessage('아이디 찾기 중 오류가 발생했습니다.');
    }
      setIsModalOpen(true);
  };

  const handleFindPassword = async () => {
    try {
      const response = await findPassword(username, email);
      if (response.isSuccess) {
        setMessage('임시 비밀번호 전송이 완료되었습니다. 입력하신 이메일을 확인해 주세요.');
      } else {
        setMessage('비밀번호 찾기 실패');
      }
    } catch (error) {
      setMessage('비밀번호 찾기 중 오류가 발생했습니다.');
    }
      setIsModalOpen(true);
  };

  return (
    <div className="find-account-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'find-id' ? 'active' : ''}`}
          onClick={() => handleTabChange('find-id')}
        >
          아이디 찾기
        </div>
        <div
          className={`tab ${activeTab === 'find-password' ? 'active' : ''}`}
          onClick={() => handleTabChange('find-password')}
        >
          비밀번호 찾기
        </div>
      </div>

      {activeTab === 'find-id' && (
        <div className="find-id-form">
          <h2>아이디가 생각나지 않으신가요?</h2>
          <p>아래 회원가입 시 등록한 이메일 계정을 입력해 주세요.</p>
          <p>회원 정보에 등록하신 이메일 주소로 아이디를 찾아드립니다.</p>

          <div className="separator"></div>
          <div className="email-container">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="separator"></div>
          <button className="submit-btn" onClick={handleFindId}>확인</button>
        </div>
      )}

      {activeTab === 'find-password' && (
        <div className="find-password-form">
          <h2>비밀번호가 생각나지 않으신가요?</h2>
          <p>아래 아이디와 회원가입 시 등록한 이메일 계정을 입력해 주세요.</p>
          <p>해당 이메일 계정으로 임시 비밀번호를 발급해 드립니다.</p>
          <p>로그인 이후 임시 비밀번호를 변경해 주세요.</p>

          <div className="separator"></div>
          <div className="username-container">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="email-container">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        
          <div className="separator"></div>
          <button className="submit-btn" onClick={handleFindPassword}>확인</button>
        </div>
      )}

      {isModalOpen && (
        <Modal
          message={message}
          onClose={handleCloseModal}
          onConfirmHome={handleGoHome}
          onConfirmLogin={handleGoLogin}
        />
      )}
    </div>
  );
};

export default FindAccountPage;