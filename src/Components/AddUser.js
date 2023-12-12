import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { Button, IconButton, Snackbar, TextField } from '@mui/material'
import Validation from './Validation'
// ${cdata.alpha2Code}

function AddUser({ userData, setUserData }) {
  const history = useHistory()

  const [countries, setCountries] = useState([]);
  const [country_id, setCountry_id] = useState();
  const [stateArray, setStateArray] = useState([]);
  //callingCodes

  useEffect(()=>{
    const getCountries = async () =>{
        const response = await fetch("https://restcountries.com/v2/all", {
          method:"GET",
        }); 
        const cdata = await response.json();
        if(cdata){
          setCountries(cdata) 
          console.log(cdata)
        }
    }
    getCountries();
  }, [])

  useEffect(()=>{
    const getStates = async () =>{
        const response = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states`, {
          method:"GET",
        }); 
        const sdata = await response.json();
        if(sdata){
          setStateArray(sdata) 
          console.log(stateArray)
        }
    }
    getStates();
  }, [])
  const handleCountry = (eventt)=>{
    const country_id = eventt.target.value;
  }

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email_id: '',
    mobile_no: '',
    address_1: '',
    address_2: '',
    state: '',
    country: '',
    zip_code: ''
  })
  const [errors, setErrors] = useState({})

 
  function handleInput(event) {
    const newObj = {...values, [event.target.name]: event.target.value}
    setValues(newObj)
    //console.log(values)
  }
  // console.log(errors)
  async function handleValidation(event) {
    event.preventDefault(); 
    const errorValue = Validation(values)   
    setErrors(errorValue);
    //console.log(errors)

  //post
  if(!errorValue.error) {
  const response = await fetch("https://form-backend-iota.vercel.app/users/add", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json"
    },
  })
  const data = await response.json()
  setUserData([...userData, data])
  history.push("/users/all")  
  }
}

  return (
    <Base
      title={"Add New User"}
      description={"You can add new user data here"}
    >

    <form onSubmit={handleValidation}>
      <div className='text-area-col'>

        <div className='value-area'>
        <label htmlFor="first_name" className='mt-10'><strong>First Name:</strong></label>
        <input type='text' placeholder='Enter First Name' className='form-control' 
        name='first_name' onChange={handleInput} />
        {errors.first_name && <p style={{color:"red"}}>{errors.first_name}</p>}
        </div>

        <div className='value-area'>
        <label htmlFor="last_name" className='mt-10'><strong>Last Name:</strong></label>
        <input type='text' placeholder='Enter Last Name' className='form-control' 
        name='last_name' onChange={handleInput} />
        {errors.last_name && <p style={{color:"red"}}>{errors.last_name}</p>}
        </div>

        <div className='value-area'>
        <label htmlFor="email_id" className='mt-10'><strong>Email:</strong></label>
        <input type='email' placeholder='Enter Email' className='form-control' 
        name='email_id' onChange={handleInput} />
        {errors.email_id && <p style={{color:"red"}}>{errors.email_id}</p>}
        </div>

        <div className='value-area'>
        <label htmlFor="mobile_no" className='mt-10'><strong>Mobile:</strong></label>
        <input type='text' placeholder='Enter Mobile Number' className='form-control' 
        name='mobile_no' onChange={handleInput} />
        {errors.mobile_no && <p style={{color:"red"}}>{errors.mobile_no}</p>}
        </div>

        <div className='value-area'>
        <label htmlFor="address_1" className='mt-10'><strong>Address Line1:</strong></label>
        <input type='text' placeholder='Enter Address Line1' className='form-control' 
        name='address_1' onChange={handleInput} />
        {errors.address_1 && <p style={{color:"red"}}>{errors.address_1}</p>}
        </div>

        <div className='value-area'>
        <label htmlFor="address_2" className='mt-10'><strong>Address Line2:</strong></label>
        <input type='text' placeholder='Enter Address Line2' className='form-control' 
        name='address_2' onChange={handleInput} />
        
        </div>

        <div className='value-area'>
        <label htmlFor="state" className='mt-10'><strong>State:</strong></label>
        <input type='text' placeholder='Enter State' className='form-control' 
        name='state' onChange={handleInput} />
        
        </div>

        <div className='value-area'>
        <label htmlFor="country" className='mt-10'><strong>Country:</strong></label>
        <input type='text' placeholder='Enter Country' className='form-control' 
        name='country' onChange={handleInput} />
        
        </div>

        <div className='value-area'>
        <label htmlFor="zip_code" className='mt-10'><strong>Zip Code:</strong></label>
        <input type='text' placeholder='Enter Zip Code' className='form-control' 
        name='zip_code' onChange={handleInput} />
        {errors.zip_code && <p style={{color:"red"}}>{errors.zip_code}</p>}
        </div>

        {/* <label for="zip" className='mt-10'><strong>Zip Code</strong></label>
        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Zip Code"
          variant="filled"
          type="text"
          // value={zip_code}
          onChange={handleInput}
        />
        {errors.firstname && <p style={{color:"red"}}>{errors.first_name}</p>} */}

        {/* <div className='value-area'>
          <label><strong>State:</strong></label>
          <div>
            <select name='state' onChange={(e)=>handleCountry(e)}>
              <option value="">--Select State--</option>
              { stateArray.map((val, idx) => {
              <option key={idx} value={val.name}>{val.name}</option>
            })}
            </select>
          </div>
        </div> */}
        

        <div className='value-area'>
          <label><strong>Country:</strong></label>
          <div>
            <select name='country' onChange={(e)=>handleCountry(e)}>
              <option value="">--Select Country--</option>
              { countries.map((val, idx) => {
              <option key={idx} value={val.name}>{val.name}</option>
            })}
            </select>
          </div>
        </div>

        <div className='value-area'>
          <div className='set'>
            <label><strong>Code:</strong></label>
            <div className='input-group'>
              <div className='input-group-prepend'>
                +
              </div>
              <div>
                <input type='text' name='code' placeholder='Dialcode'  readOnly />
              </div>
            </div>
          </div>
          
          <div className='set'>
            <label><strong>Mobile No:</strong></label>
            <div>
              <input type='text' placeholder='Enter Mobile No' />
            </div>
          </div>

        </div>

        <div className='value-area'>
        <button>
        Submit
        </button>
        </div>


      </div>
    </form>  

    </Base>
  )
}

export default AddUser;