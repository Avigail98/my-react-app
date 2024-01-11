import { useEffect, useState } from "react";
import UserPosts from "./UserPosts";
import {  TextField } from "@mui/material";
import Dashboard from "./Dashboard";


const UsersTable = () => {

    const [userData,setUserData]=useState([]);
    const [emailFilter,setFilterEmail]=useState('');
    const [nameFilter,setFilterName]=useState('');
    const [userId,setUserId]=useState('');
    
    
    useEffect(() =>{
        const fetchData=async() =>{
            try{
                const response= await fetch('https://jsonplaceholder.typicode.com/users');
                const data=await response.json();
                setUserData(data);

            }
            catch (error){
                console.error("Error fetching user data:",error);
            }
        };
        fetchData();
        
    },[] );

    const filteredElements = userData.filter(e => e.name.toLowerCase().includes(nameFilter.toLowerCase())&& 
    e.email.toLowerCase().includes(emailFilter.toLowerCase()))
    
    return (  
        <div>
        <div class="displayi">
        <div>
        <Dashboard/>
            <h1>Users Table</h1>
           <TextField variant ="outlined" label ="Name"  value={nameFilter} onChange={(e)=>setFilterName(e.target.value)}/>
           <br></br>
           <TextField variant ="outlined" label ="Email" value={emailFilter} onChange={(e)=>setFilterEmail(e.target.value)}/>
            <table class="users">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company Name</th>
                        <th>View posts</th>
                    </tr>
                </thead>
                <tbody>
                    { filteredElements.map((user)=> (
                        <tr key = {user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.company.name}</td>
                            <td><button onClick={()=>setUserId(user.id)}> {user.name}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div> <div>
            <UserPosts userId={userId}></UserPosts>
        </div>
        </div>
        </div>

    );
}
 
export default UsersTable;
