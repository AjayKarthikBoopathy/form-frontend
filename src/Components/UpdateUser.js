import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Validation from './Validation'
import Select from 'react-select'
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

function UpdateUser({ userData, setUserData }) {
  const { id } = useParams();

  const [first_name, setFirstname] = useState("")
  const [last_name, setLastname] = useState("")
  const [email_id, setEmail] = useState("")
  const [mobile_code, setMobileCode] = useState("")
  const [mobile_no, setMobile] = useState("")
  const [address_1, setAddress1] = useState("")
  const [address_2, setAddress2] = useState("")
  const [state, setStateName] = useState("")
  const [country, setCountryName] = useState("")
  const [zip_code, setZip] = useState("")
  const history = useHistory();

  const users = useSelector(state => state.users.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const editUser = userData?.find((data) => data._id == id)
    if (editUser) {
      setFirstname(editUser.first_name)
      setLastname(editUser.last_name)
      setEmail(editUser.email_id)
      setMobileCode(editUser.mobile_code)
      setMobile(editUser.mobile_no)
      setAddress1(editUser.address_1)
      setAddress2(editUser.address_2)
      setStateName(editUser.state)
      setCountryName(editUser.country)
      setZip(editUser.zip_code)
    }
  }, [id, userData])

  //Edituser
  const [countries, setCountries] = useState([]);
  const [dial, setDial] = useState();
  const [pick_country, setPick_country] = useState();
  const [stateArray, setStateArray] = useState([]);
  const [option, setOption] = useState([])


  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.com/v2/all", {
        method: "GET",
      });
      const cdata = await response.json();
      if (cdata) {
        setCountries(cdata)
      }
    }
    getCountries();
  }, [])

  const handleCountry = (eventt) => {

    let countData = countries[eventt.target.value]
    setDial(countData.callingCodes[0]);
    setPick_country(countData.name);
  }

  useEffect(() => {
    const getStates = async () => {
      const response = await fetch(`https://www.universal-tutorial.com/api/states/${pick_country}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "mode": 'no-cors',
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhamF5a2FydGhpa2Jhazk3QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6Ikw0WVlmTklfeWx1SGtzVk16QUNlQ2RiQ2M1QXhIQXloQm1ENmJFa2ZKU1pUMFRWdHltRFRNOFBGV3k5UjNYVkQwWm8ifSwiZXhwIjoxNzAyNjM0OTYzfQ.Vc080PMdm_CxCO4TGmEKBD-X6lkVbPVv0cWL-Q-3FBE"
        },
      });
      const sdata = await response.json();
      if (sdata) {
        setStateArray(sdata)
        if (sdata) {
          const newoption = sdata.map((data) => {
            return {
              value: data.state_name,
              label: data.state_name
            }
          })
          setOption(newoption)
        }
      }
    }
    if (pick_country) {
      getStates();
    }
  }, [pick_country])



  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email_id: '',
    address_1: '',
    address_2: '',
    zip_code: '',

    state: '',
    country: '',
    mobile_no: '',
    mobile_code: ''

  })
  const [errors, setErrors] = useState({})


  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value }
    setValues(newObj)
    //console.log(values)
  }

  function handleInput2(event) {
    console.log(event)
    const newObj = { ...values, ["state"]: event.value }

    setValues(newObj)
    //console.log(values)
  }


  async function handleValidation(event) {
    event.preventDefault();
    const errorValue = Validation(values)
    setErrors(errorValue);
    //console.log(errors)
    //console.log(values)
    const newdata = { ...values }
    newdata.mobile_code = dial
    newdata.country = pick_country

    //put
    if (!errorValue.error) {
      const updatedObject = {
        first_name: first_name,
        last_name: last_name,
        email_id: email_id,
        mobile_code: mobile_code,
        mobile_no: mobile_no,
        address_1: address_1,
        address_2: address_2,
        state: state,
        country: country,
        zip_code: zip_code
      }

      const response = await fetch(`https://form-backend-iota.vercel.app/users/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedObject),
        headers: {
          "Content-Type": "application/json"
        },
      })
      const data = await response.json()
      if (data) {
        console.log(updatedObject)
        userData[id] = updatedObject
        setUserData([...userData])

        // updatedStudent._id = data.data.result._id
        // dispatch(updateUser(updatedStudent))
        history.push("/users/all")
      }
    }
  }


  return (
    <Base
      title={"Update User"}
      description={"You can edit user data here"}
    >

      <form onSubmit={handleValidation}>
        <div className='text-area-col'>

          <div className='value-area'>
            <div>
              <label htmlFor="first_name" className='mt-10'><strong>First Name:</strong></label>
            </div>
            <div>
              <input type='text' placeholder='Enter First Name' className='form-control'
                name='first_name' value={first_name} onChange={(e) => handleInput(e)} />
              {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
            </div>
          </div>

          <div className='value-area'>
            <div>
              <label htmlFor="last_name" className='mt-10'><strong>Last Name:</strong></label>
            </div>
            <div>
              <input type='text' placeholder='Enter Last Name' className='form-control'
                name='last_name' value={last_name} onChange={(e) => handleInput(e)} />
              {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
            </div>
          </div>

          <div className='value-area'>
            <div>
              <label htmlFor="email_id" className='mt-10'><strong>Email:</strong></label>
            </div>
            <div>
              <input type='email' placeholder='Enter Email' className='form-control'
                name='email_id' value={email_id} onChange={(e) => handleInput(e)} />
              {errors.email_id && <p style={{ color: "red" }}>{errors.email_id}</p>}
            </div>
          </div>



          <div className='value-area'>
            <label htmlFor="address_1" className='mt-10'><strong>Address Line1:</strong></label>
            <input type='text' placeholder='Enter Address Line1' className='form-control'
              name='address_1' value={address_1} onChange={(e) => handleInput(e)} />
            {errors.address_1 && <p style={{ color: "red" }}>{errors.address_1}</p>}
          </div>

          <div className='value-area'>
            <label htmlFor="address_2" className='mt-10'><strong>Address Line2:</strong></label>
            <input type='text' placeholder='Enter Address Line2' className='form-control'
              name='address_2' value={address_2} onChange={(e) => handleInput(e)} />

          </div>



          <div className='value-area'>
            <label htmlFor="zip_code" className='mt-10'><strong>Zip Code:</strong></label>
            <input type='text' placeholder='Enter Zip Code' className='form-control'
              name='zip_code' value={zip_code} onChange={(e) => handleInput(e)} />
            {errors.zip_code && <p style={{ color: "red" }}>{errors.zip_code}</p>}
          </div>



          <div className='value-area'>
            <div>
              <label><strong>Country:</strong></label>
            </div>
            <div>
              <select name='country' className='inputss' style={{ width: "170px" }} onChange={(e) => handleCountry(e)}>
                <option value="">--Select Country--</option>
                {countries.map((val, idx) => {
                  return <option key={idx} value={idx}>{val.name}</option>
                })}
              </select>
            </div>
          </div>


          {/* <Select options={options} /> */}
          <div className='value-area' style={{marginBottom:"30px"}}>
            <div>
              <label><strong>State:</strong></label>
            </div>
            <div>

              <Select name="state" placeholder={"--Select State--"} className='inputss2' onChange={handleInput2} options={option}>
                --Select State--
              </Select>

            </div>
          </div>

          <div className='value-area'>
            <div>
              <label><strong>Mobile:</strong></label>
            </div>

            <div className='input-group'>

              <div>
                <input type='text' name='code' placeholder='Dialcode' value={dial} readOnly />
              </div>

              <div>
                <input type='text' placeholder='Enter Mobile No' name='mobile_no' value={mobile_no} onChange={(e)=>handleInput(e)} />
              </div>
              {errors.mobile_no && <p style={{ color: "red" }}>{errors.mobile_no}</p>}

            </div>
          </div>



          <div className='value-area'>
            <button className='submit'>
              Submit
            </button>
          </div>


        </div>
      </form>

    </Base>
  )
}

export default UpdateUser;