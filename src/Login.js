import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from 'react-router-dom';
import { auth } from "./firebase";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = e => {
        e.preventDefault();
        // Use the email and password from state
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    // If the user is logged in, redirect to the homepage
                    history.push('/');
                }
            })
            .catch(error => {
                alert("Invalid credentials");
            });
    }

    const register = e => {
        e.preventDefault();
        // Use the email and password from state
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                
                if (auth) {
                    // If the user is logged in, redirect to the homepage
                    history.push('/');
                }
            })
            .catch(error => {
                // console.error(error.message);
                alert(error.message);
            });
    }

    return (
        <div className="login">
            <Link to="/">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="amazon-logo"
                    className="login__logo"
                />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="input"/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
                    <button type="submit" onClick={signIn} className="login__signInButton">Sign In</button>
                </form>    
                    
                    <p className="para">By signing in, you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.</p>
                    <button type="submit" onClick={register} className="login__registerButton">Create your Amazon Account</button>
                
            </div>
        </div>
    );
}

export default Login;
