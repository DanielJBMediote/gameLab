/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../App";
import MenuSide from "../components/MenuSide";

export default function HomePage() {
  const { user } = React.useContext(AuthContext)
  const history = useHistory();
  
  if(!user) {
    history.push("/login");
  } 

  return (
    <>
    <MenuSide />
    </>
  )
}