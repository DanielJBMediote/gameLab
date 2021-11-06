import React from "react";

import './styles.scss';

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {}

export class Input extends React.Component<InputType> {
  render(){
    return (
      <div className="custom-input">
        <input {...this.props}/>
      </div>
    )
  }
}