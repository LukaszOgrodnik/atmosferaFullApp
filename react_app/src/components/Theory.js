const Theory = () => {
  return (
    <>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          ISO Standard athmosphere basic informations
        </div>
        <div className="collapse-content">
          <p>What dose it cover?</p>
          <p>How it is divided?</p>
        </div>
      </div>

      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Athmosphere parameteres calculation
        </div>
        <div className="collapse-content">
          <p>Basic equtions, conditions</p>
          <p>Computation of equtions</p>
        </div>
      </div>

      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Height types
        </div>
        <div className="collapse-content">
          <p>Diffrences</p>
          <p>Methods of calculations</p>
        </div>
      </div>
    </>
  );
};

export default Theory;
