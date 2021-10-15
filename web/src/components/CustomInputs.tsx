import React, { InputHTMLAttributes } from "react";

import "../styles/inputs.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  haveSpinner?: boolean;
}

export class InputText extends React.Component<IInputProps> {
  render() {
    return (
      <div>
        <input className="input-text" {...this.props} />
        {this.props.haveSpinner ? <span className="spinner"></span> : ""}
      </div>
    );
  }
}
