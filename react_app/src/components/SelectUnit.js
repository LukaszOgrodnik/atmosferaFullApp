import { useState } from "react";

const SelectUnit = ({unitType, options, sendUnit }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
    <div>
      <select
        className="select select-bordered"
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            onClick={()=>sendUnit(unitType, selectedOption)}
          >
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUnit;
