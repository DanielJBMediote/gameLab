/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "@src:Contexts/AuthContextProvider";
import MenuSide from "@src:Components/SideMenu";
import { Button } from 'semantic-ui-react';

export default function HomePage() {
  const { user, apiSignOut} = React.useContext(AuthContext)
  const history = useHistory()

  
  return (
    <>
      <div className="container">
        <MenuSide></MenuSide>
        <img src={`http://localhost:3333/files/${user?.profile.files.id}`} alt="profile" width="100" height="60"/>
        Name: {user?.profile?.username}
        <div>

        <Button onClick={async () => {await apiSignOut()}}>Sing Out</Button>
        </div>
      </div>
    </>
  )
}