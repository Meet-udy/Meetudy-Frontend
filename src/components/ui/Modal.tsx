import React from "react";
import "./Modal.css"; 

interface ModalProps {
  message: string;
  onClose: () => void;
  onConfirmHome: () => void;
  onConfirmLogin: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose, onConfirmHome, onConfirmLogin }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button> {/* 엑스 버튼 추가 */}
        <div className="modal-header">
          <span className="check-icon">✔️</span>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onConfirmHome}>홈 화면으로 이동하기</button>
          <button onClick={onConfirmLogin}>로그인 하러 가기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;