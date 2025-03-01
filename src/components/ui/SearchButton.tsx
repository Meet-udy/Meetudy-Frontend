import React from "react";
import styled from "styled-components";

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return <StyledButton onClick={onClick}>검색</StyledButton>;
};

const StyledButton = styled.button`
  padding: 16px 23px;
  background-color: #1f72c5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;