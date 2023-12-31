import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import Validation from './Validation'
import Select from 'react-select'
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";


function AddUser() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [countries, setCountries] = useState([]);
  const [dial, setDial] = useState();
  const [pick_country, setPick_country] = useState();
  const [pick_countryCode, setPick_countryCode] = useState();
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
    //console.log(countData)
    setDial(countData.callingCodes[0]);
    setPick_country(countData.name);
    setPick_countryCode(countData.alpha2Code);
  }

  //api to get states
  var headers = new Headers();
  //headers.append("X-CSCAPI-KEY", "API_KEY");
  headers.append("X-CSCAPI-KEY", "MW5zNWc2MVBjYjJ0ZTg4Q0NhQ3VtVFhlRGZacld0djRxd1k1WDhOVQ==");

  useEffect(() => {
    const getStates = async () => {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${pick_countryCode}/states`, {
        method: "GET",
        headers:headers,
        redirect:"follow"
      });
      const sdata = await response.json();
      if (sdata) {
        setStateArray(sdata)
        //console.log(sdata)
        if (sdata) {

          const newoption = sdata.map((data) => {
            return {
              value: data.name,
              label: data.name
            }
          })
          setOption(newoption)
        }
      }
    }
    if (pick_countryCode) {
      getStates();
    }
  }, [pick_countryCode])



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
  }

  function handleInput2(event) {
    //console.log(event)
    const newObj = { ...values, ["state"]: event.value }
    setValues(newObj)
    //console.log(values)
  }
  // console.log(errors)

  async function handleValidation(event) {
    event.preventDefault();
    const errorValue = Validation(values)
    setErrors(errorValue);
    //console.log(errors)
    const newdata = { ...values }
    newdata.mobile_code = dial
    newdata.country = pick_country
    //post
    if (!errorValue.error) {
      const response = await fetch("https://form-backend-iota.vercel.app/users/add", {
        method: "POST",
        body: JSON.stringify(newdata),
        headers: {
          "Content-Type": "application/json"
        },
      })
      const data = await response.json()

      newdata._id = data.data.result.insertedId
      dispatch(addUser(newdata))
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
            <div>
              <label htmlFor="first_name" className='mt-10'><strong>First Name:</strong></label>
            </div>
            <div>
              <input type='text' placeholder='Enter First Name' className='form-control'
                name='first_name' onChange={handleInput} />
              {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
            </div>
          </div>

          <div className='value-area'>
            <div>
              <label htmlFor="last_name" className='mt-10'><strong>Last Name:</strong></label>
            </div>
            <div>
              <input type='text' placeholder='Enter Last Name' className='form-control'
                name='last_name' onChange={handleInput} />
              {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
            </div>
          </div>

          <div className='value-area'>
            <div>
              <label htmlFor="email_id" className='mt-10'><strong>Email:</strong></label>
            </div>
            <div>
              <input type='email' placeholder='Enter Email' className='form-control'
                name='email_id' onChange={handleInput} />
              {errors.email_id && <p style={{ color: "red" }}>{errors.email_id}</p>}
            </div>
          </div>



          <div className='value-area'>
            <div>
              <label htmlFor="address_1" className='mt-10'><strong>Address Line1:</strong></label>
            </div>
            <div>
              <input type='text' placeholder='Enter Address Line1' className='form-control'
                name='address_1' onChange={handleInput} />
              {errors.address_1 && <p style={{ color: "red" }}>{errors.address_1}</p>}
            </div>
          </div>

          <div className='value-area'>
            <label htmlFor="address_2" className='mt-10'><strong>Address Line2:</strong></label>
            <input type='text' placeholder='Enter Address Line2' className='form-control'
              name='address_2' onChange={handleInput} />

          </div>



          <div className='value-area'>
            <div>
              <label htmlFor="zip_code" className='mt-10'><strong>Zip Code:</strong></label>
            </div>
            <div>
              <input type='text' placeholder='Enter Zip Code' className='form-control'
                name='zip_code' onChange={handleInput} />
              {errors.zip_code && <p style={{ color: "red" }}>{errors.zip_code}</p>}
            </div>
          </div>



          <div className='value-area'>
            <div>
              <label><strong>Country:</strong></label>
            </div>
            <div>
              <select name='country' className='inputss' style={{ width: "170px" }} onChange={(e) => handleCountry(e)}>
                <option value=""> --Select Country--</option>
                {countries.map((val, idx) => {
                  return <option key={idx} value={idx}>{val.name}</option>
                })}
              </select>
            </div>
          </div>


          {/* <Select options={options} /> */}
          <div className='value-area' style={{ marginBottom: "10px" }}>
            <div>
              <label><strong>State:</strong></label>
            </div>
            <div styles>

              <Select name="state" placeholder={"--Type State--"} className='inputss2' onChange={handleInput2} options={option}>
                --Type State--
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
                <input type='text' placeholder='Enter Mobile No' name='mobile_no' onChange={handleInput} />
              </div>
              {errors.mobile_no && <p style={{ color: "red" }}>{errors.mobile_no}</p>}

            </div>
          </div>



          <div className='value-area'>
            <button className='submit'>
              SUBMIT
            </button>
          </div>


        </div>
      </form>

    </Base>
  )
}

export default AddUser;

