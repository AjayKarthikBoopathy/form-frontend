import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function UpdateUser({ userData, setUserData }) {
  const { id } = useParams();
  
  const [first_name, setFirstname] = useState("")
  const [last_name, setLastname] = useState("")
  const [email_id, setEmail] = useState("")
  const [mobile_no, setMobile] = useState("")
  const [address_1, setAddress1] = useState("")
  const [address_2, setAddress2] = useState("")
  const [state, setStateName] = useState("")
  const [country, setCountryName] = useState("")
  const [zip_code, setZip] = useState("")
  const history = useHistory();

  useEffect(() => {
    const editUser = userData?.find((data)=>data._id === id)
       if(editUser){
    setFirstname(editUser.first_name)
    setLastname(editUser.last_name)
    setEmail(editUser.email_id)
    setMobile(editUser.mobile_no)
    setAddress1(editUser.address_1)
    setAddress2(editUser.address_2)
    setStateName(editUser.state)
    setCountryName(editUser.country)
    setZip(editUser.zip_code)
       }
  }, [id, userData])

  async function updateUser() {
    const updatedObject = {
        first_name:first_name,
        last_name:last_name,
        email_id:email_id,
        mobile_no:mobile_no,
        address_1:address_1,
        address_2:address_2,
        state:state,
        country:country,
        zip_code:zip_code
    }
    const response = await fetch(`https://form-backend-iota.vercel.app/users/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedObject),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    if (data) {
      console.log(updatedObject)
      userData[id] = updatedObject
      setUserData([...userData])
      history.push("/users/all")
    }
  }

  return (
    <Base
      title={"Edit a User"}
      description={"Edit Users data here"}
    >
      <div className='text-area-col'>

        <TextField
          id="filled-basic"

          fullWidth sx={{ m: 1 }}

          label="First Name"
          variant="filled"

          type="text"
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Last Name"
          variant="filled"
          type="text"
          value={last_name}
          onChange={(e) => setLastname(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Email"
          variant="filled"
          type="text"
          value={email_id}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Mobile"
          variant="filled"
          type="text"
          value={mobile_no}
          onChange={(e) => setMobile(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Address Line 1"
          variant="filled"
          type="text"
          value={address_1}
          onChange={(e) => setAddress1(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Address Line 2"
          variant="filled"
          type="text"
          value={address_2}
          onChange={(e) => setAddress2(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="State"
          variant="filled"
          type="text"
          value={state}
          onChange={(e) => setStateName(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Country"
          variant="filled"
          type="text"
          value={country}
          onChange={(e) => setCountryName(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Zip Code"
          variant="filled"
          type="text"
          value={zip_code}
          onChange={(e) => setZip(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          onClick={updateUser}
        >Update User</Button>

      </div>

    </Base>
  )
}

export default UpdateUser;