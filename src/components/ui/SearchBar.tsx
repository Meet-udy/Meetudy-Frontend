import React from "react";
import styled from "styled-components";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <HomePage>
      <SearchContainer>
        <SearchIcon className="fas fa-search" />
        <SearchInput
          type="text"
          placeholder="원하는 스터디를 검색해 보세요!"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </SearchContainer>
    </HomePage>
  );
};

const HomePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35vh;
`; 

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchIcon = styled.i`
  position: absolute;
  left: 30px;
  color: #1f72c5;
  font-size: 22px;
  pointer-events: none;
`;

const SearchInput = styled.input`
  padding: 16px 15px 16px 70px;
  width: 700px;
  border: 1px solid rgb(243, 243, 243);
  background-color: rgb(243, 243, 243);
  border-radius: 5px;
  font-size: 17px;
  outline: none;
`;