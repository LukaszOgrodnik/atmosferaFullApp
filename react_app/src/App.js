import { useState } from "react";
import axios from "axios";
import Outputs from "./components/Outputs";
import InputHeightField from "./components/InputHeightField";
import Header from "./components/Header";

function App() {
  const [outputs, setOutputs] = useState([
    {
      id: 1,
      type: "pressure",
      label: "Pressure",
      value: 0,
      units: [
        { value: "Pa", label: "Pa" },
        { value: "hPa", label: "hPa" },
        { value: "MPa", label: "MPa" },
        { value: "atm", label: "atm" },
        { value: "bar", label: "bar" },
        { value: "psi", label: "psi" },
      ],
    },
    {
      id: 2,
      type: "temperature",
      label: "Temperature",
      value: 0,
      units: [
        { value: "K", label: "K" },
        { value: "C", label: "C" },
        { value: "F", label: "F" },
        { value: "R", label: "R" },
      ],
    },
    {
      id: 3,
      type: "density",
      label: "Density",
      value: 0,
      units: [
        { value: "kg/m^3", label: "kg/m^3" },
        { value: "g/cm^3", label: "g/cm^3" },
        { value: "sl/ft^3", label: "sl/ft^3" },
        { value: "lb/ft^3", label: "lb/ft^3" },
      ],
    },
    {
      id: 4,
      type: "sound_speed",
      label: "Sound speed",
      value: 0,
      units: [
        { value: "m/s", label: "m/s" },
        { value: "km/h", label: "km/h" },
        { value: "mph", label: "mph" },
        { value: "kts", label: "kts" },
      ],
    },
    {
      id: 5,
      type: "kinematic_viscosity",
      label: "Kinematic viscosity",
      value: 0,
      units: [
        { value: "m^2/s", label: "m^2/s" },
        { value: "S", label: "S" },
        { value: "ft^2/s", label: "ft^2/s" },
      ],
    },
    {
      id: 6,
      type: "dynamic_viscosity",
      label: "Dynamic viscosity",
      value: 0,
      units: [
        { value: "Pa*s", label: "Pa*s" },
        { value: "P", label: "P" },
      ],
    },
  ]);

  //Prepare list/object of used units and send it to backend or calculate Props (to decide).
  function sendUnit(unit) {
    console.log("send unit ", unit);

  }

  //Sends data to main.py and then fetches the stadard athmosphere props values from backend
  const calculateProps = async (height) => {
    axios
      .post("http://127.0.0.1:8000/calc", { height })
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
        setOutputs(
          outputs.map((output) => {
            output.value = res[output.type];
            return output;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(height);
  };

  return (
    <div className="flex flex-col bg-center">
      <Header />
      <InputHeightField onSubmit={calculateProps} sendUnit={sendUnit} />
      <Outputs outputs={outputs} sendUnit={sendUnit} />
    </div>
  );
}

export default App;
