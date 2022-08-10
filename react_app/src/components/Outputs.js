import OutputValue from "./OutputValue"

const Outputs = ({outputs , sendUnit}) => {
  return (
    <>
    {outputs.map( (output) => (
    <OutputValue key = {output.id} 
        output = {output} sendUnit={sendUnit} />))}
    </>
  )
}

export default Outputs
