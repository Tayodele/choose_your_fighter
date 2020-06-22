import React from 'react';

//Reused child comp for visibility controls
function Slide(props) {
    const vis = props.vis
    if(vis === false ) {
      return( 
        <div style={{display: "none"}}>
        </div>
      );
    }
    else return <div>{props.content}</div> 
}

export default Slide;