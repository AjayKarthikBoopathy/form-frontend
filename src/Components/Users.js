import React, { useState, useEffect } from 'react'
import Base from '../Base/Base'
import AddUser from './AddUser.js';
import UpdateUser from './UpdateUser.js';
import { useHistory } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function Users({ userData, setUserData }) {
    const history = useHistory();

    useEffect(()=>{
        const getUsers = async () =>{
            const response = await fetch("https://form-backend-iota.vercel.app/users/all", {
              method:"GET",
            }); 
            const data = await response.json();
            if(data){
              setUserData(data.data) 
            }
        }
        getUsers();
      }, [])

    // delete functionality
    const deleteUser = async (userId) => {

        const response = await fetch(`https://form-backend-iota.vercel.app/users/delete/${userId}`, {
            method: "DELETE",
        });

        const data = await response.json()
        if (data) {
            const remainingUsers =
                userData.filter((user) => user._id !== userId)
            setUserData(remainingUsers)
        }
    }


    return (
        <Base
            title={"Users Dashboard"}
            description={"This page contains all users data"}
        >

            <Box className='card-container1' sx={{ display: "flex", flexWrap: "wrap", gap: "2rem", paddingLeft: "60px", columnGap: "8rem" }}>
               
                {userData.map((user, idx) => (
                    <Box key={idx} className='card1' sx={{ Width: 200, height: 420, boxShadow: "6px 5px 12px 2px lightGrey" }}>
                    
                        <CardContent sx={{ display: "flex", rowGap: "20px", flexWrap:"wrap", flexDirection:"column" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {user.first_name} {user.last_name}
                            </Typography>
                            {/* <Typography gutterBottom variant="h5" component="div">
                                {user.last_name}
                            </Typography> */}
                            <Typography variant="body2" color="text.primary">
                                {user.email_id}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {user.mobile_no}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {user.address_1}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {user.address_2}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {user.state}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {user.country}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {user.zip_code}
                            </Typography>
                                                        
                        </CardContent>

                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button
                                size="small"
                                onClick={() => history.push(`/users/edit/${user._id}`)}
                            >

                            <EditIcon />

                            </Button>
                            <Button
                                size="small"
                               
                                onClick={() => deleteUser(user._id)}
                            >
                            
                            <DeleteIcon />

                            </Button>
                        </CardActions>
                    
                    </Box>

                ))}

            </Box>

        </Base>
    )
}

export default Users;

