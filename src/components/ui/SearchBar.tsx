import React from "react";
import styled from "styled-components";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categorySuggestions?: string[];
  groupNameSuggestions?: string[];
  onSuggestionClick?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  categorySuggestions = [],
  groupNameSuggestions = [],
  onSuggestionClick = () => {},
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
        {(categorySuggestions.length > 0 || groupNameSuggestions.length > 0) && (
          <SuggestionBox>
            {categorySuggestions.map((category, idx) => (
              <CategoryItem key={`cat-${idx}`} onClick={() => onSuggestionClick(category)}>
                {category}
              </CategoryItem>
            ))}
            {groupNameSuggestions.map((group, idx) => (
              <SuggestionItem key={`group-${idx}`} onClick={() => onSuggestionClick(group)}>
                {group}
              </SuggestionItem>
            ))}
          </SuggestionBox>
        )}
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
  color: #555;
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

const SuggestionBox = styled.ul`
  position: absolute;
  top: 60px;
  width: 785px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 5px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 0;
  margin: 4px 0 0 0;
`;

const SuggestionItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
`;

const CategoryItem = styled(SuggestionItem)`
  font-weight: bold;
  background-color: #fafafa;
  color: #333;
`;