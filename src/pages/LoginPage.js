import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
 
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext); 
 
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    authService.login(requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );
      
        storeToken(response.data.authToken); 
        authenticateUser();
        navigate('/');                            

      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div>
    <div className="LoginPage">
      <h1>Login</h1>
      <p>Don't have an account yet?
      <Link to={"/signup"}> Sign Up</Link></p>
      <form onSubmit={handleLoginSubmit}>
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
 
        <button className="login-button" type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 </div>
      <footer className="footer">
                <div className="footer-copyright">
                    Copyright © 2023 Tobias Krauß. All rights reserved
                </div>
                <div className="footer-impressum">
                    <div>
                    Data Privacy
                    </div>
                    <div>
                        Imprint
                    </div>
                </div>
            </footer>
    </div>
  )
}
 
export default LoginPage;