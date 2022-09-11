import { useState } from "react";
import axios from "axios";

import Outputs from "./Outputs";
import DoubleInput from "./DoubleInput";

const HeightCalculator = () => {
  //Prepare list/object of used units and send it to backend or calculate Props (to decide).
  function sendUnit(type, unit) {
    console.log(type + ":" + unit);
    setUnitState((currentState) => ({
      ...currentState,
      [type]: unit,
    }));
  }

  const calculateHeight = async (pressure, temperature) => {
    const units = unitState;
    console.log({ pressure, temperature, units });
    let response = await axios.post("http://127.0.0.1:8000/height/", {
      pressure,
      temperature,
      units,
    });
    console.log(response.data);
    setValueState(response.data);
  };

  // Outputs
  const outputArray = [
    {
      type: "pressure_height",
      label: "Pressure height",
      units: ["m", "km", "ft"]
    },
    {
      type: "temperature",
      label: "Temperature",
      units: ["K", "C", "Fa", "R"]
    }
  ];
  const densityHeight = [
    {
      type: "density_height",
      label: "Density height",
      units: ["m", "km", "ft"]
    }
  ];

  //units that are sent to backend
  const [unitState, setUnitState] = useState({
    pressure_height: "m",
    density_height: "m",
    pressure: "Pa",
    temperature: "K"
  });

  //values obtained from backend
  const [valueState, setValueState] = useState({
    pressure_height: 0,
    temperature: 0,
    density_height: 0
  });

  const inputUnits = {
    temperature: ["K", "C", "Fa", "R"],
    pressure: ["Pa", "hPa", "MPa", "atm", "bar", "psi"]
  };

  const [overwriteTemperature, setOverwriteTemperature] = useState(false);

  return (
    <div className="m-2">
      <label className="label">
        <span className="label-text font-size:4rem">
          In this place you can calculate height in two common ways using
          ISO-standard atmosphere. The two values to calculate it are pressure
          and temperature. The first one uses only pressure and it is called
          pressure height. In the second one the temperature can be overwritten
          for calculation. This will give us so called density height. For the
          educational puposes the temperature from ISO standard atmospere for
          the pressure height calculated will be shown. This enables the user to
          comper how temperature change will differ height value.{" "}
        </span>{" "}
      </label>

      <div className="flex flex-row">
        <div className="flex flex-col">
          <DoubleInput
            units={inputUnits}
            unitType={{ pressure: "pressure", temperature: "temperature" }}
            onSubmit={calculateHeight}
            sendUnit={sendUnit}
            overwriteTemperature={overwriteTemperature}
            setOverwriteTemperature={setOverwriteTemperature}
          />
        </div>
        <div className="flex flex-col">
          <Outputs
            outputs={outputArray}
            outputValues={valueState}
            sendUnit={sendUnit}
            overwriteOutputUnit ={{use:overwriteTemperature, type:"temperature", value:unitState.temperature}}
          />

          {overwriteTemperature && <Outputs
            outputs={densityHeight}
            outputValues={valueState}
            sendUnit={sendUnit}
            overwriteOutputUnit
          />}
        </div>
      </div>
    </div>
  );
};
export default HeightCalculator;
