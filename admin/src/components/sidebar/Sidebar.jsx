import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BedIcon from '@mui/icons-material/Bed';
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link,useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Sidebar = () => {
    const { dispatch: dispatch1 } = useContext(DarkModeContext);
    const {dispatch}=useContext(AuthContext)
    const navigate= useNavigate()
    const handleLogout = () => {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      navigate("/");
    };
    return (
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">StudentStay</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">LISTS</p>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
            <Link to="/hotels" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>Hotels</span>
              </li>
            </Link>
            <Link to="/rooms" style={{ textDecoration: "none" }}>
              <li>
                <BedIcon className="icon" />
                <span>Rooms</span>
              </li>
            </Link>
           
            
            <p className="title">USER</p>
            
            <li onClick={handleLogout}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch1({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch1({ type: "DARK" })}
          ></div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;