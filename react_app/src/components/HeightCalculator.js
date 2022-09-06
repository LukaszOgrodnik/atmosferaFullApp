import { useState } from "react";
import InputHeightField from "./InputHeightField";
import Outputs from "./Outputs";

const HeightCalculator = () => {
  //Prepare list/object of used units and send it to backend or calculate Props (to decide).
  function sendUnit(type, unit) {
    console.log(type + ":" + unit);
    if (type === "density" || type === "density_height") {
      setUnitStateDensity((currentState) => ({
        ...currentState,
        [type]: unit,
      }));
    }
    if (type === "pressure" || type === "pressure_height") {
      setUnitStatePressure((currentState) => ({
        ...currentState,
        [type]: unit,
      }));
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

  //handling radio button changes
  const [radioButtons, setRadioButtons] = useState({
    density: true,
    temperature_pressure: false
  }
  )
  return (
    <div>
      <p>In this place you can calculate height in two ways:</p>
      <h3>Density height:</h3>

      <div className="flex flex-row">
        <div className="label">
        <input
            type="radio"
            name="radio-6"
            className="radio checked:bg-red-500"
            checked = {radioButtons.density}
            //onChange = {setRadioButtons(() => ({density:true,temperature_pressure:false}))}
          />
          <span className="label-text">Density</span>
        </div>
        <div className="label">
          <input
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
            checked = {radioButtons.temperature_pressure}
            //onChange = {setRadioButtons(() => ({density:false,temperature_pressure:true}))}
          />
          <span className="label-text">Temperature and pressure </span>
        </div>
      </div>

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
