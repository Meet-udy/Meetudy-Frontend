import React from "react";
import styled from "styled-components";

interface ModalProps {
  message: string;
  onClose: () => void;
  onConfirmHome: () => void;
  onConfirmLogin: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose, onConfirmHome, onConfirmLogin }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <ModalHeader>
          <CheckIcon>✔️</CheckIcon>
        </ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onConfirmHome}>홈 화면으로 이동하기</Button>
          <Button onClick={onConfirmLogin}>로그인 하러 가기</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
`;

const ModalHeader = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
`;

const CheckIcon = styled.span`
  font-size: 35px;
  color: #1f72c5 !important;
  margin-bottom: 35px;
`;

const ModalBody = styled.div`
  margin-top: 10px;
  font-size: 20px;
  margin-bottom: 25px;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 12px 25px;
  background-color: white;
  border: 1px solid #ddd;
  color: #1f72c5;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #1f72c5;
  background: none;
  border: none;
`;