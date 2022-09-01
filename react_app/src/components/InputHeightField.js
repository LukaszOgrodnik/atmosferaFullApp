import { useState } from "react";
import SelectUnit from "./SelectUnit";

const InputHeightField = ({ onSubmit, units, unitType,  sendUnit}) => {
  const [inputHeight, setInputHeight] = useState();
  const placeholderValue= `Input ${unitType}`

  return (
    <div className="form-control">
      <div className="input-group m-2">
        <input
          type="text"
          value={inputHeight}
          placeholder ={ placeholderValue }
          onChange={(e) => setInputHeight(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <SelectUnit unitType={unitType} options={units} sendUnit = {sendUnit} /> 

        <button className="btn" onClick={() => onSubmit(inputHeight)}>
          {" "}
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputHeightField;
