/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import MenuSide from "../components/MenuSide";

export default function HomePage() {
  const { user, apiSignOut} = React.useContext(AuthContext)
  const history = useHistory()

  if (!user){
    history.push("/login")
  }
  return (
    <>
      <div className="container">
        <MenuSide></MenuSide>
        <img src={`http://localhost:3333/files/${user?.profile.files.id}`} alt="profile" width="100" height="60"/>
        Name: {user?.profile?.username}
        <button onClick={async () => {await apiSignOut()}}>sign out</button>
      </div>
    </>
  )
}