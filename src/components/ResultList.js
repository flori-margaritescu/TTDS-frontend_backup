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
import Typography from '@mui/material/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function ResultList() {
  return (
    <div>
                      {/* Results + fixed header at top indicating results number */}
                      <Grid container rowSpacing={3} xs={12} sm={12} className="secContainerResults" justifyContent="space-around" style={{paddingBottom:"5%"}}>
               {/* for each ele,emt in a list output a contauner --> may have to do it in a separate component */}
               <Grid item xs={12} sm={12} className='gridItem'  justifyContent="space-around" style={{textAlign:"left", paddingRight:"10%", paddingLeft:"10%"}}>
                    <div style={{backgroundColor:"white", height:"100px", borderRadius:"20px", padding:"2%", borderRightStyle:"solid", borderTopColor:"133c5a"}}> Results: </div>
               </Grid>
               
               <Grid item xs={12} sm={12} className='gridItem'  justifyContent="space-around" style={{textAlign:"left", paddingRight:"10%", paddingLeft:"10%"}}>
                    <div style={{backgroundColor:"white", height:"100px", borderRadius:"20px", padding:"2%", borderRightStyle:"solid", borderTopColor:"133c5a"}}> Results: </div>
               </Grid>

               <Grid item xs={12} sm={12} className='gridItem'  justifyContent="space-around" style={{textAlign:"left", paddingRight:"10%", paddingLeft:"10%"}}>
                    <div style={{backgroundColor:"white", height:"100px", borderRadius:"20px", padding:"2%", borderRightStyle:"solid", borderTopColor:"133c5a"}}> Results: </div>
               </Grid>

               <Grid item xs={12} sm={12} className='gridItem'  justifyContent="space-around" style={{textAlign:"left", paddingRight:"10%", paddingLeft:"10%"}}>
                    <div style={{backgroundColor:"white", height:"100px", borderRadius:"20px", padding:"2%", borderRightStyle:"solid", borderTopColor:"133c5a"}}> Results: </div>
               </Grid>

               <Grid item xs={12} sm={12} className='gridItem'  justifyContent="space-around" style={{textAlign:"left", paddingRight:"10%", paddingLeft:"10%"}}>
                    <div style={{backgroundColor:"white", height:"100px", borderRadius:"20px", padding:"2%", borderRightStyle:"solid", borderTopColor:"133c5a"}}> Results: </div>
               </Grid>

               <Grid item xs={12} sm={12} className='gridItem'  justifyContent="space-around" style={{textAlign:"left", paddingRight:"10%", paddingLeft:"10%"}}>
                    <div style={{backgroundColor:"white", height:"100px", borderRadius:"20px", padding:"2%", borderRightStyle:"solid", borderTopColor:"133c5a"}}> Results: </div>
               </Grid>

            </Grid>
    </div>

  );
}
export default ResultList;