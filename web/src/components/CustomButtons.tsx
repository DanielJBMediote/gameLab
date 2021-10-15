import React, { ButtonHTMLAttributes } from 'react';

import '../styles/buttoms.scss';


interface IButtomProps extends ButtonHTMLAttributes<HTMLButtonElement>{
}

export class FlatButton extends React.Component<IButtomProps> {
  render(){
    return (
      <button className="flat-button" {...this.props}>
        {this.props.children}
      </button>
    );
  }
}

export class OutlineButton extends React.Component<IButtomProps> {
  render () {
    return (
      <button className="outline-button" {...this.props}>
        {this.props.children}
      </button>
    );
  }
}