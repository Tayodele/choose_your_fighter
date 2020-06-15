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
      intro: {
        house: "",
        dir: this.Dirs[0][0],
        stname: "",
        suffix: this.Suff[0][0],
        zip: "",
        email: ""
      }
    }
    this.intro_handleSubmit = this.intro_handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }
  
  updateForm(oForm) {
    this.setState({
      intro: oForm
    });
  }

  intro_handleSubmit(event) {
    //send API request and jump to next box
    axios.get("http://127.0.0.1:5000/user",{params: this.state.intro})
    .then(function(resp) {
      console.log(resp);
    });
    event.preventDefault();
    //Also, hide this box and make the ballot box appear
  }

  render() {
    const introForm = this.state.intro;
    return(
    <div>
      <IntroBox Dirs={this.Dirs} Suff={this.Suff} formData={introForm} handleSubmit={this.intro_handleSubmit} updateForm={this.updateForm}/>
      <BallotCard popup={false}/>
      <BallotCard popup={true}/>
      <QuizBlock />
      <EndCard />
    </div>
    );
  }
}

export default Controller;