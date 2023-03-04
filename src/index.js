import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Contact from "./dummynew/Contact";
import NoPage from "./pages/NoPage";
import ResultsView from './pages/ResultsView';
import StartSearchPage from './pages/StartSearchPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartSearchPage/>} />
          <Route index element={<StartSearchPage/>} />
          <Route path="results" element={<ResultsView />} />
          {/* <Route path="individualresult" element={<Ind />} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//   <div>
//     <Navigation />
//       <Routes>
//        <Route path="/" component={Home} exact/>
//        <Route path="/about" component={About}/>
//        <Route path="/contact" component={Contact}/>
//       <Route component={Error}/>
//      </Routes>
//   </div> 
// </BrowserRouter>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
