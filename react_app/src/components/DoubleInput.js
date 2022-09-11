import { useState } from "react";
import SelectUnit from "./SelectUnit";

const DoubleInput = ({ onSubmit, units, unitType, sendUnit,overwriteTemperature, setOverwriteTemperature  }) => {
  const [inputPressure, setInputPressure] = useState();
  const [inputTemperature, setInputTemperature] = useState();

  const handleChange = (e) => {
    if (overwriteTemperature === true) {
      setOverwriteTemperature(false);
    } else {
      setOverwriteTemperature(true);
    }
  };

  return (
    <div className="input-group m-2">
      <div className="control-form">
        <div className="input-group ">
          <input
            type="text"
            value={inputPressure}
            placeholder={`Input ${unitType.pressure}`}
            onChange={(e) => setInputPressure(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <SelectUnit
            unitType={unitType.pressure}
            options={units.pressure}
            sendUnit={sendUnit}
          />
        </div>

        <div
          className="label" //overwite temperature checkbox
        >
          <input
            type="checkbox"
            name="radio1"
            className="checkbox"
            checked={overwriteTemperature}
            onChange={handleChange}
          />
          <span className="label-text">Overwrite temperature</span>
        </div>
        {overwriteTemperature && (
          <div className="input-group">
            <input
              type="text"
              value={inputTemperature}
              placeholder={`Input ${unitType.temperature}`}
              onChange={(e) => setInputTemperature(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <SelectUnit
              unitType={unitType.temperature}
              options={units.temperature}
              sendUnit={sendUnit}
            />
          </div>
        )}
      </div>
      <button className="btn" onClick={() => onSubmit(inputPressure, inputTemperature)}>
        {" "}
        Submit
      </button>
    </div>
  );
};

export default DoubleInput;
