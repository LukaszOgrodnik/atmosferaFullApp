import axios from "axios";
import Outputs from "./Outputs";
import InputHeightField from "./InputHeightField";
import { useState } from "react";

const Home = () => {
  const outputArray = [
    {
      type: "pressure",
      label: "Pressure",
      units: ["Pa", "hPa", "MPa", "atm", "bar", "psi"],
    },
    {
      type: "density",
      label: "Density",
      units: ["kg/m^3", "g/cm^3", "sl/ft^3", "lb/ft^3"],
    },
    {
      type: "temperature",
      label: "Temperature",
      units: ["K", "C", "F", "R"],
    },
    {
      type: "sound_speed",
      label: "Sound speed",
      units: ["m/s", "km/h", "mph", "kts"],
    },
    {
      type: "kinematic_viscosity",
      label: "Kinematic viscosity",
      units: ["m^2/s", "S", "ft^2/s"],
    },
    {
      type: "dynamic_viscosity",
      label: "Dynamic viscosity",
      units: ["Pa*s", "P"],
    },
  ];

  //   use useState
  const [unitState, setUnitState] = useState({
    height: "m",
    pressure: "Pa",
    density: "kg/m^3",
    temperature: "K",
    sound_speed: "m/s",
    kinematic_viscosity: "m^2/s",
    dynamic_viscosity: "Pa*s",
  });

  //   use useState
  const [valueState, setValueState] = useState({
    height: 0,
    pressure: 0,
    density: 0,
    temperature: 0,
    sound_speed: 0,
    kinematic_viscosity: 0,
    dynamic_viscosity: 0,
  });

  //   setOutputs((currentOutputs) => ({
  //     ...currentOutputs,
  //     [o.type]: {
  //       unit: "Pa",
  //       value: 0,
  //     },
  //   }));

  //   const [unitsToSend, setUnitsToSend] = useState([
  //     { type: "height", unit: "m" },
  //     { type: "pressure", unit: "Pa" },
  //     { type: "temperature", unit: "K" },
  //     { type: "density", unit: "kg/m^3" },
  //     { type: "sound_speed", unit: "m/s" },
  //     { type: "kinematic_viscosity", unit: "m^2/s" },
  //     { type: "dynamic_viscosity", unit: "Pa*s" },
  //   ]);

  const heightUnits = ["m", "km", "ft"];

  //Prepare list/object of used units and send it to backend or calculate Props (to decide).
  function sendUnit(type, unit) {
    console.log(type + ":" + unit);
    setUnitState((currentState) => ({ ...currentState, [type]: unit }));
    console.log(unitState);
  }

  //Sends data to main.py and then fetches the stadard athmosphere props values from backend
  const calculateProps = async (height) => {
    console.log(height);
    console.log(unitState);
    axios
      .post("http://127.0.0.1:8000/calc", { height, unitState })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("http://127.0.0.1:8000/sent")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setValueState(
          valueState.map((output) => {
            output.value = res[output.type];
            return output;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <label className="label">
        <span className="label-text font-size:4rem">
          Enter the height for which you want to calculate athomsphere
          parameters:{" "}
        </span>
      </label>
      <InputHeightField
        onSubmit={calculateProps}
        units={heightUnits}
        unitType={"height"}
        sendUnit={sendUnit}
      />
      <Outputs
        outputs={outputArray}
        outputValues={valueState}
        sendUnit={sendUnit}
      />
    </div>
  );
};

export default Home;
