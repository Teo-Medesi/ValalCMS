import React, { useContext } from 'react'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { UserContext } from '../App'
import { useEffect } from 'react'

const Protected = ({children}) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    useEffect(() => {
        if (user !== [])
        {
            if(!user) navigate("/");
        }
    }, [user]);

    if(user) return children;
}

export default Protected