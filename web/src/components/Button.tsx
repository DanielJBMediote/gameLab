import React from "react";

import "../styles/button.scss";

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  loading?: boolean | false;
  label: string;
}

export class MyButton extends React.Component<ButtonType> {

  render() {
    return (
      <button
        {...this.props}
        className={
          this.props.className + " " + this.props.size + " " + this.props.color
        }
      >
        {this.props.loading ? <span className="spinner"></span> : this.props.label }
        {this.props.children}
      </button>
    );
  }
}
