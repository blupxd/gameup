import React, { useState } from "react";

interface ToggleSwitchProps {
    onToggle: (isToggled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({onToggle}) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSwitch = () => {
    onToggle(!isToggled);
    setIsToggled((prev) => !prev);
  };

  return (
    <div
      className={`relative inline-flex items-center h-6 w-12 rounded-full cursor-pointer transition-colors ${
        isToggled ? "bg-[#227e78]" : "bg-[#353535]"
      }`}
      onClick={toggleSwitch}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-[#5AECE5] rounded-full shadow-md transition-transform transform ${
          isToggled ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;
