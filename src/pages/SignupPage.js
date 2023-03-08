import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
 
 
 
function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
 
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };
 
    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    authService.signup(requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div>
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <p>Already have account?
      <Link to={"/login"}> Login</Link></p>

      <form onSubmit={handleSignupSubmit}>
      <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          placeholder="Name"
        />
        
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          placeholder="E-Mail"
        />
 
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
        />
 
       
 
        <button className="login-button" type="submit">Sign Up</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }
      
    </div>
    <footer className="footer">
                <div className="footer-copyright">
                    Copyright © 2023 Tobias Krauß. All rights reserved
                </div>
                <div className="footer-impressum">
                    <div>
                        Datenschutz
                    </div>
                    <div>
                        Impressum
                    </div>
                </div>
            </footer>
    </div>
  )
}
 
export default SignupPage;