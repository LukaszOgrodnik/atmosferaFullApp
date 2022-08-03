import OutputValue from "./OutputValue"

const Outputs = ({outputs}) => {
  return (
    <>
    {outputs.map( (output) => (
    <OutputValue key = {output.id} 
        output = {output} />))}
    </>
  )
}

export default Outputs
