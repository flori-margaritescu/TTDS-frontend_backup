// To install: npm install --save react-router-dom

import React, { Component }  from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import styles from'../css/Pages.css';
import Header from '../components/Header';
import {Grid,Item} from "@material-ui/core";  // will not work unless the following command is run: npm install --global yarn AND AFTER COMMAND: yarn add @material-ui/core@next
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from '@mui/material';
import {Container,Box} from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import Popover from '@mui/material/Popover';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ResultList from '../components/ResultList';
import ScrollButton from '../components/ScrollUpButton';

function ResultsView(props) {

    const location = useLocation();

    // obtain user results from start search page
    const JSONprofilestring = location.state.data;
    const searchResult = JSON.parse(JSONprofilestring);

    // from the start search page - todo: put all common functionality somewhere shared
    const [resultsUpdated, setResultsUpdated] = useState(false)
    const [backendResponse, setBackendResponse] = useState(null); 
    const [message, setMessage] = useState(searchResult["userInput"]);
    const [updated, setUpdated] = useState(message);
    const [backendStatus, setBackendStatus] = useState(false);
    const [count, setCount] = useState(0);
    const [isAdvancedSearch, setAdvancedSearch] = useState(searchResult["advancedSearch"]);
    const [openSource, setOpenSource] = useState(false);
    const [openFormat, setOpenFormat] = useState(false);
    const [sourceCheckBoxes, setSourceCheckbox] = useState([false,false]);  // Khan Academy, MIT
    const [formatCheckBoxes, setFormatCheckbox] = useState([false,false, false]); // Lecture slides, Videos, Articles
    const [isExtendedSearch, setExtendedSearch] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const messageToBackend = { userInput: message, advancedSearch:isAdvancedSearch };
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const navigate = useNavigate();
  
    const handleChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleAdvancedSearch = () => {
      setAdvancedSearch(!isAdvancedSearch);
    };

    const handleOpenFormat = () => {
     setOpenFormat(!openFormat);
    }

    const handleOpenSource = () => {
     setOpenSource(!openSource);
    }

    const clearAllFilters = () => {
     setSourceCheckbox(sourceCheckBoxes => sourceCheckBoxes.map((item, idx) => false));
     setFormatCheckbox(formatCheckBoxes => formatCheckBoxes.map((item, idx) => false));
     setExtendedSearch(false);
    }

    const handleSourceCheckBoxes =(index)=> {
     setSourceCheckbox(sourceCheckBoxes => sourceCheckBoxes.map((item, idx) => idx === index ? !item : item));
    }

    const handleFormatCheckBoxes =(index)=> {
     setFormatCheckbox(formatCheckBoxes => formatCheckBoxes.map((item, idx) => idx === index ? !item : item));
    }

    const handleExtendedChange = () => {
     setExtendedSearch(!isExtendedSearch);
    }
  
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

      // // timer used to periodically check the status of the backend
      // useEffect(() => {
      //   window.location.reload(false);
      // }, [searchResult]);

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
      navigate('/results', { state: { data: myJsonString }});
      setResultsUpdated(!resultsUpdated);
    } 
    }, [backendResponse, navigate]);
    

    // TODO: FIX PAGE REFRESH MECHANISM
    // useEffect(() => {
    //   if (performance.navigation.type == 1) {
    //    getData()
    // } 
    // }, [window.performance]);

    // calls the backend and obtains search results for user query
    function getData() {
      axios.post("/profile", messageToBackend)
      .then((response) => {
        const res =response.data
        setBackendResponse(({
          results: res.results,
          userInput: res.userInput,
          advancedSearch: res.advancedSearch}))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
    }

  return (
<Box sx={{ flexGrow: 1 }}>
  <div className='main'>
     <Grid container
     //    justifyContent="space-evenly"
        className="mainContainer">
          {/* Header */}
          <Grid item xs={12} sm={12}>
               <Header/>
          </Grid>
 
          {/* Filter popover functionality */}
          <Grid item xs={3.5} sm={3.5} style={{textAlign:"right", paddingTop:"3.5%"}}>
          <div>
          <Button aria-describedby={id} 
          variant="contained" 
          onClick={handleClick}
          style={{
               borderRadius: 35,
               backgroundColor: "#133c5a",
           }}>
          <label>Filter </label><FilterAltIcon/>
          </Button>
          <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
          }}
          >
          <Grid container>
          <List
               sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
               component="nav"
               aria-labelledby="nested-list-subheader"
               subheader={
               <ListSubheader component="div" id="nested-list-subheader">
                    <Grid container>
                         <Grid item xs={6} style={{textAlign:"left"}}><label>Filters</label></Grid>
                         <Grid item xs={6} style={{textAlign:"right"}}>
                              <Button 
                              size="small"
                              onClick={clearAllFilters}
                              >Clear All</Button>
                              </Grid>
                    </Grid>
               </ListSubheader>
               }
          >
               <ListItemButton>
               <ListItemText primary="Extended Search" />
               <Switch checked={isExtendedSearch} onChange={handleExtendedChange}/>
               </ListItemButton>

               {/* <ListItemButton>
               <ListItemText primary="Advanced Search" />
               <Switch checked={isAdvancedSearch} onChange={handleAdvancedSearch}/>
               </ListItemButton> */}

               <ListItemButton onClick={handleOpenSource}>
               <ListItemText primary="Source" />
               {openSource ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>

               <Collapse in={openSource} timeout="auto" unmountOnExit>
               <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                    <input type="checkbox" 
                    checked={sourceCheckBoxes[0]}
                    onChange={() => handleSourceCheckBoxes(0)}
                    />
                    <ListItemText primary="Khan Academy" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                    <input type="checkbox" 
                    checked={sourceCheckBoxes[1]}
                    onChange={() => handleSourceCheckBoxes(1)}
                    />
                    <ListItemText primary="MIT" />
                    </ListItemButton>
               </List>
               </Collapse>
       

          <ListItemButton onClick={handleOpenFormat}>
               <ListItemText primary="Format" />
               {openFormat ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>

               <Collapse in={openFormat} timeout="auto" unmountOnExit>
               <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                    <input type="checkbox" 
                    checked={formatCheckBoxes[0]}
                    onChange={() => handleFormatCheckBoxes(0)}
                    />
                    <ListItemText primary="Lecture slides" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                    <input type="checkbox" 
                    checked={formatCheckBoxes[1]}
                    onChange={() => handleFormatCheckBoxes(1)}
                    />
                    <ListItemText primary="Videos" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                    <input type="checkbox" 
                    checked={formatCheckBoxes[2]}
                    onChange={() => handleFormatCheckBoxes(1)}
                    />
                    <ListItemText primary="Articles" />
                    </ListItemButton>

               </List>
               </Collapse>
          </List>
               </Grid>
          </Popover>
    </div>            

          </Grid>

           {/* Search bar */}
          <Grid item xs={8.5} sm={8.5}  style={{float:"left", paddingTop:"3%"}}>

              <Grid item xs={12} sm={12} style={{float:"left", paddingLeft:"2%"}}>
                <SearchBar
                previousSearch = {searchResult["userInput"]}
                message = {message}
                updated = {updated}
                updateAction = {handleChange}
                clickAction = {getData}
                fullwidth
                />
                <br></br>
                {/* Advanced search checkbox */}
                <div style={{textAlign:"center"}}>
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

            <Grid item xs={12} sm={12}>

               <ResultList
               resultList = {searchResult["results"]}
               resultsUpdated = {resultsUpdated}
               />
               <div style={{float:"center", paddingBottom:"5%"}}>
                <ScrollButton/>
               </div>
            </Grid>
        </Grid> 
</div> 
</Box>
)
};

export default ResultsView;
