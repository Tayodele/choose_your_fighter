import React from 'react';
import Slide from './Slide';
import NavigButton from './nav_but';

function BallotView(props) {
  const items = [];
  for (let index = 0; index < props.races.length; index++) {
    items.push(
      <div key={index} className="race">
        <h3 className="race-title">{props.races[index][0]}</h3>   
        <div className="race-item">{props.races[index][1]} vs. {props.races[index][2]}</div> 
      </div>
    );
  }
  return (
    <div className="raceBox">
      {items}
    </div>
  );
}

function BallotCard(props) {
  const content = props.popup ? (
      <div>
        <h2 className="title">Your 2020 Ballot</h2>
        <BallotView races={props.races} />
        <NavigButton name="Close" onClick={props.goAway}/>
      </div>
    ) : (
      <div>
        <h2 className="title">Your 2020 Ballot</h2>
        <BallotView races={props.races} />
        <NavigButton name="Take Ballot Quiz" onClick={props.goTo}/>
        <NavigButton name="Re-Enter Information" onClick={props.goBack}/>
      </div>
    );
  return (
      <Slide vis={props.vis} content={content} />
  );
}

export default BallotCard;
