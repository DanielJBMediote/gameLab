import React from "react";

import RegisterPageImage from "../assets/horrorImage.svg";

export default class Aside extends React.Component {

  render() {
    return (
      <aside>
        <img src={RegisterPageImage} alt="Online" />
      </aside>
    )
  }
}