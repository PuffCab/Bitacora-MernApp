import React from 'react';
import "./register.css"

function Register() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Bitacora</h3>
                    <span className="loginText">Login to see some nice places</span>
                </div>
                <div className="loginRight">
                    <div className="loginArea">
                        <input placeholder="email" className="loginInput" />
                        <input placeholder="password" className="loginInput" />
                        <button className="loginButton">Sign up</button>
                        <button className="loginRegisterButton">Login into your Account</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Register;