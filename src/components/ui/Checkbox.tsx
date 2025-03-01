import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="notification-checkbox"
        style={{
          accentColor: '#1f72c5',  
          transform: 'scale(1.5)', 
          cursor: 'pointer',       
        }}
      />
      <label className="checkbox-label" style={{ fontSize: '14px', color: '#333', marginLeft: '-340px' }}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;