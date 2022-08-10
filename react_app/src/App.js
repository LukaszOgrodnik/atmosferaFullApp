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
      value: 0,
      units: ["Pa", "hPa", "MPa", "psi"],
    },
    {
      id: 2,
      type: "temperature",
      value: 0,
      units: ["K", "C", "F"],
    },
    {
      id: 3,
      type: "density",
      value: 0,
      units: ["kg/m^3", "g/cm^3", "sl/ft^3"],
    },
    {
      id: 4,
      type: "sound_speed",
      value: 0,
      units: ["m/s", "km/h", "mph", "kts"],
    },
    {
      id: 5,
      type: "kinematic_viscosity",
      value: 0,
      units: ["m^2/s", "cS", "cSt"],
    },
    {
      id: 6,
      type: "dynamic_viscosity",
      value: 0,
      units: ["m/s", "cgs"],
    },
  ]);

  const [inputHeight, setInputHeight] = useState("");

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
      <Header/>
      <InputHeightField inputHeight={inputHeight} setInputHeight ={setInputHeight} onSubmit = {calculateProps} />
      <Outputs outputs={outputs} />
    </div>
  );
}

export default App;
