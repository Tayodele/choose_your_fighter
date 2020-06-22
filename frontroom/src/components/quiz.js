import React from 'react';
import Slide from './Slide';
import NavigButton from './nav_but';

function QuizQuestion(props) {
  const ques = [];
  for (let index = 0; index < props.ques.choices.length; index++) {
    ques.push(
      <label key={index}>
        <input type="radio" name={props.qindex} value={props.ques.choices[index]} onChange={props.onChange}/> 
        {props.ques.choices[index]}
      <br/>
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const current = this.props.iCurrentQ;
    const target = event.target;
    const atrivia = this.props.trivia.slice();
    atrivia[current].ans = target.value;
    if(current !== atrivia.length - 1) {
      this.props.updateTrivia(atrivia,current+1);
    } else {
      this.props.submitQ();
    }
  }

  redoQuestion() {
    const current = this.props.iCurrentQ;
    const trivia = this.props.trivia;
    if(current > 0) {
      this.props.updateTrivia(trivia,current - 1);
    }
  }

  render() {
    const items = [];
    const aTriv = this.props.trivia;
    const current = this.props.iCurrentQ;
    const quizlen = aTriv.length;
    for (let index = 0; index < quizlen; index++) {
      if(index === current) {
        items.push(<QuizQuestion key={index} qindex={current} ques={aTriv[current]} onClick={() => this.redoQuestion()} onChange={this.handleChange}/>);
      }
    }
    const content = (
      <div>
        <h2 className="title">Let's learn a bit about your positions</h2>
        {items}
      </div>
    );
    return (
      <Slide vis={this.props.vis} content={content} />
    );
  }
}

export default QuizBlock;