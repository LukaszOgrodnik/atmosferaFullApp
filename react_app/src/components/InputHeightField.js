const InputHeightField = ({inputHeight, setInputHeight, onSubmit }) => {
  return (
<div className="form-control">
        <div className="input-group m-2">
          <input
            type="text"
            value={inputHeight}
            placeholder="Input height"
            onChange={(e) => setInputHeight(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />

          <select className="select select-bordered">
            <option>m</option>
            <option> km </option>
            <option> ft </option>
          </select>

          <button className="btn" onClick={() => onSubmit(inputHeight)}>
            {" "}
            Submit
          </button>
        </div>
      </div>
  )
}

export default InputHeightField
