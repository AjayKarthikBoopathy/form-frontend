export default function Validation(values) {
    const errors = {
        error: false
    }

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;     //  (^\s@) :- without 'space' & '@' 2-min,6-max
    const first_name_pattern = /^[\s\S]{5,}$/;                  // min 5 char
    const last_name_pattern = /^[\s\S]{5,}$/;
    const mobile_no_pattern = /^[0-9]{10,12}$/;                 // 10 to 12 digits
    //const zip_code_pattern = /^\d{1,8}$/;
    const zip_code_pattern = /^\d{3,5}(?:[-\s]\d{3,5})?$/;

    if(values.first_name === "") {
        errors.first_name = "First Name is Required!";
        errors.error = true
    }
    else if(!first_name_pattern.test(values.first_name)) {
        errors.first_name = "Value must be more than 5!"
        errors.error = true
    }

    if(values.last_name === "") {
        errors.last_name = "Last Name is Required!";
        errors.error = true
    }
    else if(!last_name_pattern.test(values.last_name)) {
        errors.last_name = "Value must be more than 5!"
        errors.error = true
    }

    if(values.email_id === "") {
        errors.email_id = "Email is Required!";
        errors.error = true
    }
    else if(!email_pattern.test(values.email_id)) {
        errors.email_id = "Email Format Not Supported!"
        errors.error = true
    }

    if(values.mobile_no === "") {
        errors.mobile_no = "Mobile Number is Required!";
        errors.error = true
    }
    else if(!mobile_no_pattern.test(values.mobile_no)) {
        errors.mobile_no = "Number Format incorrect!"
        errors.error = true
    }

    if(values.address_1 === "") {
        errors.address_1 = "Address Line1 is Required!";
        errors.error = true
    }

    if(values.zip_code === "") {
        errors.zip_code = "Zip Code is Required!";
        errors.error = true
    }
    else if(!zip_code_pattern.test(values.zip_code)) {
        errors.zip_code = "Zip Code Format incorrect!"
        errors.error = true
    }

    // console.log(errors)
    return errors;
}

// ^\d{1,5}$ zip code


{/* <div className='value-area'>
        <label htmlFor="mobile_no" className='mt-10'><strong>Mobile:</strong></label>
        <input type='text' placeholder='Enter Mobile Number' className='form-control' 
        name='mobile_no' onChange={handleInput} />
        {errors.mobile_no && <p style={{color:"red"}}>{errors.mobile_no}</p>}
        </div> */}

{/* <div className='value-area'>
        <label htmlFor="state" className='mt-10'><strong>State:</strong></label>
        <input type='text' placeholder='Enter State' className='form-control' 
        name='state' onChange={handleInput} />
        
        </div>

        <div className='value-area'>
        <label htmlFor="country" className='mt-10'><strong>Country:</strong></label>
        <input type='text' placeholder='Enter Country' className='form-control' 
        name='country' onChange={handleInput} />
        
        </div> */}

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