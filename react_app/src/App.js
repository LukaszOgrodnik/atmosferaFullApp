import { useState} from "react";
import Outputs from "./components/Outputs";

function App() {
  const [outputs , setOutputs] = useState([
  {
    id:1,
    type:"Pressure",
    value: 0,
    units: [ "Pa", "hPa","MPa", "psi"] , 
  },
  {
    id:2,
    type:"Temperature",
    value: 0,
    units: ["K", "C", "F"] , 
  },
  {
    id:3,
    type:"Density",
    value: 0,
    units: ["kg/m^3", "g/cm^3", "sl/ft^3"] , 
  },
  {
    id:4,
    type:"Sound speed",
    value: 0,
    units: ["m/s", "km/h", "mph","kts"] , 
  },
  {
    id:5,
    type:"Mach Number",
    value: 0,
    units: ["Ma"] , 
  },
  {
    id:6,
    type:"Kinematic Viscosity",
    value: 0,
    units: ["m^2/s", "cS", "cSt"] , 
  },
  {
    id:7,
    type:"Dynamic Viscosity",
    value: 0,
    units: ["m/s", "cgs"] , 
  },
  ]);

  const [text, setText] = useState("");


  const calculateProps = (height) => {
    setOutputs(outputs.map((output)=>{
      output.value = height
      return output
    }))
    console.log(height)
  }


  return (

  <div className="flex flex-col bg-center">
      <label className="label">
        <span className="label-text font-size:4rem">Enter the height for which you want to calculate athomsphere parameters: </span>
      </label>

  <div class="form-control">
    <div className="input-group m-2">
      <input 
        type="text" 
        value={text} 
        placeholder="Input height" 
        onChange={(e)=> setText (e.target.value)}
        className="input input-bordered w-full max-w-xs" />

      <select className="select select-bordered">
        <option >m</option>
        <option> km </option>
        <option> ft </option>
      </select>

      <button className="btn" onClick = {() => calculateProps(text) }> Submit</button>
    </div>
  </div>
      <Outputs outputs={outputs}/>
    </div>
  );
}

export default App;
