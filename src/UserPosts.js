import { useEffect, useState } from "react";

const UserPosts = ( props) => {

    const [dialog,setDialog]=useState(true);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [postsFilter,setPostsFilter]=useState([]);


    useEffect(() =>{
        const fetchData=async() =>{
            try{
                const response= await fetch('https://jsonplaceholder.typicode.com/posts');
                const data=await response.json();
                setPostsFilter(data.filter((e)=>e.userId===props.userId) )
            }
            catch (error){
                console.error("Error fetching user data:",error);
            }
        };
        fetchData();
    
    },[props.userId] );
    
    const handleSubmit = (e) => { 
        e.preventDefault();
        
        var userid=props.userId
        const post = {userid, title, body};

     fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
              },
            body: JSON.stringify(post)
           
          })
         .then((res) => res.json())
          .then((res) => {
             setPostsFilter((posts) => [res, ...posts])
             console.log("red.data",res)
             console.log("red.data",postsFilter)
             setTitle('')
             setBody('')

        }).catch((err) => {
            console.log("errrrrrr",err.message)
         })
    }


    return (
        <div>
            <button class="create" style={{visibility:!props.userId?"hidden": "visible"}} onClick={()=>setDialog(!dialog)}>Create new post</button>

<form class="postform" method="post" onSubmit={handleSubmit} style={{visibility:dialog?"hidden": "visible"}}>

    <label>Title:</label> <textarea value={title} required onChange={(e)=>setTitle(e.target.value)} /><br></br>
    <label>Body:</label> <textarea value={body} required onChange={(e) =>setBody(e.target.value)} />
    <br></br> 
    <button type="Submit">Submit</button>
     
</form>
            {/* <h1 class="post-title">Posts</h1>  */}
            
            <table class="postTable" >
                {postsFilter?.map((poo) => ( 
            <tr key ={poo.id}><h4 class="post">{poo.title }</h4>
            <p class="post">{poo.body}</p>
                </tr>
                ))
                }
            </table>
            
              
        </div>
     );
}
export default UserPosts ;
