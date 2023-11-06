import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Add.css'
import toast from 'react-hot-toast'

const Add = () => {

  const users = {
    fname:"",
    lname:"",
    email:"",
    password:""
  }

  const [user,setUser] = useState(users);
  const navigate = useNavigate();   // import useNavigate hook beacuse we want to render our data at home page after creating a new user.

  const inputHandler =(e)=>{
    const {name,value} = e.target;

    // our previous data stay as it is and our updated data  apend inside the user variable. 
    setUser({...user,[name]:value});
    // console.log(user);
  }


  // we want to submit our data in database after clicking on a submit button.
  // so we want to called our api.
  // we have to create event handle on form is onSubmit event.
  const submitUser = async(e)=>{
    e.preventDefault();
    // now we have to called our APIs for submit our data using a axios package.
    // localhost:8000/api/create is the our create data APIs. which we create in back-end for create a User.
    // using post method we have to passed create apis URl and second is passed our variable which can be store our data.
    // our data store inside the user variable that's why we passed a variable inside the post method.
    await axios.post("http://localhost:8000/api/create", user)
    .then((response)=>{
      toast.success("User Created Successfully",{position:"top-right"});
      navigate("/")  // useNavigate hook for render our data at a home page.
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  return (
    <div className='addUser'>
      <Link to={"/"}><i className="fa-solid fa-circle-left back-arrow"></i></Link>
      <h3>Add New User</h3>

      <form className='addUSerForm' onSubmit={submitUser}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name:</label>
          {/* in input tag name='fname  that name you have write same name as you wrote in your model */}
          <input type="text" onChange={inputHandler}  placeholder='Enter Your First Name' autoCapitalize='off' name='fname' id='fname'/>
        </div>

        <div className="inputGroup">
          <label htmlFor="lname">Last Name:</label>
          <input type="text" onChange={inputHandler}  placeholder='Enter Your Last Name' autoCapitalize='off' name='lname' id='lname'/>
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input type="email" onChange={inputHandler}  placeholder='Enter Your Email' autoCapitalize='off' name='email' id='email'/>
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Password:</label>
          <input type="password" onChange={inputHandler}  placeholder='Enter Your Password' autoCapitalize='off' name='password' id='password'/>
        </div>

        <div className="inputGroup">
              <button className="submit">ADD USER</button>
        </div>
      </form>
      
    </div>
  )
}

export default Add
