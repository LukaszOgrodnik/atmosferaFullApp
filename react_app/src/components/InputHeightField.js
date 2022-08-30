import { useState } from "react";
import SelectUnit from "./SelectUnit";

const heightUnits = [
  { value: "m", label: "m" },
  { value: "km", label: "km" },
  { value: "ft", label: "ft" },
];



const InputHeightField = ({ onSubmit, sendUnit}) => {
  const [inputHeight, setInputHeight] = useState();
  

  return (
    <div className="form-control">
      <div className="input-group m-2">
        <input
          type="text"
          value={inputHeight}
          placeholder="Input height"
          onChange={(e) => setInputHeight(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <SelectUnit unitType="height" options={heightUnits} sendUnit = {sendUnit} /> 

        <button className="btn" onClick={() => onSubmit(inputHeight)}>
          {" "}
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputHeightField;
