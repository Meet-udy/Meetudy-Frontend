import React from "react";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, value, onChange }) => {
  const sliderContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const sliderStyle = {
    width: "200px",
    marginRight: "10px",
  };

  const valueStyle = {
    fontSize: "16px",
    fontWeight: "bold",
  };

  return (
    <div style={sliderContainerStyle}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={sliderStyle}
      />
      <div style={valueStyle}>{value}</div>
    </div>
  );
};

export default Slider;