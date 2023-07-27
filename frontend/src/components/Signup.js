import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const history = useNavigate()
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
        
    })
    const sendRequest = async () => {
        try {
          const res = await axios.post('http://localhost:5000/api/signup', {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
          });
          const data = res.data;
          console.log('data =>',data)
          return data;
        } catch (err) {
          console.log(err);
          throw err; // Optional: Rethrow the error to handle it in the calling function
        }
      };
      
    const handleSubmit = (e) =>{
        e.preventDefault()
        if (inputs.password !== inputs.confirmPassword) {
          toast.error('Passwords do not match');
        }
        else
        sendRequest().then(()=>history("/"))

    }
    const handleChange = (e)=>{
        setInputs(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
        
    }
  return (
    <div>
       
        <form onSubmit={handleSubmit}>
            <Box 
            marginLeft="auto" 
            marginRight="auto" 
            width={300} 
            display="flex" 
            flexDirection={'column'}
            justifyContent="center"
            alignItems="center">
                 <Typography variant='h2'>Sign Up</Typography>
                <TextField onChange={handleChange}
                 value={inputs.name} 
                 name='name'
                 margin='normal' variant='outlined' placeholder='Name'/>
                <TextField onChange={handleChange}
                 name='email'
                 type='email' value={inputs.email} margin='normal' variant='outlined' placeholder='Email'/>
                <TextField onChange={handleChange}
                name='password'
                type='password' value={inputs.password} margin='normal' variant='outlined' placeholder='Password'/>
                <TextField onChange={handleChange}
                name='confirmPassword'
                type='password' value={inputs.confirmPassword} margin='normal' variant='outlined' placeholder='Confirm Password'/>
                <Button variant='contained' type='submit'>Signup</Button>
            </Box>
        </form>
    </div>
  )
}

export default Signup