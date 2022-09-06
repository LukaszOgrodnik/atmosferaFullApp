import SelectUnit from "./SelectUnit";

const Outputs = ({ outputs, outputValues, sendUnit }) => {
  return (
    <>
      {outputs.map((output) => (
        <div className="input-group m-2 w-full max-20">
          <label className="label border w-40 ">{output.label}:</label>
          <label className="label border border-spacing-10 w-40">
          {outputValues[output.type].toPrecision(4)}
          </label>
          <SelectUnit
            unitType={output.type}
            options={output.units}
            sendUnit={sendUnit}
          />
        </div>
      ))}
    </>
  );
};

export default Outputs;
