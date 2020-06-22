import React from 'react';
import IntroBox from './start_loc'
import BallotCard from './ballot_card'
import QuizBlock  from './quiz'
import EndCard    from './endcard'
import axios from 'axios'

//This is the big daddy UI big brain boi

class Controller extends React.Component{
  constructor(props) {
    super(props);
    this.Dirs = [["N","North"],["E","East"],["S","South"],["W","West"]];
    this.Suff = [["Ave","Avenue"],
                ["Blvd","Boulevard"],
                ["Ct","Court"],
                ["Dr","Drive"],
                ["Hwy","Highway"],
                ["Ln","Lane"],
                ["Market","Market"],
                ["Park","Parkway"],
                ["St","Street"]];
    this.state = {
      v_intro: true,
      v_bal: false,
      v_balpop: false,
      v_quiz: false,
      v_end: false,
      intro: {
        house: "",
        dir: this.Dirs[0][0],
        stname: "",
        suffix: this.Suff[0][0],
        zip: "",
        email: ""
      },
      ballot: [],
      races: [["Village Idiot","Tweedle Dee","Tweedle Dum"]],
      trivia: [
      { question: "How much wood can a wood chuck chuck?",
        ans: ["1 wood",
              "2 wood",
              "3 wood"], 
        choice: "" }
      ],
      iCurrentQ: 0
    };
    this.intro_handleSubmit = this.intro_handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.updateTrivia = this.updateTrivia.bind(this);
    this.submitQ = this.submitQ.bind(this);
  }
  
  updateForm(oForm) {
    this.setState({
      intro: oForm
    });
  }

  intro_handleSubmit(event) {
    const oCont = this;
    //send API request and jump to next box
    axios.get("http://127.0.0.1:5000/user",{params: this.state.intro})
    .then(function(resp) {
      const aBal = resp.data.data;
      const aRaces = [];
      const aQues = [];
      for (let index = 0; index < aBal.length; index++) {
        const aRace = [];
        const oBal = aBal[index];
        aRace.push(oBal.name);
        for (let q = 0; q < oBal.oCands.length; q++) {
          aRace.push(oBal.oCands[q].name);
        }
        for (let q2 = 0; q2 < oBal.oBanks.length; q2++) {
          var oQues = {
            question: oBal.oBanks[q2].question,
            ans: "",
            id: index,
            choices: JSON.parse(oBal.oBanks[q2].choices)
          }
          aQues.push(oQues);
        }
        aRaces.push(aRace);
      }
      oCont.setState({
        ballot: resp.data.data,
        races: aRaces,
        trivia: aQues,
        v_intro: false,
        v_bal: true
      })
    });
    event.preventDefault();
  }

  updateTrivia(atriv,iCur) {
    this.setState({
      trivia: atriv,
      iCurrentQ: iCur
    });
  }
  
  submitQ() {
    console.log("done");
  }
  
  // Navigation Functions
  goBack(iDest) {
    switch (iDest) {
      case 0:
        this.setState({
          v_intro: true,
          v_bal: false
        });
        break;
      case 1:
        this.setState({
          v_bal: true,
          v_quiz: false
        });
        break;
      case 2:
        this.setState({
          v_quiz: true,
          v_end: false
        });
        break;
      default:
        break;
    }
  }
  
  goAway() {
    //This will make this box hide, and the start info box appear
    console.log("But Nobody Came");
  }

  goTo() {
    this.setState({
      v_bal: false,
      v_quiz: true
    });
  }

  render() {
    const introForm = this.state.intro;
    const races = this.state.races;
    const trivia = this.state.trivia;
    const icur = this.state.iCurrentQ;
    return(
    <div>
      <IntroBox vis={this.state.v_intro} Dirs={this.Dirs} Suff={this.Suff} formData={introForm} handleSubmit={this.intro_handleSubmit} updateForm={this.updateForm}/>
      <BallotCard vis={this.state.v_bal} popup={false} races={races}
        goBack={() => this.goBack(0)} goTo={() => this.goTo()}/>
      <BallotCard vis={this.state.v_balpop} popup={true} races={races}/>
      <QuizBlock vis={this.state.v_quiz} trivia={trivia} 
        iCurrentQ={icur} submitQ={this.submitQ} updateTrivia={this.updateTrivia}/>
      <EndCard vis={this.state.v_end}/>
    </div>
    );
  }
}

export default Controller;