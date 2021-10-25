import React, { useRef } from 'react';
import "./register.css"
import axios from "axios"
import {  useHistory } from 'react-router';

function Register() {
    
    const history = useHistory()
    const email = useRef();
    const password= useRef();
    const userName= useRef();
    
    const handleClick = async (e) => {
        e.preventDefault()
        const user = {
            userName: userName.current.value,
            email: email.current.value,
            password: password.current.value
        }
        try {
            await axios.post("/auth/register", user)
            history.push("/login")
            console.log("user Registered", user)
        } catch(err) {
            console.log(`err>>>`, err)
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Bitacora</h3>
                    <span className="loginText">Create an Account</span>
                </div>
                <div className="loginRight">
                    <form className="loginArea" onSubmit={handleClick}>
                        <input 
                            className="loginInput" 
                            placeholder="User Name"
                            ref={userName}
                        />
                        <input 
                            className="loginInput" 
                            placeholder="email"
                            type="email"
                            ref={email}
                        />
                        <input 
                            className="loginInput" 
                            placeholder="password"
                            type="password"
                            ref={password}
                            minLength="6"                               
                            />
                        <button className="loginButton" type="submit">Sign up</button>
                        <button className="loginRegisterButton" type="submit" onClick={(() => history.push('/login'))}>Login</button>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

export default Register;