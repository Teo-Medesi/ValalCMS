import React from 'react'
import { auth } from '../firebase.config'
import { Navigate, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Children } from 'react'

const Protected = () => {
    const navigate = useNavigate();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return Children;
        }
        else {
            navigate("/sign-up");
        }   
    })

}

export default Protected