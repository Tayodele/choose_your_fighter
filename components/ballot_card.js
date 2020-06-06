function NavigButton(props) {
  return (
    <button className="navig" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

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

class BallotCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      races: [["Village Idiot","Tweedle Dee","Tweedle Dum"]],
      popup: props.popup
    }
  }

  goBack() {
    //This will make this box hide, and the start info box appear
    console.log("Going back home");
  }
  
  goAway() {
    //This will make this box hide, and the start info box appear
    console.log("But Nobody Came");
  }

  goTo() {
    //This will make this box hide, and the first quiz box appear
    console.log("Going to Disney");
  }
  
  render() {
    if(this.state.popup) {
      return (
        <div>
          <h2 className="title">Your 2020 Ballot</h2>
          <BallotView races={this.state.races} />
          <NavigButton name="Close" onClick={this.goAway}/>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="title">Your 2020 Ballot</h2>
          <BallotView races={this.state.races} />
          <NavigButton name="Take Ballot Quiz" onClick={this.goTo}/>
          <NavigButton name="Re-Enter Information" onClick={this.goBack}/>
        </div>
      );
    }
  }
}

const domContainer = document.querySelector('#ballot_card');
ReactDOM.render(<BallotCard popup={false}/>, domContainer);

const domContainer2 = document.querySelector('#ballot_pop');
ReactDOM.render(<BallotCard popup={true}/>, domContainer2);