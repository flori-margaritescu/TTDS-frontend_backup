import React, {useState, useEffect} from 'react'
import {Grid,Item} from "@material-ui/core";  // will not work unless the following command is run: npm install --global yarn AND AFTER COMMAND: yarn add @material-ui/core@next

function ResultList(props) {
  // Infinite scrolling implementation aided by article: https://www.makeuseof.com/react-infinite-scroll/#:~:text=One%20such%20function%20is%20%E2%80%9CcomponentDidMount,add%20an%20infinite%20scrolling%20feature.
    const [items, setItems] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [itemsReturnedNumber, setItemsReturnedNumber] = useState(0)
    const [resultsList, setResultsList] = useState(props.resultList)

    const itemsListLength = resultsList.length
    const resultsPerScroll = 3

    // makes the component reload and update with the change in search
      useEffect(() => {
        if (props.resultList != resultsList) {
          setPage(1);
          setItemsReturnedNumber(0);
          setHasMore(true);
          setItems([]);
          setResultsList(props.resultList)
          //window.location.reload(false);
     }

       }, [props.resultsUpdated])
     
      useEffect(() => {
         if (hasMore) {
       fetchData()}
       }, [page])
     
      useEffect(() => {
         if (hasMore) {
       fetchData()}
       }, [page])
      
       const fetchData = () => {
         const newItems = []
            
        if ((itemsListLength - itemsReturnedNumber) < resultsPerScroll) {
             for (let i = itemsReturnedNumber; i < (itemsReturnedNumber + (itemsListLength - itemsReturnedNumber)); i++) {
                 newItems.push(resultsList[i])
               }
           setHasMore(false);
           setItemsReturnedNumber(itemsListLength-1);
        } else {
             for (let i = itemsReturnedNumber; i < (itemsReturnedNumber + resultsPerScroll); i++) {
                 newItems.push(resultsList[i])
               }
           setItemsReturnedNumber(itemsReturnedNumber+resultsPerScroll)
        }
        
         setItems([...items, ...newItems])
       }
      
       const onScroll = () => {
         const scrollTop = document.documentElement.scrollTop
         const scrollHeight = document.documentElement.scrollHeight
         const clientHeight = document.documentElement.clientHeight
      
         if (scrollTop + clientHeight >= scrollHeight) {
           setPage(page + 1)
         }
       }
      
       useEffect(() => {
         window.addEventListener('scroll', onScroll)
         return () => window.removeEventListener('scroll', onScroll)
       }, [items])

  return (
    <div>
               {/* Results + fixed header at top indicating results number */}
               <Grid container rowSpacing={3} className="secContainerResults" justifyContent="space-around" style={{paddingBottom:"5%"}}>
               <div style={{paddingLeft:"80%"}}>
                    <label style={{textDecoration:"underline"}}>Results: {resultsList.length}</label>
                    </div>

                     {items.map((item, index) => ( 
                         <Grid item xs={12} sm={12} className='gridItem'  justifyContent="space-around" style={{textAlign:"left", paddingRight:"10%", paddingLeft:"10%"}}>
                         {console.log(index)}
                         {console.log(JSON.stringify(item))}
                         <div style={{backgroundColor:"white", height:"content", borderRadius:"20px", padding:"2%", borderRightStyle:"solid", borderTopStyle:"solid", borderColor:"#819eb5"}}> 
  
                              <div style={{width:"100%"}}>
                                   <h3>{(item.source === "MIT") ? (item.courseTitle) : (item.articleTitle)}</h3>
                                   <div style={{float:"right",  paddingLeft:"1%",paddingRight:"1%", backgroundColor: "#325ea8", borderRadius:"20px"}}>
                                   <p style={{fontWeight:"bold",color:"white"}}>{item.source}</p>
                              </div>
                              </div>
                              <div style={{float:"bottom"}}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                              </div>
                         </div>
                         </Grid>
                     ))}             
            </Grid>
    </div>

  );
}
export default ResultList;