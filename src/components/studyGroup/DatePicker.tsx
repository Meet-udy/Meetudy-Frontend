import React, { useState } from "react";

interface DatePickerProps {
  onDateChange: (start: string, end: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleDateSelection = () => {
    if (startDate && endDate) {
      onDateChange(startDate, endDate);
    }
  };

  const datePickerContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",  
    alignItems: "center",  
    justifyContent: "center", 
    marginTop: "3px",
    marginBottom: "7px",
    marginLeft: "-3px"
  };
  
  const dateInputStyle = {
    padding: "8px",
    margin: "0 4px",
  };

  const submitButtonStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: "white",
    color: '#1f72c5',
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
    width: "auto", 
    display: "inline-block", 
    whiteSpace: "nowrap",
    marginLeft: "15px"
  };

  return (
    <div style={datePickerContainerStyle}>
      <input
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        style={dateInputStyle}
      />
      ~
      <input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        style={dateInputStyle}
      />
      <button onClick={handleDateSelection} style={submitButtonStyle}>
        날짜 선택
      </button>
    </div>
  );
};

export default DatePicker;