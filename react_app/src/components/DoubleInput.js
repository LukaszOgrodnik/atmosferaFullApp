import { useState } from "react";
import SelectUnit from "./SelectUnit";

const DoubleInput = ({ onSubmit, units, unitType, sendUnit }) => {
  const [inputHeight, setInputHeight] = useState();
  const placeholderValue = `Input ${unitType}`;
  return (
    <div className="input-group m-2">
      <div className="control-form">
        <div className="input-group ">
          <input
            type="text"
            value={inputHeight}
            placeholder={placeholderValue}
            onChange={(e) => setInputHeight(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <SelectUnit unitType={unitType} options={units} sendUnit={sendUnit} />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={inputHeight}
            placeholder={placeholderValue}
            onChange={(e) => setInputHeight(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <SelectUnit unitType={unitType} options={units} sendUnit={sendUnit} />
        </div>
      </div>
      <button className="btn" onClick={() => onSubmit(inputHeight, unitType)}>
        {" "}
        Submit
      </button>
    </div>
  );
};

export default DoubleInput;
