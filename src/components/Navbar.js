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
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link to="/new-treasure">
            <button>Add Treasure</button>
          </Link>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;