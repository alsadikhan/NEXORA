import React from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const colors = [
    '#000000', // Black
    '#FFFFFF', // White
    '#D5D8DC', // Light Gray
    '#7B7D7D', // Gray
    '#283747', // Dark Gray
    '#1C2833', // Navy
    '#5D6D7E', // Blue
    '#2E86C1', // Light Blue
    '#17A589', // Teal
    '#229954', // Green
    '#D4AC0D', // Yellow
    '#CA6F1E', // Orange
    '#A93226', // Red
    '#884EA0', // Purple
    '#5D4037', // Brown
    '#F4F6F7', // Beige
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={`w-6 h-6 rounded-full border ${
            value === color ? 'ring-2 ring-offset-2 ring-black' : 'ring-0'
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker; 