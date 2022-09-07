const RadioButtons = ({ radioButtons, setRadioButtons }) => {
  const handleChange = (e) => {
    if (e.target.name === "radio1") {
      setRadioButtons({ radio1: true, radio2: false });
    }
    if (e.target.name === "radio2") {
      setRadioButtons({ radio1: false, radio2: true });
    }
  };
  return (
    <div className="flex flex-row">
      <div className="label">
        <input
          type="radio"
          name="radio1"
          className="radio checked:bg-red-500"
          checked={radioButtons.radio1 === true}
          onChange={handleChange}
        />
        <span className="label-text">Density</span>
      </div>
      <div className="label">
        <input
          type="radio"
          name="radio2"
          className="radio checked:bg-blue-500"
          checked={radioButtons.radio2 === true}
          onChange={handleChange}
        />
        <span className="label-text">Temperature and pressure </span>
      </div>
    </div>
  );
};

export default RadioButtons;
