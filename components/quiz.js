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
    <div display="block">
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
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const atrivia = this.state.trivia.slice();
    atrivia[target.qindex].choice = target.value;
    this.setState({
      trivia: atrivia
    });
  }

  redoQuestion(iInd) {
    console.log("done");
  }

  render() {
    const items = [];
    for (let index = 0; index < this.state.trivia.length; index++) {
      if(index === 0) {
        items.push(<QuizQuestion key={index} display="block" qindex={index} ques={this.state.trivia[index]} onClick={this.redoQuestion(index)} onChange={this.handleChange}/>);
      } else {
        items.push(<QuizQuestion key={index} display="none" qindex={index} ques={this.state.trivia[index]} onClick={this.redoQuestion(index)} onChange={this.handleChange}/>);
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