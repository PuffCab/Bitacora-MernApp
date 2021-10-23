
import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
// import axios from "axios";
import axios2 from '../tools/axios2';
// import { AuthContext } from './AuthContext';

export const AuthContext = createContext();




const setLocalStorage = (response) => {
    localStorage.setItem("token", response.data.token);
    console.log("Token stored in local storage");
  };

  
  
export const AuthContextProvider = ({ children }) => {

    let history = useHistory()
    
    const [loggedUser, setLoggedUser] = useState("user Not Logged in");

    const loginUser =  (userLogin) => {
         axios2
         .post("/auth/login", userLogin)
         .then((response) => {
             console.log(`AUTHCONTEXT: sucess >>>`, response);
                //stre token in Local storage
             setLocalStorage(response);

             const data = response.data;
             const user = data.user;
             console.log(`AuthContext: user Login>>>`, user)
            //  console.log("Authcontext response", response.data);
            //  console.log("Authcontext TOKEN", response.data.token)
                
             

             //Set user
             setLoggedUser(user);
             
             if(user) {
                 history.push("/");
             } 

         })
         .catch((error) => console.log(`ErrorMessage>>>`, error.message));
    }   
    console.log("logginUSER>>>", loggedUser)


    // const getUser = () => {
    //     axios2
    //       .get("/users/")
    //       .then((response) => {
    //         console.log(response.data.user);
    //         const user = response.data.user;
    //         if (user) {
    //           console.log("got your user");
    //           setLoggedUser(user);
    //         } else {
    //           console.log("No user logged");
    //           setLoggedUser(null);
    //         }
    //       })
    //       .catch((error) => console.log(`error`, error));
    //   };

    //   useEffect(() => {
    //     getUser();
    //   }, []);
    
    
    return (
        <AuthContext.Provider value={{loggedUser, loginUser}}>
            {children}
        </AuthContext.Provider>
    
    )
}