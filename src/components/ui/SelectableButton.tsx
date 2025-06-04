import React from "react";

interface SelectableButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({ label, isSelected, onClick, disabled }) => {
  const buttonStyles = {
    padding: '10px 20px',
    margin: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: disabled ? 'white' : isSelected ? 'rgb(242, 249, 255)' : 'white',
    color: '#555',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SelectableButton;