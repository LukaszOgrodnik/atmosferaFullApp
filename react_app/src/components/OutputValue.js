const OutputValue = ({output}) => {
return (
  <div className="input-group m-2 w-full max-20">
    <label className="label border w-40 ">{output.type}:</label>
    <label className="label border border-spacing-10 w-40"> {output.value} </label>
    <select className="select select-bordered w-25">
      {output.units.map((unit) => (<option key={unit.id}> {unit} </option>))}
    </select>
  </div> 
  )
}

export default OutputValue
