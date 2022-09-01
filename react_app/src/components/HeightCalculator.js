import { useState } from "react";
import InputHeightField from "./InputHeightField";
import Outputs from "./Outputs";

const HeightCalculator = () => {
  //Prepare list/object of used units and send it to backend or calculate Props (to decide).
  function sendUnit(type, unit) {
    console.log(type + ":" + unit);
    if (type === "density" || type === "density_height") {
      setUnitStateDensity((currentState) => ({ ...currentState, [type]: unit }));
    }
    if (type === "pressure" || type === "pressure_height") {
      setUnitStatePressure((currentState) => ({ ...currentState, [type]: unit }));
    } 
  }

  //for pressure height
  const pressureUnits = ["Pa", "hPa", "MPa", "atm", "bar", "psi"];
  const pressureHeight = [
    {
      type: "pressure_height",
      label: "Pressure height",
      units: ["m", "km", "ft"],
    },
  ];
  const [unitStatePressure, setUnitStatePressure] = useState({
    pressure_height: "m",
    pressure: "Pa",
  });
  const [valueStatePressure, setValueStatePressure] = useState({
    pressure_height: 0,
  });

  //for density height
  const densityUnits = ["kg/m^3", "g/cm^3", "sl/ft^3", "lb/ft^3"];
  const densityHeight = [
    {
      type: "density_height",
      label: "Density height",
      units: ["m", "km", "ft"],
    },
  ];
  const [unitStateDensity, setUnitStateDensity] = useState({
    density_height: "m",
    density: "kg/m^3",
  });
  const [valueStateDensity, setValueStateDensity] = useState({
    density_height: 0,
  });

  return (
    <div>
      <p>In this place you can calculate height in two ways:</p>
      <h3>Density height:</h3>
      <InputHeightField
        units={densityUnits}
        unitType={"density"}
        //onSubmit={calculateProps}
        sendUnit={sendUnit}
      />
      <Outputs
        outputs={densityHeight}
        outputValues={valueStateDensity} 
        sendUnit={sendUnit}
      />
      <div className="divider">OR</div>
      <h3>Pressure height:</h3>
      <InputHeightField
        units={pressureUnits}
        unitType={"pressure"}
        //onSubmit={calculateProps}
        sendUnit={sendUnit}
      />
      <Outputs
        outputs={pressureHeight}
        outputValues={valueStatePressure} 
        sendUnit={sendUnit}
      />
    </div>
  );
};
export default HeightCalculator;