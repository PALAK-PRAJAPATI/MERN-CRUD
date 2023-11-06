import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import './User.css';
import axios from 'axios'

const User = () => {



  const [users,setUsers] = useState([]);
// we used useEffect hook beacuse we want to display our data on the home page which we created with the help of using create APIs.
  useEffect(()=>{
    const fetchData = async()=>{
      const response = await axios.get("http://localhost:8000/api/getall")  // we store await in the variable beacuse wait method could be return a response.
      // our data will be store in the response and we want to display it using response.data. 
      setUsers(response.data)
    }
    fetchData(); // called our function.
  },[])

  const deleteUser = async(userID)=>{
    await axios.delete(`http://localhost:8000/api/delete/${userID}`)
    .then((response)=>{
      setUsers((preUSer)=>preUSer.filter((user)=>user._id !== userID))
      toast.success("User deleted Successfully ",{position:"top-right"})
    }).catch((error)=>{
      console.log(error)
    })
  }


  return (
    <div className='userTable'>
      <Link to={"/add"} className='adduser'>Add User</Link>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>S.NO.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {
            users.map((user,index)=>{
              return(
                <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className='action-buttons'>
                    <button onClick={()=>{deleteUser(user._id)}} className='delete-btn'><i className="fa-solid fa-trash"></i></button>
                    <Link to={`/edit/` + user._id} className='edit-btn'><i className="fa-solid fa-pen-to-square"></i></Link>
                </td>
            </tr>
              )
            })
          }
            {/* <tr>
                <td>1.</td>
                <td>Palak Prajapati</td>
                <td>palak@gmail.com</td>
                <td className='action-buttons'>
                    <button className='delete-btn'><i className="fa-solid fa-trash"></i></button>
                    <Link to={"/edit"} className='edit-btn'><i className="fa-solid fa-pen-to-square"></i></Link>
                </td>
            </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default User
