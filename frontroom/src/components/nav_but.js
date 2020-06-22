import React from 'react';

function NavigButton(props) {
  return (
    <button className="navig" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

export default NavigButton;