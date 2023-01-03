import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { useEffect } from 'react'

const Protected = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        if (user !== [])
        {
            if(!user) navigate("/");
        }
    }, [user]);

    if(user) return children;
}

export default Protected