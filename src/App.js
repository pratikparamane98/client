import React, { useState,useEffect} from 'react';
import axios from 'axios'
import EditForm from "./components/edit";
import { Button } from '@material-ui/core';


function App() {
    const [movies,setMovies] = useState([]) //for getting data
    const [editing, setEditing] = useState(false)
    const [id,setId] = useState('')
    const [movie,setMovie] = useState('') //for posting data 
        
    

    useEffect(() => {
        fetch('/movies').then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes =>setMovies(jsonRes))
        // console.log(movies)
        
    })
    
    function handleChange(e){

            const {name,value}=e.target
            setMovie(prevInput=>{
                return(
                    {
                    ...prevInput,//this makes sure that there are previous inputs in the array
                    [name]:value
                    }
                )
            })
    }

    function addMovie(e){
        e.preventDefault();

        const newmovie = {
            id: Math.floor(Math.random() * 10000),
            title:movie.title
        }
        console.log(newmovie)
        axios.post('/newmovie',newmovie)
    }

    function deleteMovie(id){
        axios.delete('/delete/'+ id)
    }   

    
    function editUser(id, pow) {//Here this function receives the id and currentUser from UserTable 
        setEditing(true);   //it sets the edititing state=true which means you can now edit the current user
        console.log(pow)
        setId(id)

      };

  

  return (

    <>
    <div className="main-div">
      <div className="center-div">
        <br></br>
        <h1 className="h1">Todo-List</h1>
        <br></br>

        {editing ? (                       //if editing is true then call EditUserForm else call AddUserForm
                <div>
                  {/* <h2>Edit user</h2> */}

                  <EditForm

                    // currentUser={currentUser}
                    editing={editing}
                    setEditing={setEditing}
                    // updateUser={updateUser}
                    id={id}
                    setId={setId}
                  />
                </div>
              ) : (
                <div>
                  <input className="input"
                    type="text" 
                    placeholder="Add items to the list" 
                    onChange={handleChange} name="title" value = {movie.name}/>
                    <Button  color = "primary"  onClick={addMovie}>Add</Button>

                    <ol>
                    { movies.map((pow,index)=>{
                                
                                return(                             
                                      <div className="todo_style">
                                        <i className ="fa fa-times" aria-hidden="true" onClick={(e)=>deleteMovie(pow._id,e)}/>
                                        <i className="fas fa-edit" aria-hidden="true" onClick={(e) =>editUser(pow._id, pow)}></i>
                                        <h1 style={{color: "skyblue",fontSize:"20px",fontFamily: "cursive",alignItems:"center"}} key={pow._id} id={pow._id}>{pow.title}</h1>                                     
                                      </div>   
                                      )
                                    })
                    }
                    </ol>
                </div>
              )}   
      </div>
    </div>
    </>
)
}


export default App;
