import React from "react";

import "./styles.scss";

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styles: {
   size?: "small" | "medium" | "large";
   color?: "primary" | "secondary";
  };
  loading?: boolean | false;
  label: string;
}

export class CustomButton extends React.Component<ButtonType> {

  render() {
    return (
      <button
        {...this.props}
        className={
          "custom-button " + 
          (this.props.className) + " " +
          (this.props.styles?.size) + " " +
          (this.props.styles?.color)
        }
      >
        {this.props.loading ? <span className="spinner"></span> : this.props.label }
        {this.props.children}
      </button>
    );
  }
}
