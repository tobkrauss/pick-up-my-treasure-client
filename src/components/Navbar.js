import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/treasure">
            <button>Treasure List</button>
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link to="/new-treasure">
            <button>Add Treasure</button>
          </Link>
        </>
      )}
       {isLoggedIn && (
      
      <div className="navbar-user">
        <span>{user && user.name}</span>
        <button onClick={logOutUser}>Logout</button>
      </div>
      )}

      {!isLoggedIn && (
        <div className="navbar-login">
          <Link to="/signup" style={{textDecoration: "none"}}> <button>Sign Up</button> </Link>
          <Link to="/login" style={{textDecoration: "none"}}> <button>Login</button> </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;