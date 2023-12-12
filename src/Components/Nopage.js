import React from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'

function Nopage() {
    const history = useHistory()
  return (
   <Base
   title={"404 NO Page Content"}
   description={"Wrong url please click below button"}
   >
    <button
    onClick={()=>history.push("/")}
    >
        Go to DashBoard
    </button>
   </Base>
  )
}

export default Nopage;