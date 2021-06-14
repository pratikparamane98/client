import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios'


const EditUserForm = (props) => {    

    const [user, setUser] = useState("");
    const [id,setId] = useState(props.id)

    
    useEffect(function() {
        async function getArticle() {
          try {
            const response = await axios.get(`/movies/`+id);
            setUser(response.data);        
          } catch(error) {
            console.log(error);
          }
        }
        getArticle();    
      }, []);

    
  function handleSubmit(event) {
    event.preventDefault();
    async function updateArticle() {
      try {
        await axios.patch(`/movies/`+id, user);
      } catch(error) {
        console.log(error);
      }
    }
    updateArticle();
    props.setEditing(false)
  }

  function handleChange(event) {
    setUser({...user, [event.target.name]: event.target.value})
  }


    return (
        <form onSubmit={handleSubmit}>
            <div>
              <input className="input"
                type="text" 
                placeholder="Update items in the list" 
                onChange={handleChange} name="title" value = {user.name}/>
            </div>
            <div>
                <Button  color = "primary" className="" onClick={handleSubmit}>update</Button>
                <Button color = "secondary"type="submit" onClick={() =>props.setEditing(false)} >Cancel</Button>
            </div>
        </form>
    )
}

export default EditUserForm;