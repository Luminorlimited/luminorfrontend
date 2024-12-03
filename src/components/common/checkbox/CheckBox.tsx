import { useState } from "react";
import "./checkbox.css"; // Global CSS import

const CheckBox: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(true);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="cntr">
      <input
        type="checkbox"
        id="cbx"
        className="hiddenXsUp"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="cbx" className="cbx"></label>
    </div>
  );
};

export default CheckBox;
