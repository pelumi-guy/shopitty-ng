import React, { Fragment } from "react";

const Counter = ({ val, incrementer, decrementer }) => {
  return (
    <Fragment>
      <div className="stockCounter d-inline">
        <span className="btn btn-danger minus" onClick={decrementer}>
          -
        </span>

        <input
          type="number"
          className="form-control count d-inline"
          value={val}
        />

        <span className="btn btn-primary plus" onClick={incrementer}>
          +
        </span>
      </div>
    </Fragment>
  );
};

export default Counter;
