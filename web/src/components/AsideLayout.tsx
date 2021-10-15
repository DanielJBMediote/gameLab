import React from "react";


interface IAsideProps {
  text?: string
  imageUrl?: string
}


export default class Aside extends React.Component <IAsideProps>{

  render() {
    return (
      <aside>
        <img src={this.props.imageUrl} alt="Online" />
        <p>{this.props.text}</p>
      </aside>
    )
  }
}