import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';

const Edit = () => {

  const users = {
    fname:"",
    lname:"",
    email:""
  }

  const {id} = useParams();   // it will help for fetch the id from the URL.
  const [user,setUser] = useState(users);

  const navigate = useNavigate();

  const inputChangeHandler=(e)=>{
    const {name,value} = e.target;
    setUser({...user,[name]:value});
    console.log(user);
  }

  // now we want to fetch APIs for getUSer  for the id.
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)   // we called our getUserOne APIs from the back-end and passed ${id} for get the user from the URL.
    .then((response)=>{
      setUser(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[id])   // we passed id in the bracket because we want to render our page when user could be change something in their details.

  const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`,user)
   .then((response)=>{
    toast.success("User Updated Successfully",{position:"top-right"})
    navigate("/")
   }).catch((error)=>{
    console.log(error)
   })
  }

  return (
    <div className='addUser'>
      <Link to={"/"}><i className="fa-solid fa-circle-left back-arrow"></i></Link>
      <h3>UPDATE User</h3>

      <form className='addUSerForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name:</label>
          {/* in input tag name='fname  that name you have write same name as you wrote in your model */}
          <input type="text" value={user.fname} onChange={inputChangeHandler}  placeholder='Enter Your First Name' autoCapitalize='off' name='fname' id='fname'/>
        </div>

        <div className="inputGroup">
          <label htmlFor="lname">Last Name:</label>
          <input type="text" value={user.lname} onChange={inputChangeHandler}  placeholder='Enter Your Last Name' autoCapitalize='off' name='lname' id='lname'/>
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input type="email" value={user.email} onChange={inputChangeHandler}  placeholder='Enter Your Email' autoCapitalize='off' name='email' id='email'/>
        </div>

        <div className="inputGroup">
              <button className="submit">UPDATE USER</button>
        </div>
      </form>
      
    </div>
  )
}

export default Edit
