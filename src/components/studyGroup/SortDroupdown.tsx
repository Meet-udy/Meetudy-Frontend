import React, { useState } from "react";

export type SortType = "LATEST" | "OLDEST" | "POPULAR" | "CLOSING_SOON" | "RECOMMENDED";

interface SortDropdownProps {
  sortBy: SortType;
  onSortChange: (newSort: SortType) => void;
}

const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: "최신순", value: "LATEST" },
  { label: "인기순", value: "POPULAR" },
  { label: "추천순", value: "RECOMMENDED" },
  { label: "마감 임박순", value: "CLOSING_SOON" },
  { label: "오래된순", value: "OLDEST" },
];

const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (newSort: SortType) => {
    onSortChange(newSort);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{
          color: "#1f72c5 !important",
          background: "#fff",
          border: "1px solid #ccc",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "16px",
          borderRadius: "4px",
        }}
      >
        {SORT_OPTIONS.find(option => option.value === sortBy)?.label} ⌄
      </button>

      {isOpen && (
        <ul
          style={{
            color: "#1f72c5 !important",
            position: "absolute",
            top: "100%",
            left: "0",
            background: "white",
            border: "1px solid #ccc",
            listStyle: "none",
            margin: "0",
            padding: "0",
            width: "150px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          {SORT_OPTIONS.map(option => (
            <li 
              key={option.value} 
              onClick={() => handleSortChange(option.value)}
              style={{
                padding: "10px",
                cursor: "pointer",
                background: option.value === sortBy ? "#f0f0f0" : "white",
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
