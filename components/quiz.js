function NavigButton(props) {
  return (
    <button className="navig" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

function QuizQuestion(props) {
  const ques = [];
  for (let index = 0; index < props.ques.ans.length; index++) {
    ques.push(
      <label key={index}>
        <input type="radio" name={props.qindex} value={props.ques.ans[index]} onChange={props.onChange}/> 
        {props.ques.ans[index]}
      </label>
    );
  }
  return(
    <div>
      <h3 className="quiz-title">{props.ques.question}</h3>
      <div className="quiz-ans">{ques}</div>
      <NavigButton name="Back" onClick={props.onClick} />
    </div>
  );
}

class QuizBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trivia : [
      { question: "How much wood can a wood chuck chuck?",
        ans: ["1 wood",
              "2 wood",
              "3 wood"], 
        choice: "" },
      { question: "Can a Wood Chuck Chuck Wood?",
        ans: ["Hell Yeah!",
              "Maaaan Fuck a Wood Chuck!"], 
        choice: "" }
      ],
      iCurrentQ: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const current = this.state.iCurrentQ;
    const target = event.target;
    const atrivia = this.state.trivia.slice();
    atrivia[current].choice = target.value;
    if(current != atrivia.length - 1) {
      this.setState({
        trivia: atrivia,
        iCurrentQ: current + 1
      });
    } else {
      this.submitQ();
    }
  }

  submitQ() {
    console.log("done");
  }

  redoQuestion() {
    console.log("go back");
    const current = this.state.iCurrentQ;
    if(current > 0) {
      this.setState({
        iCurrentQ: current - 1
      });
    }
  }

  render() {
    const items = [];
    const current = this.state.iCurrentQ;
    const show = {display: 'block'}
    const hide = {display: 'none'}
    for (let index = 0; index < this.state.trivia.length; index++) {
      if(index === current) {
      } else {
        items.push(<QuizQuestion key={index} style={hide} qindex={current} ques={this.state.trivia[current]} onClick={() => this.redoQuestion()} onChange={this.handleChange}/>)
      }
    }
    return (
      <div>
        <h2 className="title">Let's learn a bit about your positions</h2>
        {items}
      </div>
    );
  }
}


const domContainer = document.querySelector('#quiz');
ReactDOM.render(<QuizBlock />, domContainer);