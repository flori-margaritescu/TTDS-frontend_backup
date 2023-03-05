// // npm install --save styled-components
// // npm install --save react-icons
// // From website: https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/

// import React, {useState} from 'react';
// import { Button } from '@mui/material';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// const ScrollButton = () =>{
  
//   const [visible, setVisible] = useState(false)
  
//   const toggleVisible = () => {
//     const scrolled = document.documentElement.scrollTop;
//     if (scrolled > 300){
//       setVisible(true)
//     } 
//     else if (scrolled <= 300){
//       setVisible(false)
//     }
//   };
  
//   const scrollToTop = () =>{
//     window.scrollTo({
//       top: 0, 
//       behavior: 'smooth'
//       /* you can also use 'auto' behaviour
//          in place of 'smooth' */
//     });
//     console.log("click scroll now");
//   };
  
//   window.addEventListener('scroll', toggleVisible);
  
//   return (
//     <Button 
//     variant="contained" 
//     onClick={scrollToTop}
//     style={{
//          borderRadius: 35,
//          backgroundColor: "#133c5a",
//      }}>
//     <label>Up</label><ArrowUpwardIcon/>
//     </Button>
//   );
// }
  
// export default ScrollButton;

import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Button } from './Styles';
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <Button>
     <FaArrowCircleUp onClick={scrollToTop} 
     style={{display: visible ? 'inline' : 'none'}} />
    </Button>
  );
}
  
export default ScrollButton;