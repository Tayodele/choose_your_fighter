import React from 'react';

function NavigButton(props) {
  return (
    <button className="navig" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

/*
TODO EndPop that pops out the side of the 
function EndPop(props) {

}
*/

// function EndBlock(props) {
//   items = [];
//   for (let index = 0; index < props.race.questions.length; index++) {
//     const element = array[index];
    
//   }
//   return(
//     <div>
//       <h2 className="race-title">{props.race.name}</h2>
//       <span className="contender">
//         <div>
//           <picture>
//           <source srcset={props.race.candidate[0].img}/>
//           </picture>
//           <h3 className="race-item">{props.race.candidate[0].name}</h3>
//         </div>
//         <div>
//           <picture>
//           <source srcset={props.race.candidate[1].img}/>
//           </picture>
//           <h3 className="race-item">{props.race.candidate[1].name}</h3>
//         </div>
//       </span>
//       <div>
//         {items}
//       </div>
//     </div>
//   );
// }

class EndCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const items = [];
    return (
      <div>
        <h2 className="title">Our Reccomendations for 2020</h2>
        {items}
      </div>
    );
  }
}

export default EndCard;