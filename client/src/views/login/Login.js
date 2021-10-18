import React, { useContext, useRef } from 'react';
import "./login.css"
import { loginCall } from "../../tools/loginCall.js"
import { AuthContext } from '../../context/AuthContext';

// import CircularProgress from '@mui/material/CircularProgress'; //REVIEW why gives error? cannto use it login button


function Login() {

    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value ,password: password.current.value }, 
              dispatch )
        console.log(email.current.value)
    };

    console.log(`USER`, user)
    return ( 
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Bitacora</h3>
                    <span className="loginText">Login to see some nice places</span>
                </div>
                <div className="loginRight">
                    <form className="loginArea" onSubmit={handleOnSubmit}>
                        <input 
                            className="loginInput" 
                            placeholder="email" 
                            type="email" 
                            required 
                            ref={email}  
                        />
                        <input  
                            className="loginInput" 
                            placeholder="password" 
                            type="password" 
                            required
                            minLength="6" 
                            ref={password}
                        />
                        <button className="loginButton" type="submit">
                            {isFetching ? "loading!" : "login"} 
                         </button>
                        <span className="loginRemberPassword">Forgot Password</span>
                        <button className="loginRegisterButton">
                            {isFetching ? "loading!" : "Register "} 
                        </button>
                    </form>
                </div>
            </div>
             
        </div>
    );
}

export default Login;