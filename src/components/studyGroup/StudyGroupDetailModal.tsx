import React, { useState } from "react";
import styled from "styled-components";

interface StudyGroupDetailModalProps {
  studyGroup: {
    name: string;
    category: string;
    description: string;
    duration: string;
    location: string;
    maxParticipants: number;
  };
  groupId?: number;
  onJoin?: (groupId: number) => void;
  onClose: () => void;
  sourcePage: "StudyGroupPage" | "LeaderStudyGroupPage" | "MemberStudyGroupPage";
}

const StudyGroupDetailModal: React.FC<StudyGroupDetailModalProps> = ({
  studyGroup,
  groupId,
  onJoin,
  onClose,
  sourcePage
}) => {

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setModalPosition({
      x: modalPosition.x + dx,
      y: modalPosition.y + dy,
    });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ModalOverlay>
      <ModalContent
        style={{
          transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <ModalHeader>
          <h2>{studyGroup.name}</h2>
        </ModalHeader>
        <ModalBody>
          <img src="/images/dummy_image.jpg" alt="Study Group" style={{ width: "50%", marginBottom: "40px", marginLeft: "120px", borderRadius: "8px" }} />
 
          <InfoBox>
            <InfoLabel>Study Category</InfoLabel>
            <InfoContent>{studyGroup.category}</InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoLabel>Study Overview</InfoLabel>
            <InfoContent>{studyGroup.description}</InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoLabel>Duration</InfoLabel>
            <InfoContent>{studyGroup.duration}</InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoLabel>Location</InfoLabel>
            <InfoContent>{studyGroup.location}</InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoLabel>Max Participants</InfoLabel>
            <InfoContent>{studyGroup.maxParticipants}명</InfoContent>
          </InfoBox>

          {sourcePage === "StudyGroupPage" && (
            <ModalFooter>
              <FooterButton>질문 채팅방</FooterButton>
              <FooterButton
                onClick={() => {
                  if (onJoin && groupId !== undefined) {
                    onJoin(groupId);
                  }   
                }}
              >
                가입하기
              </FooterButton>
            </ModalFooter>
          )}

        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StudyGroupDetailModal;

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
  position: absolute;  
  overflow-y: auto; 
  max-height: 80vh; 
`;

const ModalHeader = styled.div`
  font-size: 28px;
  margin-bottom: 40px;
  margin-left: 20px;
  text-align: left;
  h2 {
    color: #1f72c5;
  }
`;

const ModalBody = styled.div`
  margin-top: 10px;
  font-size: 20px;
  margin-bottom: 25px;
  margin-left: 20px;
  text-align: left;
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

const InfoBox = styled.div`
  position: relative;
  background-color:rgba(196, 196, 196, 0.13);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 40px;
  width: 60%;  
  max-width: 400px;  
  margin-left: 20px;
  text-align: left;
  word-wrap: break-word;  
`;

const InfoLabel = styled.div`
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding: 0 10px;
  font-size: 16px;
  color: #1f72c5;
  font-weight: bold;
`;

const InfoContent = styled.div`
  font-size: 15px !important;
  font-size: 18px;
  margin-top: 20px;
  color: #333;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
  padding: 0 20px;
`;

const FooterButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid #ccc;
  color: #1f72c5;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;
