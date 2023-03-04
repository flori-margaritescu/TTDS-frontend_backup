import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../css/StartPage.css';
import SearchBar from '../components/SearchBar';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import {Grid} from "@material-ui/core";  // will not work unless the following command is run: npm install --global yarn AND AFTER COMMAND: yarn add @material-ui/core@next
import { textAlign } from '@mui/system';
import logo from "./Course_compass_Logo.png";
import Switch from '@mui/material/Switch';

function StartSearchPage(props) {

  const [backendResponse, setBackendResponse] = useState(null); 
  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState(message);
  const [backendStatus, setBackendStatus] = useState(false);
  const [count, setCount] = useState(0);
  const [isAdvancedSearch, setAdvancedSearch] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAdvancedSearch = () => {
    setAdvancedSearch(!isAdvancedSearch);
  };

  const styles = {
    paperContainer: {
        backgroundImage: 'url(${Background})'
    }
};
  // timer used to periodically check the status of the backend
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count + 1);
    }, 2000);
    checkBackend();
    return () => clearInterval(interval);
  }, [count]);

  // checking the status of the backend via web requests
  function checkBackend() {
    axios.get("/check")
      .then((response) => {
        if (response.status === 200) {
          setBackendStatus(true);
        }
      })
      .catch((error) => {
        setBackendStatus(false);
        console.error(error);
      });
  };

  // once the user clicks search a new page will be loaded and the information received from the backend relayed to it
  useEffect(() => {
    if (backendResponse) {
    const myJsonString = JSON.stringify(backendResponse);
    console.log(myJsonString)
    navigate('/results', { state: { data: myJsonString }});
  }
  }, [backendResponse, navigate]);

  // calls the backend and obtains search results for user query
  const messageToBackend = { userInput: message, advancedSearch:isAdvancedSearch };
  function getData() {
    axios.post("/profile", messageToBackend)
    .then((response) => {
      const res =response.data
      setBackendResponse(({
        results: res.userInputResult,
        ack: res.acknowledgement,
        advancedSearch: res.advancedSearch}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  // if backend is up and running then normal operation
   if  (backendStatus) {
    return (
        <div className='mainDiv'>
        <Grid container
        spacing={2}>

            <Grid item xs={12} sm={12} style={{maxHeight:"30%",textAlign:"center",paddingTop:"10%"}}>
                <div>
                <img src={logo} width="55%" style={{objectFit:"contain"}}></img>
                </div>
            </Grid>

            <Grid item xs={12} sm={12} style={{textAlign:"center"}}>
                <SearchBar
                message = {message}
                updated = {updated}
                updateAction = {handleChange}
                clickAction = {getData}
                fullwidth
                />
            </Grid>

            <Grid item xs={12} sm={12}  style={{textAlign:"center"}}>
            <div>
            <label style={{paddingRight:"1%"}}>
            <div class="btn btn-primary tooltip"> Advanced search
            <div class="bottom">
                <h3>What is advanced search?</h3>
                <p>Dolor sit amet, consectetur adipiscing elit. For more information: link.</p>
                <i></i>
            </div>
        </div>  
            </label>
            <Switch checked={isAdvancedSearch} onChange={handleAdvancedSearch}/>
            </div>  
            </Grid>

        </Grid>
        
  </div>
);  } else { // backend is not currently responding
  return (
    <div>
        <Grid container 
        spacing={2}
        style={{textAlign:"center",paddingTop:"23%"}}>
            <Grid item xs={12} sm={12} style={{textAlign:"center"}}>
                <CircularProgress 
                size="5rem"/>
            </Grid>
        </Grid>
    </div>
  ) }
}
   
export default StartSearchPage;