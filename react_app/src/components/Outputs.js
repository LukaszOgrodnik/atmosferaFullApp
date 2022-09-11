import SelectUnit from "./SelectUnit";

//const Outputs = ({ outputs, outputValues, sendUnit }) => {
const Outputs = (props) => {
  const overwriteOutputUnit = props.overwriteOutputUnit;
  const outputs = props.outputs;
  const outputValues = props.outputValues;
  return (
    <>
      {outputs.map((output) => (
        <div className="input-group m-2 w-full max-20">
          <label className="label border w-40 ">{output.label}:</label>
          <label className="label border border-spacing-10 w-40">
            {outputValues[output.type].toPrecision(4)}
          </label>
          {overwriteOutputUnit.use &&
          overwriteOutputUnit.type === output.type ? (
            <select className="select select-bordered">
              <option>{overwriteOutputUnit.value}</option>
            </select>
          ) : (
            <SelectUnit
              unitType={output.type}
              options={output.units}
              sendUnit={props.sendUnit}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Outputs;
