import { useEffect, useState } from "react";
import UserPosts from "./UserPosts";

const UsersTable = () => {

    const [loading , setLoading] = useState(true)
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
            finally{setLoading(false);}
        };
        fetchData();
        
    },[] );

    const filteredElements = userData.filter(e => e.name.toLowerCase().includes(nameFilter.toLowerCase())&& 
    e.email.toLowerCase().includes(emailFilter.toLowerCase()))
    
    return (  
        <div>
        <div class="displayi">
        <div>
            <h1>Users Table</h1>
            {loading? (
                <p>Loading...</p>
            ):(<>
            <label for="name">Name:</label>
<input type="text" id="name" name="name"  value={nameFilter} onChange={(e)=>setFilterName(e.target.value)}/>
           <br></br>
           <label for="email">Email:</label>
           <input type="text" id="email" name="email" value={emailFilter} onChange={(e)=>setFilterEmail(e.target.value)}/>
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
            </table></>
           )}   </div> <div>
            <UserPosts userId={userId}></UserPosts>
        </div>
        </div>
        </div>

    );
}
 
export default UsersTable;
