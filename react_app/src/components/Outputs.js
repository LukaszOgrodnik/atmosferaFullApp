import OutputValue from "./OutputValue"

const Outputs = ({outputs}) => {
  return (
    <>
    {outputs.map( (output) => (
    <OutputValue 
        output = {output} />))}
    </>
  )
}

export default Outputs
