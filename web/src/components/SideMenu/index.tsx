import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import IconLogo from '@src:Assets/icon.png';

export default function MenuSide() {
  const history = useHistory()

  async function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    const children: HTMLCollection  | undefined = event.currentTarget.parentElement?.children;

    if (children) {
      Object.values(children).map(child => {
        child.className = (child === event.currentTarget) ? "active" : ""
      })
    }
  }

  return (
    <div className="side-menu">
      <img
        src={IconLogo} alt="gameLab icon" title="gameLab"
        onClick={() => {history.push('/home')}}
        />
      <div className="menu-list">
        <ul>
          <li onClick={handleClick}>
            <Link to="#">
              <Icon size="large" name="home"/>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="#">
              <Icon size="large" name="sitemap"/>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="#">
              <Icon size="large" name="comments"/>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="#">
              <Icon size="large" name="user"/>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="#">
              <Icon size="large" name="cogs"/>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}


