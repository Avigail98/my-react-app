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
        <body>
<header>
    <div class="wrapper">
        <h1>Post<span class="rouge">'</span>users</h1>
        <nav>
            <ul>
                <li><a href="#main">User Table</a></li>
                <li><a href="#posttable">Post Table</a></li>

            </ul>
        </nav>
    </div>
</header>


<div id="main">
        {/* <div class="displayi"> */}
        <div>
            {loading? (
                <p>Loading...</p>
            ):(<>
            <label for="name">Name:</label>
<input type="text" id="name" name="name" placeholder="Enter a name" value={nameFilter} onChange={(e)=>setFilterName(e.target.value)}/>
           <br></br>
           <label for="email">Email:</label>
           <input type="text" id="email" placeholder="Enter an email" name="email" value={emailFilter} onChange={(e)=>setFilterEmail(e.target.value)}/>
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
                            <td><button onClick={()=>setUserId(user.id)}><a href="#posttable"> {user.name}</a></button></td>
                        </tr>
                    ))}
                </tbody>
            </table></>
           )}   </div> 
           </div>

           <div id="posttable">
<div>
     <UserPosts userId={userId}></UserPosts>
     </div>
</div>
</body>
        </div>

        

    );
}
 
export default UsersTable;
