import React from "react";
import "./SearchButton.css";

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="search-button">
      검색
    </button>
  );
};