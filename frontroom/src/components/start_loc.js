import React from 'react'
import Slide from './Slide'

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
    this.Dirs = props.Dirs;
    this.Suff = props.Suff;
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const oCurrent = this.props.formData;
    const oForm = {
      house : target.name === "House Number" ? target.value : oCurrent.house,
      dir : target.name === "Street Direction" ? target.value : oCurrent.dir,
      stname : target.name === "Street Name" ? target.value : oCurrent.stname,
      suffix : target.name === "Street Suffix" ? target.value : oCurrent.suffix,
      zip : target.name === "Zip" ? target.value : oCurrent.zip,
      email : target.name === "Email" ? target.value : oCurrent.email
    };
    this.props.updateForm(oForm);
  }

  render() {
    const content = (
    <form onSubmit={this.props.handleSubmit}>
      <h2 className="boxhead">Enter Your Information to Get Started</h2>
      <FormField type="text" name="House Number" value={this.props.formData.house} onChange={this.handleChange}/><br/>
      <DropDown type="text" name="Street Direction" value={this.props.formData.dir} options={this.Dirs} onChange={this.handleChange}/><br/>
      <FormField type="text" name="Street Name" value={this.props.formData.stname} onChange={this.handleChange}/><br/>
      <DropDown type="text" name="Street Suffix" value={this.props.formData.suffix} options={this.Suff} onChange={this.handleChange}/><br/>
      <FormField type="text" name="Zip" value={this.props.formData.zip} onChange={this.handleChange}/><br/>
      <FormField type="text" name="Email" value={this.props.formData.email} onChange={this.handleChange}/><br/>
      <input type="submit" value="Get Ballot" />
    </form>
    );
    return (
      <Slide vis={this.props.vis} content={content}/>
    );
  }
}

export default IntroBox;