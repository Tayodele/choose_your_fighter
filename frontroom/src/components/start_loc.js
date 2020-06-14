import React from 'react'
import $ from 'jquery'

function FormField(props) {
  return (
    <span>
    <label>{props.name}:</label>
    <input type={props.type} name={props.name} value={props.value} onChange={props.onChange}></input>
    </span>
  );
}

function DropDown(props) {
  const items = [];
  for (let index = 0; index < props.options.length; index++) {
    items.push(<option key={index} value={props.options[index][0]}>{props.options[index][1]}</option>);
  } 
  return (
    <label>{props.name}:
    <select value={props.value} name={props.name} onChange={props.onChange}>
      {items}
    </select>
    </label>
  );
}

class IntroBox extends React.Component {
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
    this.state = { formData: {
      house: "",
      dir: this.Dirs[0][0],
      stname: "",
      suffix: this.Suff[0][0],
      zip: "",
      email: ""
    } };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const oCurrent = this.state.formData;
    const oForm = {
      house : target.name === "House Number" ? target.value : oCurrent.house,
      dir : target.name === "Street Direction" ? target.value : oCurrent.dir,
      stname : target.name === "Street Name" ? target.value : oCurrent.stname,
      suffix : target.name === "Street Suffix" ? target.value : oCurrent.suffix,
      zip : target.name === "Zip" ? target.value : oCurrent.zip,
      email : target.name === "Email" ? target.value : oCurrent.email
    };

    this.setState({
      formData: oForm
    });
  }

  handleSubmit(event) {
    //send API request and jump to next box
    console.log("Retrieving Ballot");
    $.ajax({
      method: "GET",
      url: "http://127.0.0.1:5000/user",
      dataType: "application/json",
      data: this.state.formData
    })
    .done(function(results) {
      console.log(results.slice(0));
    });
    event.preventDefault();
    //Also, hide thisd box and make the ballot box appear
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2 className="boxhead">Enter Your Information to Get Started</h2>
          <FormField type="text" name="House Number" value={this.state.formData.house} onChange={this.handleChange}/><br/>
          <DropDown type="text" name="Street Direction" value={this.state.formData.dir} options={this.Dirs} onChange={this.handleChange}/><br/>
          <FormField type="text" name="Street Name" value={this.state.formData.stname} onChange={this.handleChange}/><br/>
          <DropDown type="text" name="Street Suffix" value={this.state.formData.suffix} options={this.Suff} onChange={this.handleChange}/><br/>
          <FormField type="text" name="Zip" value={this.state.formData.zip} onChange={this.handleChange}/><br/>
          <FormField type="text" name="Email" value={this.state.formData.email} onChange={this.handleChange}/><br/>
          <input type="submit" value="Get Ballot" />
        </form>
      </div>
    );
  }
}

export default IntroBox;