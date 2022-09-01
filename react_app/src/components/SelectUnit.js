import { useState } from "react";

const SelectUnit = ({ unitType, options, sendUnit }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
    <div>
      <select
        className="select select-bordered"
        value={selectedOption}
        onChange={(e) => {
          //setSelectedOption(e.target.value)
          //console.log(e.target.value)
          //console.log(selectedOption)
          sendUnit(unitType, e.target.value);
        }}
      >
        {options.map((o) => (
          <option key={o} value={o} >
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUnit;
