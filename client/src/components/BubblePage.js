import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom"
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const { push } = useHistory()
  const [colorList, setColorList] = useState([]);

  const getColors = () => {
    axiosWithAuth().get("/api/colors")
    .then(res => {
      // console.log(res.data)
      setColorList(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getColors()
  }, [])
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const logOut = () => {
    localStorage.removeItem("token")
    push("/")
  }

  return (
    <>
      {/* <button onClick={logOut}>Logout</button> */}
      <>
        <ColorList colors={colorList} updateColors={setColorList} />
        <Bubbles colors={colorList} />
      </>
    </>
  );
};

export default BubblePage;
