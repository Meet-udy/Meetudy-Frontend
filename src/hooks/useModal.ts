import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleCloseModal = () => setIsModalOpen(false);
  const handleGoHome = () => navigate("/");
  const handleGoLogin = () => navigate("/login");
  const handleGoStudyGroup = () => navigate("/study-groups");

  return {
    isModalOpen,
    setIsModalOpen,
    modalMessage,
    setModalMessage,
    handleCloseModal,
    handleGoHome,
    handleGoLogin,
    handleGoStudyGroup
  };
};