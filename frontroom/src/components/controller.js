import React from 'react';
import IntroBox from './start_loc'
import BallotCard from './ballot_card'
import QuizBlock  from './quiz'
import EndCard    from './endcard'

//This is the big daddy UI big brain boi

function Controller(props){
  return(
  <div>
    <IntroBox />
    <BallotCard popup={false}/>
    <BallotCard popup={true}/>
    <QuizBlock />
    <EndCard />
  </div>
  );
}

export default Controller;