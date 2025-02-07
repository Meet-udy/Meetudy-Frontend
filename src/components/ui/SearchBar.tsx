import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="search-container">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="원하는 스터디를 검색해 보세요!"
        value={searchQuery}
        onChange={onSearchChange}
        className="search-input"
      />
    </div>
  );
};