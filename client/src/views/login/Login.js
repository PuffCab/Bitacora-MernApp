import React from 'react';
import "./login.css"

function Login() {
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
                        <button className="loginButton">Login</button>
                        <span className="loginRemberPassword">Forgot Password</span>
                        <button className="loginRegisterButton">Register</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Login;