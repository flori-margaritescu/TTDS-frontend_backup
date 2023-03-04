import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { IconButton } from '@mui/material';  // npm install @mui/icons-material
import SearchIcon from '@mui/icons-material/Search';
import styles from "../css/Pages.css";

function SearchBar(props) {

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            event.preventDefault();
            props.clickAction();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [props.message]); // MUST ADD MY PROPERTY HERE BETWEEN BRACKETS FOR IT TO SEND CORRECT UPDATD STATE

    return(
      <div>

      <Grid container
      spacing={2}>

        <Grid item xs={12} sm={12} style={{textAlign:"center"}}>
        <TextField 
            sx={{
              width: { sm: 600, md: 700 },
              "& .MuiInputBase-root": {
                  height: 60
              }, fontWeight:"bold"
          }}
        className="inputRounded"
        id="filled-basic" 
        label={"Type your search..."} 
        variant="outlined" 
        size="large"
        onChange={props.updateAction}
        value={props.message}
        />

        <IconButton
        variant="contained" onClick={props.clickAction} size="large" style={{ color: "#133c5a" }}>
         <SearchIcon size="large" style={{minWidth: '40px', minHeight: '40px'}}/>
        </IconButton>
        </Grid>

      </Grid>
        </div>
    )

}

export default SearchBar;