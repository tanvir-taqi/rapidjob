import { createContext, useEffect, useState } from "react";

import React from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword,  signOut} from 'firebase/auth'
import { auth } from "../firebase/firebase.config";





export const AuthContext = React.createContext()


const UserContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // user sign up 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // user log in
    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // log out user 
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

      //update Profile
      const userUpdate = (profile)=>{
        setLoading(true);
        return updateProfile(auth.currentUser , profile)
        
    }

    // observer
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
           
            setUser(currentUser);
            setLoading(false);
        });

       
        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, 
        loading,
        setLoading,
        createUser,
        userUpdate, 
        login,
        logOut
    }


    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;