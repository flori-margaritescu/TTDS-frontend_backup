import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import logo from "../pages/Course_compass_Logo.png";
import styles from "../css/Pages.css";

function Header() {
  return (
    <div position="static" style={{ "background-image": "linear-gradient(to bottom, #395e7e, #FFFFFF)" ,height:"15vh", position:"static"}}>
        <div>
                <img src={logo} width="35%" style={{objectFit:"contain", paddingLeft:"1%"}}></img>
        </div> 
    </div>

  );
}
export default Header;